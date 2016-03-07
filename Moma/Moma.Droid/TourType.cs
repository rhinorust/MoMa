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
    [Activity(Label = "Select a tour option", Icon = "@drawable/moma_appIcon", ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class TourType : Activity
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


            var storylineButton = new Button(this);
            storylineButton.Text = "Guided Tour";
            storylineButton.TextAlignment = TextAlignment.Center;
            storylineButton.SetTextColor(Android.Graphics.Color.Black);
            storylineButton.SetBackgroundColor(Color.ParseColor("#001533"));
            storylineButton.SetTextColor(Android.Graphics.Color.White);
            storylineButton.TextSize = 22;
            storylineButton.SetBackgroundDrawable(drawable);
            storylineButton.SetPadding(55, 55, 55, 55);


            var freeTourButton = new Button(this);
            freeTourButton.Text = "Free Tour";
            freeTourButton.TextAlignment = TextAlignment.Center;
            freeTourButton.SetBackgroundColor(Color.ParseColor("#001533"));
            freeTourButton.SetTextColor(Android.Graphics.Color.White);
            freeTourButton.TextSize = 20;
            freeTourButton.SetBackgroundDrawable(drawable);
            freeTourButton.SetPadding(55, 55, 55, 55);


            storylineButton.Click += (sender, e) =>
            { onClickRedirect("guided"); };
            freeTourButton.Click += (sender, e) =>
            { onClickRedirect("free"); };
            //layout.AddView(aLabel);
            layout.AddView(storylineButton);
            layout.AddView(freeTourButton);
            SetContentView(layout);
        }
        public void onClickRedirect(string tourType)
        {
            var userSettings = new AndroidUserSettings();
            userSettings.SetUserSetting("tourType", tourType);

            //language = language.Substring(0,1).ToUpper() + language.Substring(1);
            StartActivity(new Intent(Application.Context, typeof(MainActivity)));
        }
    }
}
       