using Android.App;
using Android.Graphics.Drawables;
using Moma.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;

[assembly: ExportRenderer(typeof (NavigationPage), typeof (CustomNavigationRenderer))]

namespace Moma.Droid
{
    public class CustomNavigationRenderer : NavigationRenderer
    {
        protected override void OnElementChanged(ElementChangedEventArgs<NavigationPage> e)
        {
            base.OnElementChanged(e);

            RemoveAppIconFromActionBar();
        }

        private void RemoveAppIconFromActionBar()
        {
            // http://stackoverflow.com/questions/14606294/remove-icon-logo-from-action-bar-on-android
            var actionBar = ((Activity) Context).ActionBar;
            actionBar.SetIcon(new ColorDrawable(Color.Transparent.ToAndroid()));
        }
    }
}