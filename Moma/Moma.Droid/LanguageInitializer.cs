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
using GradientDrawable = Android.Graphics.Drawables.GradientDrawable;
using Color = Android.Graphics.Color;
using Android.Graphics;

namespace App1.Droid
{
    [Activity(Label = "Select a language", Icon = "@drawable/moma_appIcon", ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    class LanguageInitializer : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            var layout = new LinearLayout(this);
            layout.Orientation = Orientation.Vertical;
            layout.SetBackgroundColor(Android.Graphics.Color.White);

            //add border for button
            GradientDrawable drawable = new GradientDrawable();
            drawable.SetShape(Android.Graphics.Drawables.ShapeType.Rectangle);
            drawable.SetStroke(15, Color.White);
            drawable.SetColor(Color.ParseColor("#001533"));

            /*var aLabel = new TextView(this);
            aLabel.Text = "Select A Language:";
            aLabel.TextSize = 25;
            aLabel.SetTextColor(Android.Graphics.Color.Black);
            aLabel.TextAlignment = TextAlignment.Center;
            aLabel.SetPadding(20, 45, 20, 45);
            layout.SetBackgroundColor(Android.Graphics.Color.AliceBlue);*/


            var frenchButton = new Button(this);
            frenchButton.Text = "Français";
            frenchButton.TextAlignment = TextAlignment.Center;
            frenchButton.SetTextColor(Android.Graphics.Color.Black);
            frenchButton.SetBackgroundColor(Color.ParseColor("#001533"));
            frenchButton.SetTextColor(Android.Graphics.Color.White);
            frenchButton.TextSize = 22;
            frenchButton.SetBackgroundDrawable(drawable);
            frenchButton.SetPadding(55, 55, 55, 55);


            var englishButton = new Button(this);
            englishButton.Text = "English";
            englishButton.TextAlignment = TextAlignment.Center;
            englishButton.SetBackgroundColor(Color.ParseColor("#001533"));
            englishButton.SetTextColor(Android.Graphics.Color.White);
            englishButton.TextSize = 20;
            englishButton.SetBackgroundDrawable(drawable);
            englishButton.SetPadding(55, 55, 55, 55);


            var deutscheButton = new Button(this);
            deutscheButton.Text = "Deutch";
            deutscheButton.TextAlignment = TextAlignment.Center;
            deutscheButton.SetBackgroundColor(Color.ParseColor("#001533"));
            deutscheButton.SetTextColor(Android.Graphics.Color.White);
            deutscheButton.TextSize = 20;
            deutscheButton.SetBackgroundDrawable(drawable);
            deutscheButton.SetPadding(55, 55, 55, 55);

            frenchButton.Click += (sender, e) =>
            { SetLanguageSettings("french"); };
            englishButton.Click += (sender, e) =>
            { SetLanguageSettings("english"); };
            deutscheButton.Click += (sender, e) =>
            { SetLanguageSettings("deutsche"); };
            //layout.AddView(aLabel);
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

            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.SetTitle(TranslationManager.GetResourceValue("LanguageSelection", cultureString));

            string defaultLang = TranslationManager.GetResourceValue("DefaultLanguage", cultureString);
            builder.SetMessage(defaultLang);
            builder.SetCancelable(false);
            builder.SetPositiveButton("OK", delegate
            {
                StartActivity(new Intent(Application.Context, typeof(TourType)));
            });
            builder.Show();
        }
    }
}