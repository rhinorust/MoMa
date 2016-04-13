using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Provider;
using Android.Runtime;
using Android.Telephony;
using Android.Views;
using Android.Widget;
using Moma.Droid;
using Xamarin.Forms;

[assembly: Dependency(typeof(WebPageOpener))]
namespace Moma.Droid
{
    public class WebPageOpener : IWebPageOpener
    {
      public bool OpenBrowser(string url)
        {
            var context = Forms.Context;
            if (context == null)
                return false;

            var uri = Android.Net.Uri.Parse(url);
            var intent = new Intent(Intent.ActionView, uri);

            if (IsIntentAvailable(context, intent))
            {
                context.StartActivity(intent);
                return true;
            }

            return false;
        }

        public static bool IsIntentAvailable(Context context, Intent intent)
        {

            var packageManager = context.PackageManager;

            var list = packageManager.QueryIntentServices(intent, 0)
                .Union(packageManager.QueryIntentActivities(intent, 0));
            if (list.Any())
                return true;

            return false;

        }
    }
    }
