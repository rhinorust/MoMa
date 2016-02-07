using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.OS;
using Android.Widget;
using Moma.Droid;
using Moma;
using Application = Android.App.Application;
using Button = Android.Widget.Button;
using TextAlignment = Android.Views.TextAlignment;

namespace App1.Droid
{
    [Activity(Label = "MoMa", Icon = "@drawable/moma_appIcon", ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    class LanguageInitializer : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            var layout = new LinearLayout(this);
            layout.Orientation = Orientation.Vertical;
            //layout.SetBackgroundColor(Android.Graphics.Color.White);

            var aLabel = new TextView(this);
            aLabel.Text = "Select a language";
            aLabel.TextSize = 15;
            //aLabel.SetTextColor(Android.Graphics.Color.Black);
            //aLabel.TextAlignment = TextAlignment.Center;

            var frenchButton = new Button(this);
            frenchButton.Text = "Français";
            frenchButton.TextAlignment = TextAlignment.Center;

            //frenchButton.SetBackgroundColor(Android.Graphics.Color.AliceBlue);
            //frenchButton.SetTextColor(Android.Graphics.Color.Black);
            var englishButton = new Button(this);
            englishButton.Text = "English";
            englishButton.TextAlignment = TextAlignment.Center;
            //englishButton.SetBackgroundColor(Android.Graphics.Color.AliceBlue);
            //englishButton.SetTextColor(Android.Graphics.Color.Black);

            var deutscheButton = new Button(this);
            deutscheButton.Text = "Deutsche";
            deutscheButton.TextAlignment = TextAlignment.Center;
            //deutscheButton.SetBackgroundColor(Android.Graphics.Color.AliceBlue);
            //deutscheButton.SetTextColor(Android.Graphics.Color.Black);

            frenchButton.Click += (sender, e) =>
            { SetLanguageSettings("french"); };
            englishButton.Click += (sender, e) =>
            { SetLanguageSettings("english"); };
            deutscheButton.Click += (sender, e) =>
            { SetLanguageSettings("deutsche"); };
            layout.AddView(aLabel);
            layout.AddView(deutscheButton);
            layout.AddView(englishButton);
            layout.AddView(frenchButton);
            SetContentView(layout);
        }

        public void SetLanguageSettings(string language)
        {
            var userSettings = new AndroidUserSettings();
            userSettings.SetUserSetting("language", language);

            var cultureHandler = new CultureHandler();
            var cultureString = cultureHandler.GetCurrentCulture(language);

            //language = language.Substring(0,1).ToUpper() + language.Substring(1);
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.SetTitle(TranslationManager.GetResourceValue("LanguageSelection", cultureString));

            string defaultLang = TranslationManager.GetResourceValue("DefaultLanguage", cultureString);
            builder.SetMessage(defaultLang);
            builder.SetCancelable(false);
            builder.SetPositiveButton("OK", delegate
            {
                StartActivity(new Intent(Application.Context, typeof(MainActivity)));
            });
            builder.Show();
        }
    }
}