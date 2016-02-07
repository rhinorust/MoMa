using Android.App;
using Android.Content;
using App1.Droid;
using Moma;

[assembly: Xamarin.Forms.Dependency(typeof(AndroidUserSettings))]
namespace App1.Droid
{
    class AndroidUserSettings : IUserSettings
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