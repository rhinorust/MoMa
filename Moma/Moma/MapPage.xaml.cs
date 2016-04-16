using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class MapPage : ContentPage
    {
        public static MapPage Current { get; set; }

        public MapPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Map;

            ToolbarItems.Add(new ToolbarItem("Search", "mag.png", showHideSearchBar));

            // Keeping the instance of this page in the Current
            Current = this;
        }

        public void showHideSearchBar()
        {
            var jsInterface = DependencyService.Get<IJavascriptInterface>();
            jsInterface.ShowHideSearchBar();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            MainPage.Current.showMessageToolbarIcon(true);
        }
    }
}
