using System;
using System.IO;
using System.Linq;
using System.Net.Mime;
using NUnit.Framework;
using Xamarin.UITest;
using Xamarin.UITest.Queries;

namespace UITest
{
    [TestFixture(Platform.Android)]
    [TestFixture(Platform.iOS)]
    public class Tests
    {
        IApp app;
        Platform platform;

        public Tests(Platform platform)
        {
            this.platform = platform;
        }

        [SetUp]
        public void BeforeEachTest()
        {
            app = AppInitializer.StartApp(platform);
        }

        [Test]
        public void AppLaunches()
        {
            app.Screenshot("AppLaunch");
        }

        [Test]
        public void SetLanguage()
        {
            SetLanguageSetting();
        }

        [Test]
        public void StartWithFreeTour()
        {
            SetLanguageSetting();
            app.Tap(c => c.Button("Free Tour"));
            app.WaitForElement(c => c.Class("android.widget.TextView").Text("Free Tour"));
        }

        [Test]
        public void StartWithStorylines()
        {
            SetLanguageSetting();
            app.Tap(c => c.Button("Storylines"));
            app.WaitForElement(c => c.Class("android.widget.TextView").Text("Storylines"));
        }

        [Test]
        public void OpenAllView()
        {
            SetLanguageSetting();
            app.Tap(c => c.Marked("Free Tour"));

            GetView("Storylines");
            GetView("Free Tour");
            GetView("Contact");
            GetView("Museum Directions");
            GetView("Help");
            GetView("Settings");
        }

        [Test]
        public void ChangeSetting()
        {
            SetLanguageSetting();
            app.Tap(c => c.Marked("Free Tour"));
            GetView("Settings");
            ChangeUserSettings();
            CheckSettingsPersistence();
        }

        [Test]
        public void TestChangeAndResetSettings()
        {
            SetLanguageSetting();
            app.Tap(c => c.Marked("Free Tour"));
            GetView("Settings");
            //Set switches to false
            ChangeUserSettings();
            CheckSettingsPersistence();

            //Reset default settings
            app.Tap(c => c.Button("Default"));
            app.Tap(c => c.Marked("OK"));

            //Assert all switches were set back to true
            bool[] switchesStates = app.Query(c => c.Switch().Invoke("isChecked").Value<bool>());
            Assert.IsTrue(switchesStates.All(s => s));
            //Change View
            GetView("Storylines");
            //Return to settings
            GetView("Settings");
            switchesStates = app.Query(c => c.Switch().Invoke("isChecked").Value<bool>());
            Assert.IsTrue(switchesStates.All(s => s));
        }

        [Test]
        public void TestResetApplication()
        {
            SetLanguageSetting();
            app.Tap(c => c.Marked("Free Tour"));
            GetView("Settings");
            //Set switches to false
            ChangeUserSettings();
            CheckSettingsPersistence();

            //Reset the application
            app.Tap(c => c.Text("Reset"));
            app.Tap(c => c.Marked("Yes"));

            //Assert language initializer page is shown
            app.WaitForElement(c => c.Button("English"));
        }

        [Test]
        public void TestNoResetApplication()
        {
            SetLanguageSetting();
            app.Tap(c => c.Marked("Free Tour"));
            GetView("Settings");
            //Set switches to false
            ChangeUserSettings();
            CheckSettingsPersistence();
            app.Tap(c => c.Text("Reset"));
            app.Tap(c => c.Marked("No"));
            //Assert no changes were made in the page
            bool[] switchesStates = app.Query(c => c.Switch().Invoke("isChecked").Value<bool>());
            Assert.IsTrue(switchesStates.All(s => !s));
        }

        private void ChangeUserSettings()
        {
            var switchesCount = app.Query(c => c.Switch()).Length;

            //Set all the switches to false
            for (var i = 0; i < switchesCount; i++)
            {
                app.Tap(c => c.Class("android.widget.Switch").Index(i));
            }

            //Save the settings
            app.Tap(c => c.Button("Save"));
            app.Tap(c => c.Marked("OK"));
        }

        private void CheckSettingsPersistence()
        {
            //Change View
            GetView("Storylines");
            //Return to settings
            GetView("Settings");

            //Assert all switches were set to false
            bool[] switchesStates = app.Query(c => c.Switch().Invoke("isChecked").Value<bool>());
            Assert.IsTrue(switchesStates.All(s => !s));
        }

        private void SetLanguageSetting()
        {
            app.Screenshot("Language");
            app.WaitForElement(c => c.Button("English"));
            app.Tap(c => c.Marked("English"));
            app.Tap(c => c.Marked("OK"));
            app.WaitForElement(c => c.Button("Free Tour"));
            app.Screenshot("LanguageSet");
        }

        private void GetView(string viewName)
        {
            app.SwipeLeftToRight(0.99, 1500, true);
            app.Tap(c => c.Marked(viewName));
            if (viewName.Equals("Museum Directions", StringComparison.OrdinalIgnoreCase))
            {
                app.Tap(c => c.Marked("No"));
            }
            app.WaitForElement(c => c.Class("android.widget.TextView").Text(viewName));
        }

        //We need to figure out how to restart the app to check if language is persisted. 
        /*[Test]
        public void ValidateLanguagePersistence()
        {
            SetLanguageSetting();
            //Restart app here then check to see if language initializer is launched
            app.WaitForElement(c => c.Button("Free Tour"));
        }*/

        [Test]
        public void StartStoryline()
        {
            SetLanguageSetting();
            app.Tap(c => c.Button("Storylines"));
            app.Tap(c => c.WebView().Css("#storylines"));
            app.Tap(c => c.WebView().Css("#start"));
        }

        [Test]
        public void PreviewStoryline()
        {
            SetLanguageSetting();
            app.Tap(c => c.Button("Storylines"));
            app.Tap(c => c.WebView().Css("#storylines"));
            app.Tap(c => c.WebView().Css("#preview"));
        }

        [Test]
        public void StartPreviewStoryline()
        {
            PreviewStoryline();
            app.Tap(c => c.WebView().Css("#starBtn"));
        }

        [Test]
        public void BackPreviewStoryline()
        {
            PreviewStoryline();
            app.Tap(c => c.WebView().Css("#backBtn"));
            app.WaitForElement(c => c.Class("android.widget.TextView").Text("Storylines"));
        }

        [Test]
        public void WalkThroughStoryline()
        {
            StartStoryline();
            app.Tap(c => c.WebView().Css("#nextBtn"));
        }


        [Test]
        public void SearchPOI()
        {
            SetLanguageSetting();
            app.Tap(c => c.Button("Free Tour"));
            app.EnterText(c => c.WebView().Css("#SearchBarDiv"),"Artifact 1");
            app.Tap(c => c.WebView().Css("#listViewUl"));
        }

        [Test]
        public void QRScannerOpens()
        {
            SetLanguageSetting();
            app.Tap(c => c.Button("Free Tour"));
            app.Tap(c => c.WebView().Css("#scanBtn"));
        }

    }
}

