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
        public MainPage()
        {
            var settingsDependency = DependencyService.Get<IUserSettings>();
            string tourType = settingsDependency.GetUserSetting("tourType");

            InitializeComponent();

            if (tourType == "guided"){
                Detail = new NavigationPage(new StorylinePage()) { BarBackgroundColor = Color.FromHex("0066ff"), BackgroundColor = Color.White };
            }
            else {
                Detail = new NavigationPage(new MapPage()) { BarBackgroundColor = Color.FromHex("0066ff"), BackgroundColor = Color.White };
            }

            masterPage.ListView.ItemSelected += OnItemSelected;

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


