using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Android.App;
using Android.Content;
using Android.Graphics;
using Android.Net;
using Android.Util;
using Android.Views;
using Android.Widget;
using App1.Droid;
using Newtonsoft.Json;

namespace Moma.Droid
{
    [Activity(Theme = "@style/Splash", MainLauncher = true, NoHistory = true)]
    public class SplashActivity : Activity
    {
        private TextView _textView;
        private TextView _textViewError;
        private WebClient _webClient;
        //private const string BaseUrl = "http://192.168.0.106/mapItems";
        private string _baseUrl;
        private string _fileName;
        private int _numberFilesCurrentAndLoaded;
        private float _fileRatio;
        private readonly PersonalPath _personalPath = new PersonalPath();

        protected override void OnResume()
        {
            base.OnResume();
            ProgressBar bar = new ProgressBar(this);

            _textView = new TextView(this) { Text = "0%" };
            _textView.SetTextColor(Color.Black);
            _textView.TextAlignment = TextAlignment.Center;
            _textView.SetTextSize(ComplexUnitType.Pt, 8);

            _textViewError = new TextView(this) { Text = "Verify network connection!" };
            _textViewError.SetTextColor(Color.White);
            _textViewError.TextAlignment = TextAlignment.Center;
            _textViewError.SetTextSize(ComplexUnitType.Pt, 10);

            //Layouts of the items
            LinearLayout layout = new LinearLayout(this) { Orientation = Orientation.Vertical };
            var screenSize = Resources.DisplayMetrics;
            var layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MatchParent,
                ViewGroup.LayoutParams.MatchParent);
            LinearLayout.LayoutParams viewLayout = new LinearLayout.LayoutParams(200, 200);
            viewLayout.SetMargins(screenSize.WidthPixels / 2 - 100, screenSize.HeightPixels * 2 / 3, 0, 0);
            LinearLayout.LayoutParams boxLayout = new LinearLayout.LayoutParams(200, 200);
            boxLayout.SetMargins(screenSize.WidthPixels / 2 - 45, 15, 0, 0);
            LinearLayout.LayoutParams errorLayout = new LinearLayout.LayoutParams(screenSize.WidthPixels -100, 200);
            errorLayout.SetMargins(200, 0, 0, 0);


            //Add the views to the layout
            layout.AddView(bar, viewLayout);
            layout.AddView(_textView, boxLayout);
            layout.AddView(_textViewError, errorLayout);
            AddContentView(layout, layoutParams);

            //Download the files
            var task = Task.Factory.StartNew(async () =>
            {
                //Setup the WebClient
                _webClient = new WebClient { Encoding = Encoding.UTF8 };
                SetupDownloadActions();
                await LoadJson();
                ValidateSettings();
            });
            task.Wait();
        }

        /// <summary>
        /// Validates the user settings and set defaults values if not set
        /// </summary>
        private void ValidateSettings()
        {
            var userSettings = new AndroidUserSettings();
            if (string.IsNullOrEmpty(userSettings.GetUserSetting("vibration")))
            {
                userSettings.SetUserSetting("vibration", "1");
            }
            if (string.IsNullOrEmpty(userSettings.GetUserSetting("popup")))
            {
                userSettings.SetUserSetting("popup", "1");
            }
            if (string.IsNullOrEmpty(userSettings.GetUserSetting("sound")))
            {
                userSettings.SetUserSetting("sound", "1");
            }
            StartActivity(string.IsNullOrEmpty(userSettings.GetUserSetting("language"))
                ? new Intent(Application.Context, typeof(LanguageInitializer))
                : new Intent(Application.Context, typeof(TourType)));
        }

        /// <summary>
        /// Sets up the download actions (progress and download complete)
        /// </summary>
        private void SetupDownloadActions()
        {
            _webClient.DownloadProgressChanged += WebClientOnDownloadProgressChanged;

            _webClient.DownloadStringCompleted += (s, e) =>
            {
                string localPath = _personalPath.GetFilePathInPersonalFolder(_fileName);
                _personalPath.CreateDirectory(localPath);
                File.WriteAllText(localPath, e.Result);
            };

            _webClient.DownloadDataCompleted += (s, e) =>
            {
                var bytes = e.Result; // get the downloaded data
                string localPath = _personalPath.GetFilePathInPersonalFolder(_fileName);
                _personalPath.CreateDirectory(localPath);
                File.WriteAllBytes(localPath, bytes);
            };
        }

        /// <summary>
        /// Once progress has changed, update the value of the progress view
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="downloadProgressChangedEventArgs"></param>
        private void WebClientOnDownloadProgressChanged(object sender, DownloadProgressChangedEventArgs downloadProgressChangedEventArgs)
        {
            if (_numberFilesCurrentAndLoaded > 0 && downloadProgressChangedEventArgs.ProgressPercentage > 0)
            {
                UpdatePercentLabel(downloadProgressChangedEventArgs.ProgressPercentage);
            }
        }

        /// <summary>
        /// Updates the labels of the percentage download complete
        /// </summary>
        /// <param name="downloadPercentage"></param>
        private void UpdatePercentLabel(int downloadPercentage)
        {
            var completedFiles = (_numberFilesCurrentAndLoaded - 1) * _fileRatio;
            var completedRatio = (double)downloadPercentage / 100 * _fileRatio;
            var completedPercent = completedFiles + completedRatio;
            RunOnUiThread(() =>
                _textView.Text = Convert.ToInt32(Math.Round(completedPercent, 0)) + "%"
                );
        }

