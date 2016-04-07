using System;
using System.Collections.Generic;
using System.Linq;
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

        
    }


}