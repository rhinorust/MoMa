using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class SettingsPage : ContentPage
    {
        private readonly Dictionary<string, string> _languageDict = new Dictionary<string, string>(StringComparer.CurrentCultureIgnoreCase)
        {
            {"English", "english"},
            {"French", "french" },
            {"Deutsche", "deutsche" }
        };
        public SettingsPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Settings;
            var settingsDependency = DependencyService.Get<IUserSettings>();
            FillLanguagePicker(settingsDependency);
            SetSwitches(settingsDependency);
        }

        private void SetSwitches(IUserSettings settingsDependency)
        {
            VibrationSwitch.IsToggled = settingsDependency.GetUserSetting("vibration").Equals("1");
            PopupSwitch.IsToggled = settingsDependency.GetUserSetting("popup").Equals("1");
        }

        private void SaveButtonOnClicked(object sender, EventArgs eventArgs)
        {
            var settingsDict = new Dictionary<string, string>
            {
                {"language", LanguagePicker.Items[LanguagePicker.SelectedIndex]},
                {"vibration", VibrationSwitch.IsToggled ? "1" : "0"},
                {"popup", PopupSwitch.IsToggled ? "1" : "0"}
            };
            SaveUserSettings(settingsDict, true);
        }

        private void ResetButtonOnClicked(object sender, EventArgs eventArgs)
        {
            var settingsDict = new Dictionary<string, string>
            {
                {"language", "english"},
                {"vibration", "1"},
                {"popup", "1"}
            };
            LanguagePicker.SelectedIndex = 0;
            VibrationSwitch.IsToggled = true;
            PopupSwitch.IsToggled = true;
            SaveUserSettings(settingsDict, false);
        }

        private void FillLanguagePicker(IUserSettings settingsDependency)
        {
            LanguagePicker.Title = AppLanguageResource.Language;
            string selectedLanguage = GetCurrentLanguage(settingsDependency);

            int index = 0;
            int selectedIndex = 0;
            foreach (var lang in _languageDict.Keys)
            {
                if (lang.ToLower().Equals(selectedLanguage.ToLower()))
                    selectedIndex = index;
                LanguagePicker.Items.Add(lang);
                index++;
            }
            LanguagePicker.SelectedIndex = selectedIndex;
        }

        private static string GetCurrentLanguage(IUserSettings settingsDependency)
        {
            var language = settingsDependency.GetUserSetting("language");
            return !string.IsNullOrEmpty(language) ? language : "english";
        }

        protected void SaveUserSettings(Dictionary<string,string> settingsDict, bool isSave)
        {
            var settingsDependency = DependencyService.Get<IUserSettings>();
            var cultureDependency = DependencyService.Get<ICurrentCulture>();
            //string language = "english";
            foreach (var setting in settingsDict)
            {
                settingsDependency.SetUserSetting(setting.Key, setting.Value);
                /*if (setting.Key.ToLower().Equals("language"))
                {
                    language = setting.Value;
                }*/
            }
            DisplayAlert("Settings Changed",
                isSave
                    ? "Your new settings were saved and will be available upon the next restart of the application"
                    : "Settings were reset to their default value", "OK");
        }
    }
}
