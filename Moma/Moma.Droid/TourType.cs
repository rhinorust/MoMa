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
            var userSettings = new AndroidUserSettings();
            var language = userSettings.GetUserSetting("language");

            var cultureHandler = new CultureHandler();
            var cultureString = cultureHandler.GetCurrentCulture(language);

            var layout = new LinearLayout(this);
             layout.Orientation = Orientation.Vertical;
             layout.SetBackgroundColor(Android.Graphics.Color.White);
 
             //add border for button
             GradientDrawable drawable = new GradientDrawable();
             drawable.SetShape(Android.Graphics.Drawables.ShapeType.Rectangle);
             drawable.SetStroke(15, Color.White);
             drawable.SetColor(Color.ParseColor("#001533"));
 

 
             var storylineButton = new Button(this);
             storylineButton.Text = TranslationManager.GetResourceValue("Storyline", cultureString);
            storylineButton.TextAlignment = TextAlignment.Center;
             storylineButton.SetTextColor(Android.Graphics.Color.Black);
             storylineButton.SetBackgroundColor(Color.ParseColor("#001533"));
             storylineButton.SetTextColor(Android.Graphics.Color.White);
             storylineButton.TextSize = 20;
             storylineButton.SetBackgroundDrawable(drawable);
             storylineButton.SetPadding(55, 55, 55, 55);

 
             var freeTourButton = new Button(this);
                freeTourButton.Text = TranslationManager.GetResourceValue("Map", cultureString);
             freeTourButton.TextAlignment = TextAlignment.Center;
             freeTourButton.SetBackgroundColor(Color.ParseColor("#001533"));
             freeTourButton.SetTextColor(Android.Graphics.Color.White);
             freeTourButton.TextSize = 20;
             freeTourButton.SetBackgroundDrawable(drawable);
             freeTourButton.SetPadding(55, 55, 55, 55);

            var helpButton = new Button(this);
            helpButton.Text = TranslationManager.GetResourceValue("Help", cultureString);
            helpButton.TextAlignment = TextAlignment.Center;
            helpButton.SetBackgroundColor(Color.ParseColor("#001533"));
            helpButton.SetTextColor(Android.Graphics.Color.White);
            helpButton.TextSize = 20;
            helpButton.SetBackgroundDrawable(drawable);
            helpButton.SetPadding(55, 55, 55, 55);



            storylineButton.Click += (sender, e) =>
             { onClickRedirect("guided");};
             freeTourButton.Click += (sender, e) =>
             { onClickRedirect("free"); };
            helpButton.Click += (sender, e) =>
            { onClickRedirect("help"); };
            //layout.AddView(aLabel);
            layout.AddView(storylineButton);
             layout.AddView(freeTourButton);
            layout.AddView(helpButton);
            SetContentView(layout);
         }
         public void onClickRedirect(string tourType)
         {
             var userSettings = new AndroidUserSettings();
             userSettings.SetUserSetting("tourType", tourType);
 
             StartActivity(new Intent(Application.Context, typeof(MainActivity)));
         }
     }
 }