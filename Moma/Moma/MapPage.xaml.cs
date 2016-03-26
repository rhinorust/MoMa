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
        public MapPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Map;
            ToolbarItem bla = new ToolbarItem("Messages", "messages.png", showHideMessages);
            ToolbarItems.Add(bla);
            ToolbarItems.Add(new ToolbarItem("Search", "mag.png", showHideSearchBar));
            ToolbarItems.Remove(bla);
        }

        public void showHideSearchBar()
        {
            var jsInterface = DependencyService.Get<IJavascriptInterface>();
            jsInterface.ShowHideSearchBar();
        }

        public void showHideMessages()
        {
            var jsInterface = DependencyService.Get<IJavascriptInterface>();
            jsInterface.CallJs("showHideMessages();");
        }
    }
}
