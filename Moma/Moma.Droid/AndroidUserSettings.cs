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
using Moma;

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