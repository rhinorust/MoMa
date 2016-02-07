using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;

namespace Moma
{
    public static class TranslationManager
    {
        public static string GetResourceValue(string key)
        {
            return AppLanguageResource.ResourceManager.GetString(key);
        }

        public static string GetResourceValue(string key, string culture)
        {
            var cultureInfo = new CultureInfo(culture);
            return AppLanguageResource.ResourceManager.GetString(key, cultureInfo);
        }
    }
}
