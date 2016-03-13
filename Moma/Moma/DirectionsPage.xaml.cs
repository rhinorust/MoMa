using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Moma
{
    public partial class DirectionsPage : ContentPage
    {
        public DirectionsPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Directions;

            NoConnectionLabel.IsVisible = false;
            NoConnectionCarLabel.IsVisible = false;
            NoConnectionSTMLabel.IsVisible = false;
            OpenInBrowserLabel.IsVisible = true;
            GoogleMapsLogo.IsVisible = true;
            OpenInBrowserLabel.Text = AppLanguageResource.OpenInBrowser;

            //If ever want to port to iOS http://www.codeproject.com/Tips/870548/Xamarin-forms-Check-network-connectivity-in-iOS-an
            //Only supports Android at the moment
            var networkConnection = DependencyService.Get<INetworkConnection>();
            networkConnection.CheckNetworkConnection();
            var networkStatus = networkConnection.IsConnected ? "Connected" : "Not Connected";

            if (networkStatus.Equals("Connected"))
            {
                OpenInBrowserLabel.Text = AppLanguageResource.OpenInBrowser;

                var tgr = new TapGestureRecognizer { NumberOfTapsRequired = 1 };
                tgr.Command = new Command((o) =>
                {
                    Uri uri = new Uri("https://www.google.ca/maps/place/Mus%C3%A9e+Des+Ondes+Emile+Berliner/@45.4777315,-73.5948578,17z/data=!3m1!4b1!4m2!3m1!1s0x4cc9109f76dd243b:0xb3b9280e1bc3a89d");
                    Device.OpenUri(uri);
                });
                onRedirect.GestureRecognizers.Add(tgr);
            }
            else
            {
                NoConnectionLabel.IsVisible = true;
                NoConnectionCarLabel.IsVisible = true;
                NoConnectionSTMLabel.IsVisible = true;
                OpenInBrowserLabel.IsVisible = false;
                GoogleMapsLogo.IsVisible = false;

                NoConnectionLabel.Text = AppLanguageResource.NoInternetConnection;
                NoConnectionCarLabel.Text = AppLanguageResource.CarDirectionsTitle;
                NoConnectionCarDescription.Text = AppLanguageResource.CarDirections;
                NoConnectionSTMLabel.Text = AppLanguageResource.STMDirectionsTitle;
                NoConnectionSTMDescription.Text = AppLanguageResource.STMDirections;
            }
        }

        private void OpenInBrowserButtonOnClick(object sender, EventArgs eventArgs)
        {
           Uri uri = new Uri("https://www.google.ca/maps/place/Mus%C3%A9e+Des+Ondes+Emile+Berliner/@45.4777315,-73.5948578,19z/data=!3m1!4b1!4m2!3m1!1s0x4cc9109f76dd243b:0xb3b9280e1bc3a89d");
           Device.OpenUri(uri);
        }
    }
}
