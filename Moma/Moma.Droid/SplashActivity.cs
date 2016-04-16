using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Android.App;
using Android.Content;
using Android.Graphics;
using Android.OS;
using Android.Views;
using Android.Views.InputMethods;
using Android.Widget;
using App1.Droid;
using Newtonsoft.Json;

namespace Moma.Droid
{
    [Activity(Theme = "@style/Splash", MainLauncher = true, NoHistory = true)]
    public class SplashActivity : Activity
    {
        private EditText _serverUrl;
        private TextView _percentageLabel;
        private Button _btnSetServer;
        private WebClient _webClient;
        private const string JsonFileName = "mapData.json";
        private RelativeLayout _baseLayout;
        private string _baseUrl;
        private string _fileName;
        private int _numberFilesCurrentAndLoaded;
        private float _fileRatio;
        private readonly PersonalPath _personalPath = new PersonalPath();
        private string _cultureString = "en-US";

        public override void OnCreate(Bundle savedInstanceState, PersistableBundle persistentState)
        {
            base.OnCreate(savedInstanceState, persistentState);
        }

        protected override void OnResume()
        {
            base.OnResume();
            SetLayout();
            _webClient = new WebClient { Encoding = Encoding.UTF8 };
            SetupDownloadActions();
        }

        private void SetLayout()
        {
            var userSettings = new AndroidUserSettings();
            var language = userSettings.GetUserSetting("language");
            if (!string.IsNullOrEmpty(language))
            {
                var cultureHandler = new CultureHandler();
                _cultureString = cultureHandler.GetCurrentCulture(language);
            }

            _baseLayout = new RelativeLayout(this);
            var baseLayoutParams =
                new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.FillParent, ViewGroup.LayoutParams.FillParent);

            _serverUrl = new EditText(this);
            _serverUrl.Text = userSettings.GetUserSetting("serverUrl");
            _serverUrl.SetTextColor(Color.Black);
            var serverUrlLayout =
                new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.FillParent, ViewGroup.LayoutParams.WrapContent);
            serverUrlLayout.SetMargins(0, 15, 0, 0);

            _btnSetServer = new Button(this) {Text= TranslationManager.GetResourceValue("StartUpdate", _cultureString)};
            _btnSetServer.Click += BtnSetServerOnClick;
            _btnSetServer.SetTextColor(Color.Black);
            var btnSetServerLayout =
                new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.FillParent, ViewGroup.LayoutParams.WrapContent);
            btnSetServerLayout.SetMargins(0, 120, 0, 0);

            _baseLayout.AddView(_serverUrl, serverUrlLayout);
            _baseLayout.AddView(_btnSetServer, btnSetServerLayout);
            AddContentView(_baseLayout, baseLayoutParams);
        }

        private void AddProgressBar()
        {
            ProgressBar bar = new ProgressBar(this);
            var screenSize = Resources.DisplayMetrics;
            var barLayout =
                new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.FillParent, ViewGroup.LayoutParams.WrapContent);
            barLayout.SetMargins(0, screenSize.HeightPixels/3*2, 0, 0);

            _percentageLabel = new TextView(this) {Text = "0%"};
            _percentageLabel.SetTextColor(Color.Black);
            var percentageLabelLayout =
                new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.FillParent, ViewGroup.LayoutParams.WrapContent);
            percentageLabelLayout.SetMargins(screenSize.WidthPixels/2 - 35, screenSize.HeightPixels/3*2 + 200, 0, 0);

            _baseLayout.AddView(bar, barLayout);
            _baseLayout.AddView(_percentageLabel, percentageLabelLayout);
        }

        private async void BtnSetServerOnClick(object sender, EventArgs eventArgs)
        {
            _baseUrl = _serverUrl.Text;
            if (!ValidateUrl(null, JsonFileName))
            {
                RunOnUiThread(() =>
                {
                    _btnSetServer.Text = TranslationManager.GetResourceValue("RetryUpdate", _cultureString);
                    _btnSetServer.SetTextColor(Color.White);
                });
            }
            else
            {
                RunOnUiThread(() =>
                {
                    AddProgressBar();
                    _btnSetServer.Text = TranslationManager.GetResourceValue("StartUpdate", _cultureString);
                    _btnSetServer.Enabled = false;
                    _btnSetServer.SetTextColor(Color.White);
                    _serverUrl.ClearFocus();
                    InputMethodManager imm = (InputMethodManager)GetSystemService(Context.InputMethodService);
                    imm.HideSoftInputFromInputMethod(_serverUrl.WindowToken, 0);


                    // try hide the keyboard 
                    Window.SetSoftInputMode(SoftInput.StateHidden);
                });
                var userSettings = new AndroidUserSettings();
                userSettings.SetUserSetting("serverUrl", _baseUrl);
                await LoadJson();
                ValidateSettings(); 
            }
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
                _percentageLabel.Text = Convert.ToInt32(Math.Round(completedPercent, 0)) + "%"
                );
        }

        /// <summary>
        /// Loads the JSON file from server asynchronously
        /// </summary>
        /// <returns></returns>
        private async Task LoadJson()
        {
            _fileName = JsonFileName;
            var url = _personalPath.CombinePaths(_baseUrl, _fileName);
            var jsonString = await _webClient.DownloadStringTaskAsync(url);
            await DeserializeJson(jsonString);
        }

        /// <summary>
        /// Validates if the _fileName is existing on the server
        /// If datetime is null, only verifies that files exists
        /// If datetime is not null, verifies if the last modified date of the file is greater than local write time
        /// </summary>
        /// <returns></returns>
        private bool ValidateUrl(DateTime? localFileDate, string fileName)
        {
            bool isValid = true;
            if (string.IsNullOrEmpty(_baseUrl)) return false;
            var url = _personalPath.CombinePaths(_baseUrl, fileName);
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
        /// Loads a media file asynchronously
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        private async Task<byte[]> LoadFile(string filePath)
        {
            _fileName = filePath;
            var url = _personalPath.CombinePaths(_baseUrl, filePath);
            var pathInPersonal = _personalPath.GetFilePathInPersonalFolder(filePath);

            if (File.Exists(pathInPersonal))
            {
                DateTime lastModifiedLocal = File.GetLastWriteTime(pathInPersonal);
                if (!ValidateUrl(lastModifiedLocal, filePath)) return null;
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