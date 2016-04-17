using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.Graphics;
using Android.Graphics.Drawables;
using Android.OS;
using Android.Views;
using Android.Widget;
using Moma;
using Moma.Droid;

namespace App1.Droid
{
    [Activity(Label = "Select a tour option", Icon = "@drawable/moma_appIcon",
        ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class TourType : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);
            var userSettings = new AndroidUserSettings();
            var language = userSettings.GetUserSetting("language");

            var cultureHandler = new CultureHandler();
            var cultureString = cultureHandler.GetCurrentCulture(language);

            var layout = new LinearLayout(this);
            layout.Orientation = Orientation.Vertical;
            layout.SetBackgroundColor(Color.White);

            //add border for button
            var drawable = new GradientDrawable();
            drawable.SetShape(ShapeType.Rectangle);
            drawable.SetStroke(15, Color.White);
            drawable.SetColor(Color.ParseColor("#001533"));


            var storylineButton = new Button(this);
            storylineButton.Text = TranslationManager.GetResourceValue("Storyline", cultureString);
            storylineButton.TextAlignment = TextAlignment.Center;
            storylineButton.SetTextColor(Color.Black);
            storylineButton.SetBackgroundColor(Color.ParseColor("#001533"));
            storylineButton.SetTextColor(Color.White);
            storylineButton.TextSize = 20;
            storylineButton.SetBackgroundDrawable(drawable);
            storylineButton.SetPadding(55, 55, 55, 55);


            var freeTourButton = new Button(this);
            freeTourButton.Text = TranslationManager.GetResourceValue("Map", cultureString);
            freeTourButton.TextAlignment = TextAlignment.Center;
            freeTourButton.SetBackgroundColor(Color.ParseColor("#001533"));
            freeTourButton.SetTextColor(Color.White);
            freeTourButton.TextSize = 20;
            freeTourButton.SetBackgroundDrawable(drawable);
            freeTourButton.SetPadding(55, 55, 55, 55);

            var helpButton = new Button(this);
            helpButton.Text = TranslationManager.GetResourceValue("Help", cultureString);
            helpButton.TextAlignment = TextAlignment.Center;
            helpButton.SetBackgroundColor(Color.ParseColor("#001533"));
            helpButton.SetTextColor(Color.White);
            helpButton.TextSize = 20;
            helpButton.SetBackgroundDrawable(drawable);
            helpButton.SetPadding(55, 55, 55, 55);


            storylineButton.Click += (sender, e) => { onClickRedirect("guided"); };
            freeTourButton.Click += (sender, e) => { onClickRedirect("free"); };
            helpButton.Click += (sender, e) => { onClickRedirect("help"); };
            layout.AddView(storylineButton);
            layout.AddView(freeTourButton);
            layout.AddView(helpButton);
            SetContentView(layout);
        }

        public void onClickRedirect(string tourType)
        {
            var userSettings = new AndroidUserSettings();
            userSettings.SetUserSetting("tourType", tourType);

            StartActivity(new Intent(Application.Context, typeof (MainActivity)));
        }
    }
}