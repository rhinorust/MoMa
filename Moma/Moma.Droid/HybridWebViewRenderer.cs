using Android.Webkit;
using Moma;
using Moma.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;

[assembly: Dependency(typeof(HybridWebViewRenderer))]
[assembly: ExportRenderer (typeof(HybridWebView), typeof(HybridWebViewRenderer))]
namespace Moma.Droid
{
	public class HybridWebViewRenderer : ViewRenderer<HybridWebView, Android.Webkit.WebView>, IJavascriptInterface
	{
		const string JavaScriptFunction = "function invokeCSharpAction(data){jsBridge.invokeAction(data);}";
        private static Android.Webkit.WebView webView;
        private static HybridWebView hybridView;
        public void CallJs(string jsFunction)
        {
            webView.Settings.JavaScriptEnabled = true;
            webView.SetWebChromeClient(new WebChromeClient());
            webView.LoadUrl(string.Format("javascript: {0}", jsFunction));
        }

        protected override void OnElementChanged (ElementChangedEventArgs<HybridWebView> e)
		{
			base.OnElementChanged (e);

			if (Control == null) {
				webView = new Android.Webkit.WebView (Forms.Context);
				webView.Settings.JavaScriptEnabled = true;
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
			}
		}

		void InjectJS (string script)
		{
			if (Control != null) {
				Control.LoadUrl (string.Format ("javascript: {0}", script));
			}
		}
	}
}
