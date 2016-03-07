using System;
using System.Globalization;
using System.Threading;
using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using App1.Droid;

namespace Moma.Droid
{
    [Activity(Label = "MoMa", Icon = "@drawable/moma_appIcon", ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsApplicationActivity
    {
        IBeaconsDirector iBeaconsDirector; // The boss that directs what is to be done with iBeacons

        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            var setting = new AndroidUserSettings();
            string language = setting.GetUserSetting("language");
            var cultureHandler = new CultureHandler();
            cultureHandler.SetCurrentCulture(language);
            global::Xamarin.Forms.Forms.Init(this, bundle);
            LoadApplication(new App());

            // IBeacons
            iBeaconsDirector = new IBeaconsDirector();
            iBeaconsDirector.startScanning();
        }
    }
}

