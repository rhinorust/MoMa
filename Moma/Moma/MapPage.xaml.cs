using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class MapPage : ContentPage
    {
        public MapPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Map;

        ToolbarItems.Add(new ToolbarItem("Search", "mag.png", AddSearchView
            
                /*var page = new ContentPage();
                var result = await page.DisplayAlert("Title", "Message", "Accept", "Cancel");

                Debug.WriteLine("success: {0}", result);*/
            ));
        }

        private void AddSearchView()
        {
            BackBoxView.IsVisible = !BackBoxView.IsVisible;
            SearchBarPOI.IsVisible = !SearchBarPOI.IsVisible;
        }
    }
}
