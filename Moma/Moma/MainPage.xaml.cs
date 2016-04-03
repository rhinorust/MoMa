using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class MainPage : MasterDetailPage
    {
        public static MainPage Current { get; set; }

        // For queueing videos to be played
        List<string[]> playQueue;

        public MainPage()
        {
            var settingsDependency = DependencyService.Get<IUserSettings>();
            string tourType = settingsDependency.GetUserSetting("tourType");

            playQueue = new List<string[]>();

            InitializeComponent();

            if (tourType == "guided")
            {
                Detail = new NavigationPage(new StorylinePage()) { BarBackgroundColor = Color.FromHex("0066ff"), BackgroundColor = Color.White };
            }
            else {
                Detail = new NavigationPage(new MapPage()) { BarBackgroundColor = Color.FromHex("0066ff"), BackgroundColor = Color.White };
            }

            masterPage.ListView.ItemSelected += OnItemSelected;

            Current = this;
        }

        // Called by javascript when a video iBeacon is discovered
        // videoName is filename inside Resources/raw, poiTitle the poi's title to show on scren
        // and if interrupt = true the video plays right away, otherwise it waits for currently
        // playing video to finish playing
        public void playVideo(string videoName, string poiTitle, bool interrupt)
        {
            Device.BeginInvokeOnMainThread(() =>
            {
                if (interrupt)
                {
                    // If there's already a video page showing, pop it off the stack before pushing the new one
                    if (Detail.Navigation.NavigationStack.Last<Page>() is AndroidVideoPlayer)
                        Detail.Navigation.PopAsync();
                    // Push the new one
                    Detail.Navigation.PushAsync(new AndroidVideoPlayer(videoName, poiTitle));
                }
                else
                {
                    // Add the video to the playqueue
                    playQueue.Add(new string[] { videoName, poiTitle });
                }
            });
        }

        // Used for popping of finished videos off the stack if there are items in the playQueue
        public void videoEnded(string videoName)
        {
            // Don't do anything if there aren't any more videos to play
            if (playQueue.Count != 0)
            {
                Page currentPage = Detail.Navigation.NavigationStack.Last<Page>();
                if (currentPage is AndroidVideoPlayer)
                {
                    if (((AndroidVideoPlayer)currentPage).getVideoName().Equals(videoName))
                    {
                        Detail.Navigation.PopAsync(); // Get rid of it
                    }
                }
                // Play the next video on the queue
                playVideo(playQueue.First<string[]>()[0], playQueue.First<string[]>()[1], true);
                // Remove it from the playqueue
                playQueue.RemoveAt(0);
            }
        }

        async void OnItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            var item = e.SelectedItem as MasterPageItem;

            //check if user is connected to the internet
            //If ever want to port to iOS http://www.codeproject.com/Tips/870548/Xamarin-forms-Check-network-connectivity-in-iOS-an
            //Only supports Android at the moment
            var networkConnection = DependencyService.Get<INetworkConnection>();
            networkConnection.CheckNetworkConnection();
            var networkStatus = networkConnection.IsConnected;

            if (item != null)
            {
                if (item.Title.Equals(AppLanguageResource.Directions) && networkStatus)
                {
                    var answer = await DisplayAlert("Exit", "Do you wan't to exit the App?", "Yes", "No");
                    if (answer == true)
                    {
                        Detail = new NavigationPage((Page)Activator.CreateInstance(typeof(MapPage))) { BarBackgroundColor = Color.FromHex("0066ff"), BackgroundColor = Color.White };
                        masterPage.ListView.SelectedItem = null;
                        IsPresented = false;
                        Uri uri = new Uri("https://www.google.ca/maps/place/Mus%C3%A9e+Des+Ondes+Emile+Berliner/@45.4777315,-73.5948578,19z/data=!3m1!4b1!4m2!3m1!1s0x4cc9109f76dd243b:0xb3b9280e1bc3a89d");
                        Device.OpenUri(uri);
                    }
                    else
                    {
                        Detail = new NavigationPage((Page)Activator.CreateInstance(item.TargetType)) { BarBackgroundColor = Color.FromHex("0066ff"), BackgroundColor = Color.White };
                        masterPage.ListView.SelectedItem = null;
                        IsPresented = false;
                    }
                }
                else
                {
                    Detail = new NavigationPage((Page)Activator.CreateInstance(item.TargetType)) { BarBackgroundColor = Color.FromHex("0066ff"), BackgroundColor = Color.White };
                    masterPage.ListView.SelectedItem = null;
                    IsPresented = false;
                }
            }
        }
    }
}


