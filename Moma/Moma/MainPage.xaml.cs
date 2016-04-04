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


