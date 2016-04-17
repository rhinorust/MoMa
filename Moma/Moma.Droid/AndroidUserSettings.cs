using Android.Content;
using App1.Droid;
using Moma;
using Xamarin.Forms;
using Application = Android.App.Application;

[assembly: Dependency(typeof (AndroidUserSettings))]

namespace App1.Droid
{
    internal class AndroidUserSettings : IUserSettings
    {
        public string GetUserSetting(string setting)
        {
            var prefs = Application.Context.GetSharedPreferences("Moma", FileCreationMode.Private);
            return prefs.GetString(setting, null);
        }

        public void SetUserSetting(string setting, string value)
        {
            var prefs = Application.Context.GetSharedPreferences("Moma", FileCreationMode.Private);
            var prefEditor = prefs.Edit();
            prefEditor.PutString(setting, value);
            prefEditor.Commit();
        }
    }
}