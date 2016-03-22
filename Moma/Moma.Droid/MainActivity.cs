using Android.App;
using Android.Content.PM;
using Android.OS;
using App1.Droid;
using Moma;
using ZXing.Mobile;

namespace Moma.Droid
{
    [Activity(Label = "MoMa", Icon = "@drawable/moma_appIcon", ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsApplicationActivity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            var setting = new AndroidUserSettings();
            string language = setting.GetUserSetting("language");
            MobileBarcodeScanner.Initialize(Application);
            var cultureHandler = new CultureHandler();
            cultureHandler.SetCurrentCulture(language);
            global::Xamarin.Forms.Forms.Init(this, bundle);
            LoadApplication(new App());
        }
    }
}

