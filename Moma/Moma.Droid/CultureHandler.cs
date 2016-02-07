using System.Globalization;
using System.Threading;
using App1.Droid;
using Moma;

[assembly: Xamarin.Forms.Dependency(typeof(CultureHandler))]
namespace App1.Droid
{
    class CultureHandler : ICurrentCulture
    {
        public void SetCurrentCulture(string language)
        {
            string culture = "en-US";
            if (language.ToLower().Equals("english"))
            {
                culture = "en-US";
            }
            else if (language.ToLower().Equals("french"))
            {
                culture = "fr-FR";
            }
            else if (language.ToLower().Equals("deutsche"))
            {
                culture = "de-DE";
            }

            var userSelectedCulture = new CultureInfo(culture);
            Thread.CurrentThread.CurrentCulture = userSelectedCulture;
            Thread.CurrentThread.CurrentUICulture = userSelectedCulture;
        }
    }
}