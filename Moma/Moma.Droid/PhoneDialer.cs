using System.Linq;
using Android.Content;
using Android.Net;
using Android.Telephony;
using Moma.Droid;
using Xamarin.Forms;

[assembly: Dependency(typeof (PhoneDialer))]

namespace Moma.Droid
{
    public class PhoneDialer : IDialer
    {
        public bool Dial(string number)
        {
            var context = Forms.Context;
            if (context == null)
                return false;

            var uri = Uri.Parse("tel:" + number);
            var intent = new Intent(Intent.ActionDial, uri);

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

            var mgr = TelephonyManager.FromContext(context);
            return mgr.PhoneType != PhoneType.None;
        }
    }
}