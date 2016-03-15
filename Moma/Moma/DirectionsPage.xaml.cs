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

            NoConnectionLabel.IsVisible = true;
            NoConnectionCarLabel.IsVisible = true;
            NoConnectionCarDescription.IsVisible = true;
            NoConnectionSTMLabel.IsVisible = true;
            NoConnectionSTMDescription.IsVisible = true;

            //If ever want to port to iOS http://www.codeproject.com/Tips/870548/Xamarin-forms-Check-network-connectivity-in-iOS-an
            //Only supports Android at the moment
            var networkConnection = DependencyService.Get<INetworkConnection>();
            networkConnection.CheckNetworkConnection();
            var networkStatus = networkConnection.IsConnected;

            if (networkStatus)
            {
                NoConnectionLabel.IsVisible = false;
            }
            NoConnectionLabel.Text = AppLanguageResource.NoInternetConnection;
            NoConnectionCarLabel.Text = AppLanguageResource.CarDirectionsTitle;
            NoConnectionCarDescription.Text = AppLanguageResource.CarDirections;
            NoConnectionSTMLabel.Text = AppLanguageResource.STMDirectionsTitle;
            NoConnectionSTMDescription.Text = AppLanguageResource.STMDirections;

        }
    }
}
