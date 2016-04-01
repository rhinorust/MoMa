using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Moma
{
    public class App : Application
    {
        // Allows Android, iOS and Windows Phone to call functions from inside here.
        // From those, do: App.Current.TheMethodYouWantToCall()
        public static App Current { get; set; }

        // The boss that directs what is to be done with iBeacons.
        IBeaconsDirector iBeaconsDirector;

        public App() {
            // The root page of your application
            MainPage = new Moma.MainPage();

            // Initialize the director and try starting the iBeacons' service
            iBeaconsDirector = new IBeaconsDirector();

            // Keeping the instance of this page in the Current
            Current = this;
        }

        public IBeaconsDirector IBeaconsDirector() {
            return iBeaconsDirector;
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