        /// <summary>
        /// Loads the JSON file from server asynchronously
        /// </summary>
        /// <returns></returns>
        private async Task LoadJson()
        {
            await WaitForNetwork();
            _textViewError.SetTextColor(Color.White);
            _fileName = "mapData.json";
            var userSettings = new AndroidUserSettings();
            _baseUrl = userSettings.GetUserSetting("serverUrl");
            if (!ValidateUrl(null))
            {
                //Set default server url for first load of application
                _baseUrl = "http://192.168.0.103/FinalDemo";
                userSettings.SetUserSetting("serverUrl", _baseUrl);
            }
            var url = _personalPath.CombinePaths(_baseUrl, _fileName);
            var jsonString = await _webClient.DownloadStringTaskAsync(url);
            await DeserializeJson(jsonString);
        }

        /// <summary>
        /// Async method to wait for a network connection
        /// </summary>
        /// <returns></returns>
        private async Task WaitForNetwork()
        {
            bool isConnected = IsNetworkEnabled();
            while (!isConnected)
            {
                _textViewError.SetTextColor(Color.Red);
                //await Task.Delay(2000);
                isConnected = IsNetworkEnabled();
            }
        }

        /// <summary>
        /// Validates if the _fileName is existing on the server
        /// If datetime is null, only verifies that files exists
        /// If datetime is not null, verifies if the last modified date of the file is greater than local write time
        /// </summary>
        /// <returns></returns>
        private bool ValidateUrl(DateTime? localFileDate)
        {
            bool isValid = true;
            if (string.IsNullOrEmpty(_baseUrl)) return false;
            var url = _personalPath.CombinePaths(_baseUrl, _fileName);
            try
            {
                var request = WebRequest.Create(url);
                request.Method = "HEAD";
                using (var response = request.GetResponse() as HttpWebResponse)
                {
                    if (response != null && response.StatusCode == HttpStatusCode.OK)
                    {
                        if (localFileDate != null)
                        {
                            var lastModifiedServer = response.LastModified;
                            if (localFileDate >= lastModifiedServer)
                            {
                                UpdatePercentLabel(100);
                                isValid = false;
                            }
                        }
                    }
                    else
                    {
                        isValid = false;
                    }
                }
            }
            catch (Exception)
            {
                isValid = false;
            }
            return isValid;
        }

        /// <summary>
        /// Verify if device is connected to any network
        /// </summary>
        /// <returns>bool if device is connected to any network</returns>
        private bool IsNetworkEnabled()
        {
            ConnectivityManager connectivityManager = (ConnectivityManager)GetSystemService(ConnectivityService);
            //Verify if user is connected to any network.
            NetworkInfo activeConnection = connectivityManager.ActiveNetworkInfo;
            return (activeConnection != null) && activeConnection.IsConnected;
        }

        /// <summary>
        /// Loads a media file asynchronously
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        private async Task<byte[]> LoadFile(string filePath)
        {
            await WaitForNetwork();
            _fileName = filePath;
            var url = _personalPath.CombinePaths(_baseUrl, filePath);
            var pathInPersonal = _personalPath.GetFilePathInPersonalFolder(filePath);

            if (File.Exists(pathInPersonal))
            {
                DateTime lastModifiedLocal = File.GetLastWriteTime(pathInPersonal);
                if (!ValidateUrl(lastModifiedLocal)) return null;
            }
            return await _webClient.DownloadDataTaskAsync(url);
        }

        /// <summary>
        /// Deserializes the JSON into a JSONObj and gathers all of its unique media paths to download.
        /// </summary>
        /// <param name="jsonString"></param>
        /// <returns></returns>
        private async Task DeserializeJson(string jsonString)
        {
            var mediaList = new List<string>();
            //Deserialize to a JSonObj 
            JsonFileSerializer jsonObj = JsonConvert.DeserializeObject<JsonFileSerializer>(jsonString);

            //Gets a list of all the distinct medias to download
            foreach (Poi poi in jsonObj.node.poi)
            {
                if (poi.media != null)
                {
                    //Get all medias in the poi media obj
                    mediaList.AddRange(poi.media.audio.Union(poi.media.image.Union(poi.media.video))
                        .Where(r => !string.IsNullOrEmpty(r.path) && !r.path.Contains("<URL>"))
                        .Select(m => m.path)
                        .Distinct());
                }

                foreach (StoryPoint sp in poi.storyPoint)
                {
                    if (sp.media != null)
                    {
                        //Get all medias in the storypoint media obj
                        mediaList.AddRange(sp.media.audio.Union(sp.media.image.Union(sp.media.video))
                            .Where(r => !string.IsNullOrEmpty(r.path) && !r.path.Contains("<URL>"))
                            .Select(m => m.path)
                            .Distinct());
                    }
                }
            }

            //Download all the medias one by one
            mediaList = mediaList.Distinct().ToList();
            _fileRatio = (float)100 / mediaList.Count;
            foreach (var path in mediaList)
            {
                _numberFilesCurrentAndLoaded++;
                await LoadFile(path);
            }
        }
    }
}