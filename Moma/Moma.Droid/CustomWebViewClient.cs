using Android.Webkit;

namespace App1.Droid
{
    public class CustomWebViewClient : WebViewClient
    {
        public override bool ShouldOverrideUrlLoading(WebView view, string url)
        {
            return false;
        }
    }
}