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
            app.Screenshot("Language");
            app.WaitForElement(c=>c.Button("English"));
            app.Tap(c=>c.Marked("English"));
            app.Tap(c=>c.Marked("OK"));
            app.WaitForElement(c => c.Button("Free Tour"));
            app.Screenshot("LanguageSet");
        }

        [Test]
        public void OpenAllView()
        {
            app.WaitForElement(c => c.Button("English"));
            app.Tap(c => c.Marked("English"));
            app.Tap(c => c.Marked("OK"));
            app.WaitForElement(c => c.Button("Free Tour"));
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
            app.WaitForElement(c => c.Class("android.widget.TextView").Text(viewName));
        }


    }
}

