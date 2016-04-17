using Android.App;
using Android.Content.PM;
using Android.OS;
using App1.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
using ZXing.Mobile;

namespace Moma.Droid
{
    [Activity(Label = "MoMa", Icon = "@drawable/moma_appIcon",
        ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation,
        ScreenOrientation = ScreenOrientation.Portrait)]
    public class MainActivity : FormsApplicationActivity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            var setting = new AndroidUserSettings();
            var language = setting.GetUserSetting("language");
            MobileBarcodeScanner.Initialize(Application);
            var cultureHandler = new CultureHandler();
            cultureHandler.SetCurrentCulture(language);
            Forms.Init(this, bundle);
            LoadApplication(new App());
        }
    }
}