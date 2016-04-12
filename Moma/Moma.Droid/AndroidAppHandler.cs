using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using App1.Droid;
using Moma;
using Moma.Droid;
using Xamarin.Forms;

[assembly: Dependency(typeof(AndroidAppHandler))]
namespace App1.Droid
{
    public class AndroidAppHandler : Activity, IAppHandler
    {
        public void Abort()
        {
            //Clear the previous activities and launch splashscreen
            var intent = new Intent(Android.App.Application.Context, typeof(SplashActivity));
            intent.AddFlags(ActivityFlags.NewTask | ActivityFlags.ClearTask );
            Forms.Context.StartActivity(intent);
            Finish();
        }
    }
}