using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
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

            ToolbarItems.Add(new ToolbarItem(AppLanguageResource.Reset,"",ResetApp, ToolbarItemOrder.Primary));

            LanguageLabel.Text = AppLanguageResource.Language;
            LanguageDefLabel.Text = AppLanguageResource.LanguageDef;
            VibrationLabel.Text = AppLanguageResource.Vibration;
            VibrationDefLabel.Text = AppLanguageResource.VibrationDef;
            /*PopupLabel.Text = AppLanguageResource.Popup;
            PopupDefLabel.Text = AppLanguageResource.PopupDef;*/
            SaveButton.Text = AppLanguageResource.Save;
            ResetButton.Text = AppLanguageResource.Default;
            SoundLabel.Text = AppLanguageResource.Sound;
            SoundDefLabel.Text = AppLanguageResource.SoundDef;
            ServerDefLabel.Text = AppLanguageResource.ServerDef;

            var settingsDependency = DependencyService.Get<IUserSettings>();
            FillLanguagePicker(settingsDependency);
            SetSwitches(settingsDependency);
            ServerEntry.Text = settingsDependency.GetUserSetting("serverUrl");
        }

        public async void ResetApp()
        {
            bool result = await DisplayAlert(AppLanguageResource.ResetTitle, AppLanguageResource.ResetMsg, AppLanguageResource.Yes, AppLanguageResource.No);
            if (result)
            {
                ResetDefaultSettings(string.Empty);
                ResetWebViewStorage();
                var appHandler = DependencyService.Get<IAppHandler>();
                appHandler.Abort();
            }
        }

        private void SetSwitches(IUserSettings settingsDependency)
        {
            VibrationSwitch.IsToggled = settingsDependency.GetUserSetting("vibration").Equals("1");
            //PopupSwitch.IsToggled = settingsDependency.GetUserSetting("popup").Equals("1");
            SoundSwitch.IsToggled = settingsDependency.GetUserSetting("sound").Equals("1");
        }

        private void SaveButtonOnClicked(object sender, EventArgs eventArgs)
        {
            var url = ServerEntry.Text;
            if (string.IsNullOrEmpty(url)) return;
            var settingsDict = new Dictionary<string, string>
            {
                {"language", LanguagePicker.Items[LanguagePicker.SelectedIndex]},
                {"vibration", VibrationSwitch.IsToggled ? "1" : "0"},
                //{"popup", PopupSwitch.IsToggled ? "1" : "0"},
                {"sound", SoundSwitch.IsToggled ? "1" : "0"},
                {"serverUrl", url }
            };
            SaveUserSettings(settingsDict, false);
        }

        private void ResetButtonOnClicked(object sender, EventArgs eventArgs)
        {
            ResetDefaultSettings("english");
        }

        private void ResetDefaultSettings(string language)
        {
            var url = "http://192.168.0.115/FinalDemo";
            var settingsDict = new Dictionary<string, string>
            {
                {"language", language},
                {"vibration", "1"},
                {"popup", "1"},
                {"sound", "1" },
                { "serverUrl", url}
            };
            LanguagePicker.SelectedIndex = 0;
            VibrationSwitch.IsToggled = true;
            //PopupSwitch.IsToggled = true;
            SoundSwitch.IsToggled = true;
            ServerEntry.Text = url;
            SaveUserSettings(settingsDict, string.IsNullOrEmpty(language));
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

        protected void SaveUserSettings(Dictionary<string,string> settingsDict, bool isApplicationReset)
        {
            var settingsDependency = DependencyService.Get<IUserSettings>();
            var cultureDependency = DependencyService.Get<ICurrentCulture>();
            string language = "english";
            foreach (var setting in settingsDict)
            {
                settingsDependency.SetUserSetting(setting.Key, setting.Value);
                if (setting.Key.ToLower().Equals("language"))
                {
                    language = setting.Value;
                }
            }
            if (!isApplicationReset)
            {
                var currentCulture = new CultureInfo(cultureDependency.GetCurrentCulture(language));
                string alertTitle = AppLanguageResource.ResourceManager.GetString("SettingsChangedTitle", currentCulture);
                string alertContent = AppLanguageResource.ResourceManager.GetString("SettingsChanged", currentCulture);
                DisplayAlert(alertTitle, alertContent, "OK");
            }
        }

        private void ResetWebViewStorage()
        {
            var webView = new HybridWebView
            {
                Uri = "clear_storage.html"
            };
            Content = webView;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            MainPage.Current.showMessageToolbarIcon(false);
        }
    }
}
