using Android.Webkit;
using App1.Droid;
using Moma;
using Moma.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
using WebView = Android.Webkit.WebView;

[assembly: Dependency(typeof (HybridWebViewRenderer))]
[assembly: ExportRenderer(typeof (HybridWebView), typeof (HybridWebViewRenderer))]

namespace Moma.Droid
{
    public class HybridWebViewRenderer : ViewRenderer<HybridWebView, WebView>, IJavascriptInterface
    {
        private const string JavaScriptFunction = "function invokeCSharpAction(data){jsBridge.invokeAction(data);}";
        private static WebView webView;
        private static HybridWebView hybridView;

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

        protected override void OnElementChanged(ElementChangedEventArgs<HybridWebView> e)
        {
            base.OnElementChanged(e);

            if (Control == null)
            {
                webView = new WebView(Forms.Context);
                webView.Settings.JavaScriptEnabled = true;
                webView.Settings.DomStorageEnabled = true;
                webView.SetWebViewClient(new CustomWebViewClient());
                SetNativeControl(webView);
            }
            if (e.OldElement != null)
            {
                Control.RemoveJavascriptInterface("jsBridge");
                hybridView = e.OldElement;
                hybridView.Cleanup();
            }
            if (e.NewElement != null)
            {
                Control.AddJavascriptInterface(new JSBridge(this), "jsBridge");
                Control.LoadUrl(string.Format("file:///android_asset/Content/{0}", Element.Uri));
                InjectJS(JavaScriptFunction);
            }
        }

        private void InjectJS(string script)
        {
            if (Control != null)
            {
                Control.LoadUrl(string.Format("javascript: {0}", script));
            }
        }

        private void EnableJS()
        {
            webView.Settings.JavaScriptEnabled = true;
            webView.Settings.DomStorageEnabled = true;

            // webView.SetLayerType(Android.Views.LayerType.None, null);
            webView.SetWebChromeClient(new WebChromeClient());
        }
    }
}