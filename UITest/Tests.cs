using System;
using System.IO;
using System.Linq;
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

        private void SetLanguageSetting()
        {
            app.Screenshot("Language");
            app.WaitForElement(c => c.Button("English"));
            app.Tap(c => c.Marked("English"));
            app.Tap(c => c.Marked("OK"));
            app.WaitForElement(c => c.Button("Free Tour"));
            app.Screenshot("LanguageSet");
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

        private void GetView(string viewName)
        {
            app.SwipeLeftToRight(0.99, 1500, true);
            app.Tap(c=>c.Marked(viewName));
            if (viewName.Equals("Museum Directions", StringComparison.OrdinalIgnoreCase))
            {
                app.Tap(c=>c.Marked("No"));
            }
            app.WaitForElement(c => c.Class("android.widget.TextView").Text(viewName));
        }

        [Test]
        public void ChangeSetting()
        {
            SetLanguageSetting();
            app.Tap(c => c.Marked("Free Tour"));
            GetView("Settings");
            app.Repl();
        }

        //We need to figure out how to restart the app to check if language is persisted. 
        /*[Test]
        public void ValidateLanguagePersistence()
        {
            SetLanguageSetting();
            //Restart app here then check to see if language initializer is launched
            app.WaitForElement(c => c.Button("Free Tour"));
        }*/


    }
}

