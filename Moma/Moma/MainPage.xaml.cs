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

        // The toolbar item that represents the messages
        private ToolbarItem messagesToolbarItem;

        // How many messages are unread
        private Dictionary<string, bool> unreadMessages;

        public MainPage()
        {
            var settingsDependency = DependencyService.Get<IUserSettings>();
            string tourType = settingsDependency.GetUserSetting("tourType");

            playQueue = new List<string[]>();

            InitializeComponent();

            // Messages toolbar item
            messagesToolbarItem = new ToolbarItem("Messages", "messages_none.png", showHideMessages);
            unreadMessages = new Dictionary<string, bool>();

            if (tourType == "guided")
            {
                Detail = new NavigationPage(new StorylinePage())
                {
                    BarBackgroundColor = Color.FromHex("0066ff"),
                    BackgroundColor = Color.White
                };
            }

            else if (tourType == "free")
            {
                Detail = new NavigationPage(new MapPage())
                {
                    BarBackgroundColor = Color.FromHex("0066ff"),
                    BackgroundColor = Color.White
                };
            }
            else
            {
                Detail = new NavigationPage(new AndroidVideoPlayer("helpvideo", "Moma Instructions"));

            }

            masterPage.ListView.ItemSelected += OnItemSelected;

            Current = this;
        }

        public void showHideMessages()
        {
            var jsInterface = DependencyService.Get<IJavascriptInterface>();
            jsInterface.CallJs("showHideMessages();");
        }

        // Show/Hide messageToolbarIcon
        public void showMessageToolbarIcon(bool visible)
        {
            if (visible)
            {
                if (!ToolbarItems.Contains(messagesToolbarItem))
                    ToolbarItems.Add(messagesToolbarItem);                
            }
            else
            {
                if (ToolbarItems.Contains(messagesToolbarItem))
                    ToolbarItems.Remove(messagesToolbarItem);
            }
        }

        // Changing the icon of the messages' toolbar icon
        private void setIconForMessages(string picture)
        {
            messagesToolbarItem.Icon = new FileImageSource { File = "drawable/" + picture };
        }

        // Add the message which has the message title messageTitle
        // to the list of unread messages
        public void messageWasAdded(string messageTitle)
        {
            if (!unreadMessages.ContainsKey(messageTitle))
                unreadMessages.Add(messageTitle, false);
            updateMessageIcon();
        }

        // Remove the message which has the message title messageTitle
        // from the list of unread messages if it exists there
        public void messageWasRead(string messageTitle)
        {
            if (unreadMessages.ContainsKey(messageTitle))
                unreadMessages.Remove(messageTitle);
            updateMessageIcon();
        }

        private void updateMessageIcon()
        {
            if (unreadMessages.Count == 0) setIconForMessages("messages_none.png");
            if (unreadMessages.Count == 1) setIconForMessages("messages_one.png");
            if (unreadMessages.Count == 2) setIconForMessages("messages_two.png");
            if (unreadMessages.Count >= 3) setIconForMessages("messages_plus.png");
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
            Page currentPage = Detail.Navigation.NavigationStack.Last<Page>();
            if (currentPage is AndroidVideoPlayer)
            {
                if (((AndroidVideoPlayer)currentPage).getVideoName().Equals(videoName))
                {
                    Detail.Navigation.PopAsync(); // Get rid of it
                }
            }

            if (playQueue.Count != 0)
            {
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
                if (item.Title.Equals(AppLanguageResource.Help)){
                    masterPage.ListView.SelectedItem = null;
                    IsPresented = false;
                    MainPage.Current.playVideo("helpvideo", "Moma instructions", true);
                }
                else if (item.Title.Equals(AppLanguageResource.Directions) && networkStatus)
                {
                    var answer = await DisplayAlert("Exit", "Do you wan't to exit the App?", "Yes", "No");
                    if (answer == true)
                    {
                        Detail = new NavigationPage((Page)Activator.CreateInstance(typeof(MapPage))) { BarBackgroundColor = Color.FromHex("0066ff"), BackgroundColor = Color.White };
                        masterPage.ListView.SelectedItem = null;
                        IsPresented = false;
                        Uri uri = new Uri("https://www.google.ca/maps/place/1001+Rue+Lenoir,+Montr%C3%A9al,+QC+H4C+2Z6/@45.4766472,-73.5924109,17z/data=!4m2!3m1!1s0x4cc9109f3e1c689d:0xfe5e29cc968bfa44");
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


