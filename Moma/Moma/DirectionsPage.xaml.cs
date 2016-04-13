using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
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
            Directions.DataSource = GetSampleData();
            Directions.DataBind();

            //If ever want to port to iOS http://www.codeproject.com/Tips/870548/Xamarin-forms-Check-network-connectivity-in-iOS-an
            //Only supports Android at the moment
            var networkConnection = DependencyService.Get<INetworkConnection>();
            networkConnection.CheckNetworkConnection();
            var networkStatus = networkConnection.IsConnected;

        }

        public List<AccordionSource> GetSampleData()
        {
            var Result = new List<AccordionSource>();

            #region 
            var CarLayout = new StackLayout()
            {
                Padding = new Thickness(20, 0, 0, 0),
                Children = {
                    new Label
                    {
                        Text = AppLanguageResource.CarDirections,
                        TextColor = Color.Black,
                    },
                    new Label
                    {
                        Text = AppLanguageResource.Destination,
                        TextColor = Color.Black,
                        FontAttributes = FontAttributes.Bold,
                        FontSize= 15
                    }
                }
            };
            #endregion

            #region 
            var STMLayout = new StackLayout()
            {
                Padding = new Thickness(20, 0, 0, 0),
                Children = {
                    new Label
                    {
                        Text = AppLanguageResource.STMDirections,
                        TextColor = Color.Black,

                    },
                    new Label
                    {
                        Text = AppLanguageResource.Destination,
                        TextColor = Color.Black,
                        FontAttributes = FontAttributes.Bold,
                        FontSize= 15
                    }
                }
            };
            #endregion

            var CarInfo = new AccordionSource()
            {
                HeaderText = AppLanguageResource.CarDirectionsTitle,
                HeaderTextColor = Color.White,
                HeaderBackGroundColor = Color.FromHex("#001533"),
                ContentItems = CarLayout
            };
            Result.Add(CarInfo);
            var STMInfo = new AccordionSource()
            {
                HeaderText = AppLanguageResource.STMDirectionsTitle,
                HeaderTextColor = Color.White,
                HeaderBackGroundColor = Color.FromHex("#001533"),
                ContentItems = STMLayout
            };
            Result.Add(STMInfo);
            return Result;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            MainPage.Current.showMessageToolbarIcon(false);
        }
    }

    public class ListDataViewCell : ViewCell
    {
        public ListDataViewCell()
        {
            var label = new Label()
            {
                Font = Font.SystemFontOfSize(NamedSize.Default),
                TextColor = Color.Black
            };
            label.SetBinding(Label.TextProperty, new Binding("TextValue"));
            label.SetBinding(Label.ClassIdProperty, new Binding("DataValue"));
            View = new StackLayout()
            {
                Orientation = StackOrientation.Vertical,
                VerticalOptions = LayoutOptions.StartAndExpand,
                Padding = new Thickness(5, 0, 0, 0),
                Children = { label }
            };
        }
    }

    public class SimpleObject
    {
        public string TextValue { get; set; }
        public string DataValue { get; set; }
    }

    public class AccordionSource
    {
        public string HeaderText { get; set; }
        public Color HeaderTextColor { get; set; }
        public Color HeaderBackGroundColor { get; set; }
        public View ContentItems { get; set; }
        public Thickness Padding { get; set; }
        public String FontFamily { get; }
        public TextAlignment HeaderTextAlignment { get; set; }

    }

    public class AccordionButton : Button
    {
        #region Private Variables
        bool mExpand = false;
        #endregion
        public AccordionButton()
        {
            HorizontalOptions = LayoutOptions.FillAndExpand;
            BorderColor = Color.Black;
            BorderRadius = 5;
            BorderWidth = 0;

        }
        #region Properties
        public bool Expand
        {
            get { return mExpand; }
            set { mExpand = value; }
        }
        public ContentView AssosiatedContent
        { get; set; }
        #endregion
    }

    public class Accordion : ContentView
    {
        #region Private Variables
        List<AccordionSource> mDataSource;
        bool mFirstExpaned = false;
        StackLayout mMainLayout;
        #endregion

        public Accordion()
        {
            var mMainLayout = new StackLayout();
            Content = mMainLayout;
        }
        public Accordion(List<AccordionSource> aSource)
        {
            mDataSource = aSource;
            DataBind();
        }
        #region Properties
        public List<AccordionSource> DataSource
        {
            get { return mDataSource; }
            set { mDataSource = value; }
        }
        public bool FirstExpaned
        {
            get { return mFirstExpaned; }
            set { mFirstExpaned = value; }
        }
        #endregion

        public void DataBind()
        {
            var vMainLayout = new StackLayout();
            var vFirst = true;
            if (mDataSource != null)
            {
                foreach (var vSingleItem in mDataSource)
                {

                    var vHeaderButton = new AccordionButton()
                    {
                        Text = vSingleItem.HeaderText,
                        TextColor = vSingleItem.HeaderTextColor,
                        BackgroundColor = vSingleItem.HeaderBackGroundColor,

                    };

                    var vAccordionContent = new ContentView()
                    {
                        Content = vSingleItem.ContentItems,
                        IsVisible = false
                    };
                    if (vFirst)
                    {
                        vHeaderButton.Expand = mFirstExpaned;
                        vAccordionContent.IsVisible = mFirstExpaned;
                        vFirst = false;
                    }
                    vHeaderButton.AssosiatedContent = vAccordionContent;
                    vHeaderButton.Clicked += OnAccordionButtonClicked;
                    vMainLayout.Children.Add(vHeaderButton);
                    vMainLayout.Children.Add(vAccordionContent);
                }
            }
            mMainLayout = vMainLayout;
            Content = mMainLayout;
        }


        void OnAccordionButtonClicked(object sender, EventArgs args)
        {
            foreach (var vChildItem in mMainLayout.Children)
            {
                if (vChildItem.GetType() == typeof(ContentView))
                    vChildItem.IsVisible = false;
                if (vChildItem.GetType() == typeof(AccordionButton))
                {
                    var vButton = (AccordionButton)vChildItem;
                    vButton.Expand = false;
                }
            }
            var vSenderButton = (AccordionButton)sender;

            if (vSenderButton.Expand)
            {
                vSenderButton.Expand = false;
            }
            else vSenderButton.Expand = true;
            vSenderButton.AssosiatedContent.IsVisible = vSenderButton.Expand;
        }
    }
}

