using System.Linq;
using Android.Content;
using Android.Net;
using Moma.Droid;
using Xamarin.Forms;

[assembly: Dependency(typeof (WebPageOpener))]

namespace Moma.Droid
{
    public class WebPageOpener : IWebPageOpener
    {
        public bool OpenBrowser(string url)
        {
            var context = Forms.Context;
            if (context == null)
                return false;

            var uri = Uri.Parse(url);
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