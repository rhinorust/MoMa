using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class ContactPage : ContentPage
    {
        public ContactPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Contact;
            Address.Text = AppLanguageResource.Address;
            Pricing.Text = AppLanguageResource.Pricing;
            OpeningHours.Text = AppLanguageResource.OpeningHours;
            AddressTitle.Text = AppLanguageResource.AddressTitle;
            PricingTitle.Text = AppLanguageResource.PricingTitle;
            OHTitle.Text = AppLanguageResource.OpeningHoursTitle;
            Phone.Text = AppLanguageResource.Phone;
            PhoneTitle.Text = AppLanguageResource.PhoneTitle;
            WebsiteTitle.Text = AppLanguageResource.WebsiteTitle;
            Website.Text = AppLanguageResource.Website;

        }



        public async void OnPhoneTapped(object sender, EventArgs e)
        {
            if (await this.DisplayAlert(
                "Exit",
                "Are you sure you want to leave the application to call?",
                "Yes",
                "No"))
            {
                var dialer = DependencyService.Get<IDialer>();
                if (dialer != null)
                {
                    dialer.Dial("514-932-9663");
                }
            }
        }

        public async void OnWebsiteTapped(object sender, EventArgs e)
        {
            if (await this.DisplayAlert(
                "Exit",
                "Are you sure you want to leave the application to open the website?",
                "Yes",
                "No"))
            {
                var url = DependencyService.Get<IWebPageOpener>();
                if (url != null)
                {
                    url.OpenBrowser("http://moeb.ca/en");
                }
            }
        }

        public async void DirectionTapped(object sender, EventArgs e)
        {
            var networkConnection = DependencyService.Get<INetworkConnection>();
            networkConnection.CheckNetworkConnection();
            var networkStatus = networkConnection.IsConnected;


            if (networkStatus)
            {
                var answer = await DisplayAlert("Exit", "Are you sure you want to leave the application?", "Yes", "No");
                if (answer == true)
                {
                    Uri uri =
                        new Uri(
                            "https://www.google.ca/maps/place/1001+Rue+Lenoir,+Montr%C3%A9al,+QC+H4C+2Z6/@45.4766472,-73.5924109,17z/data=!4m2!3m1!1s0x4cc9109f3e1c689d:0xfe5e29cc968bfa44");
                    Device.OpenUri(uri);
                }
                if (answer == false)
                {
                    await Navigation.PushAsync(new DirectionsPage());
                }

            }
            else
            {
                await Navigation.PushAsync(new DirectionsPage());
            }

        }


    }
}
