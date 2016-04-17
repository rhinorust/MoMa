using Android.App;
using Android.Content;
using App1.Droid;
using Moma;
using Moma.Droid;
using Xamarin.Forms;
using Application = Android.App.Application;

[assembly: Dependency(typeof (AndroidAppHandler))]

namespace App1.Droid
{
    public class AndroidAppHandler : Activity, IAppHandler
    {
        public void Abort()
        {
            //Clear the previous activities and launch splashscreen
            var intent = new Intent(Application.Context, typeof (SplashActivity));
            intent.AddFlags(ActivityFlags.NewTask | ActivityFlags.ClearTask);
            Forms.Context.StartActivity(intent);
            Finish();
        }
    }
}