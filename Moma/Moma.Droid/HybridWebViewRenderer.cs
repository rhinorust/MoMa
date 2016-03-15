using System;
using Android.Webkit;
using Moma;
using Moma.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
using Android.Media;
using System.Reflection;
using System.IO;
using System.Threading.Tasks;

[assembly: Dependency(typeof(HybridWebViewRenderer))]
[assembly: ExportRenderer (typeof(HybridWebView), typeof(HybridWebViewRenderer))]
namespace Moma.Droid
{
	public class HybridWebViewRenderer : ViewRenderer<HybridWebView, Android.Webkit.WebView>, IJavascriptInterface
	{
		const string JavaScriptFunction = "function invokeCSharpAction(data){jsBridge.invokeAction(data);}";
        private static Android.Webkit.WebView webView;
        private static HybridWebView hybridView;

        protected override void OnElementChanged (ElementChangedEventArgs<HybridWebView> e)
		{
			base.OnElementChanged (e);

			if (Control == null) {
				webView = new Android.Webkit.WebView (Forms.Context);
				webView.Settings.JavaScriptEnabled = true;
                webView.Settings.DomStorageEnabled = true;
				SetNativeControl (webView);
			}
			if (e.OldElement != null) {
				Control.RemoveJavascriptInterface ("jsBridge");
                hybridView = e.OldElement as HybridWebView;
                hybridView.Cleanup ();
			}
			if (e.NewElement != null) {
				Control.AddJavascriptInterface (new JSBridge (this), "jsBridge");
				Control.LoadUrl (string.Format ("file:///android_asset/Content/{0}", Element.Uri));
				InjectJS (JavaScriptFunction);
                string json = fileToString("JSON.txt");
                InjectJS("data = " + json);
            }
		}

        // returns the contents of Moma.Droid/Assets/Content/fileName
        private string fileToString(string fileName) {
            Assembly assembly = Assembly.GetExecutingAssembly();
            StreamReader stream = new StreamReader(assembly.GetManifestResourceStream("App1.Droid.Assets.Content."+fileName));
            return stream.ReadToEnd();
        }

        // For debugging. Prints a list of all the embedded resources files
        private void printEmbeddedResources() {
            Assembly assembly = Assembly.GetExecutingAssembly();
            string[] resources = assembly.GetManifestResourceNames();
            foreach (string resource in resources)
            {
                System.Diagnostics.Debug.WriteLine(resource);
            }
        }

        void InjectJS (string script)
		{
			if (Control != null) {
				Control.LoadUrl (string.Format ("javascript: {0}", script));
			}
		}

	    private void EnableJS()
	    {
            webView.Settings.JavaScriptEnabled = true;
            webView.Settings.DomStorageEnabled = true;
            webView.SetWebChromeClient(new WebChromeClient());
        }

        public void CallJs(string jsFunction)
        {
            EnableJS();
            webView.LoadUrl(string.Format("javascript: {0}", jsFunction));
        }

        public void ShowHideSearchBar()
        {
            const string showHideSearch = "var searchBarContainer = document.getElementById('SearchBarDiv');" +
                                          "if (searchBarContainer != null)" +
                                          "searchBarContainer.style.display = searchBarContainer.style.display === 'none' ? '' : 'none';";
            EnableJS();
            webView.LoadUrl(string.Format("javascript: {0}", showHideSearch));
        }

    }
}
