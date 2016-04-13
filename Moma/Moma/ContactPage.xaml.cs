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
            Contact.DataSource = GetSampleData();
            Contact.DataBind();
        }

        public List<AccordionSource> GetSampleData()
        {
            var Result = new List<AccordionSource>();

            #region

            var OpeningHoursLayout = new StackLayout()
            {
                Padding = new Thickness(0, 0, 0, 0),
                Children =
                {
                    new Label
                    {
                        Text = AppLanguageResource.OpeningHours,
                        TextColor = Color.FromHex("#001533"),
                        FontSize = 14,
                        HorizontalTextAlignment = TextAlignment.Center
                    },
                }
            };

            #endregion

            #region

            var PricingLayout = new StackLayout()
            {
                Padding = new Thickness(0, 0, 0, 0),
                Children =
                {
                    new Label
                    {
                        Text = AppLanguageResource.Pricing,
                        TextColor = Color.FromHex("#001533"),
                        FontSize = 14,
                        HorizontalTextAlignment = TextAlignment.Center
                    }
                }
            };

            var AddressLayout = new StackLayout()
            {
                Padding = new Thickness(0, 0, 0, 0),
                Children =
                {
                    new Label
                    {
                        Text = AppLanguageResource.Address,
                        TextColor = Color.FromHex("#001533"),
                        FontSize = 14,
                        HorizontalTextAlignment = TextAlignment.Center
                    },
                }
            };

            #endregion

            #region

            var PhoneLayout = new StackLayout()
            {
                Padding = new Thickness(0, 0, 0, 0),
                Children =
                {
                    new Label
                    {
                        Text = AppLanguageResource.Phone,
                        TextColor = Color.FromHex("#001533"),
                        FontSize = 14,
                        HorizontalTextAlignment = TextAlignment.Center
                    }
        }
            };

            var WebsiteLayout = new StackLayout()
            {
                Padding = new Thickness(0, 0, 0, 0),
                Children =
                {
                    new Label
                    {
                        Text = AppLanguageResource.Website,
                        TextColor = Color.FromHex("#001533"),
                        FontSize = 14,
                        HorizontalTextAlignment = TextAlignment.Center
                    },
                }
            };

            #endregion


            var PhoneInfo = new AccordionSource()
            {
                HeaderText = AppLanguageResource.PhoneTitle,
                HeaderTextColor = Color.White,
                HeaderBackGroundColor = Color.FromHex("#001533"),
                ContentItems = PhoneLayout,
                HeaderTextAlignment = TextAlignment.Start,
            };
            Result.Add(PhoneInfo);
            var WebsiteInfo = new AccordionSource()
            {
                HeaderText = AppLanguageResource.WebsiteTitle,
                HeaderTextColor = Color.White,
                HeaderBackGroundColor = Color.FromHex("#001533"),
                ContentItems = WebsiteLayout
            };
            Result.Add(WebsiteInfo);
            var OpeningInfo = new AccordionSource()
            {
                HeaderText = AppLanguageResource.OpeningHoursTitle,
                HeaderTextColor = Color.White,
                HeaderBackGroundColor = Color.FromHex("#001533"),
                ContentItems = OpeningHoursLayout,
                HeaderTextAlignment = TextAlignment.Start,
            };
            Result.Add(OpeningInfo);
            var PricingInfo = new AccordionSource()
            {
                HeaderText = AppLanguageResource.PricingTitle,
                HeaderTextColor = Color.White,
                HeaderBackGroundColor = Color.FromHex("#001533"),
                ContentItems = PricingLayout
            };
            Result.Add(PricingInfo);
            var AddressInfo = new AccordionSource()
            {
                HeaderText = AppLanguageResource.AddressTitle,
                HeaderTextColor = Color.White,
                HeaderBackGroundColor = Color.FromHex("#001533"),
                ContentItems = AddressLayout
            };
            Result.Add(AddressInfo);
            return Result;

        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            MainPage.Current.showMessageToolbarIcon(false);
        }
    }
}