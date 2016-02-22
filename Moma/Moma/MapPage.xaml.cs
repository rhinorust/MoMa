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
            ToolbarItems.Add(new ToolbarItem("Search", "mag.png",CallJS));
        }

        public void CallJS()
        {
            var jsInterface = DependencyService.Get<IJavascriptInterface>();
            jsInterface.CallJs("alert('Called webview');");
        }
    }
}
