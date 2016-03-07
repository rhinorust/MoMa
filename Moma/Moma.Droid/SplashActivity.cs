using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Util;
using Android.Views;
using Android.Widget;
using App1.Droid;

namespace Moma.Droid
{
    [Activity(Theme = "@style/Splash", MainLauncher = true, NoHistory = true)]
    public class SplashActivity : Activity
    {
        static readonly string TAG = "X:" + typeof(SplashActivity).Name;

        public override void OnCreate(Bundle savedInstanceState, PersistableBundle persistentState)
        {
            base.OnCreate(savedInstanceState, persistentState);
            Log.Debug(TAG, "SplashActivity.OnCreate");
        }

        protected override void OnResume()
        {
            base.OnResume();

            Task startupWork = new Task(() =>
            {
                Log.Debug(TAG, "Performing some startup work that takes a bit of time.");
                Thread.Sleep(500);
                //Task.Delay(5000); // Simulate a bit of startup work.
                Log.Debug(TAG, "Working in the background - important stuff.");
            });

            startupWork.ContinueWith(t =>
            {
                Log.Debug(TAG, "Work is finished - start Activity1.");
                ValidateSettings();
            }, TaskScheduler.FromCurrentSynchronizationContext());

            startupWork.Start();
        }

        private void ValidateSettings()
        {
            var userSettings = new AndroidUserSettings();
            if (string.IsNullOrEmpty(userSettings.GetUserSetting("vibration")))
            {
                userSettings.SetUserSetting("vibration", "1");
            }
            if (string.IsNullOrEmpty(userSettings.GetUserSetting("popup")))
            {
                userSettings.SetUserSetting("popup", "1");
            }
            StartActivity(string.IsNullOrEmpty(userSettings.GetUserSetting("language"))
                ? new Intent(Application.Context, typeof (LanguageInitializer))
                : new Intent(Application.Context, typeof(TourType)));
        }
    }
}