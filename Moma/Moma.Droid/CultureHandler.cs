using System.Globalization;
using System.Runtime.Remoting.Activation;
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
            string culture = GetCurrentCulture(language);
            var userSelectedCulture = new CultureInfo(culture);
            Thread.CurrentThread.CurrentCulture = userSelectedCulture;
            Thread.CurrentThread.CurrentUICulture = userSelectedCulture;
        }

        public string GetCurrentCulture(string languageString)
        {
            if (languageString.ToLower().Equals("english"))
            {
                return "en-US";
            }
            if (languageString.ToLower().Equals("french"))
            {
                return "fr-FR";
            }
            if (languageString.ToLower().Equals("deutsche"))
            {
                return "de-DE";
            }
            return "en-US";
        }
    }
}