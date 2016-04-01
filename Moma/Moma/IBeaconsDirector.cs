using System;
using System.Collections.Generic;
using Estimotes;
using Xamarin.Forms;
using System.Threading.Tasks;

namespace Moma
{
    public class IBeaconsDirector
    {
        BeaconRegion beaconRegion;          // We'll be directing iBeacons within this beaconRegion.
        String UUID;                        // The iBeacons use this UUID
        Dictionary<IBeacon, string[]> iBeacons; // and will be stored here when found during scanning,
        IJavascriptInterface map;           // notifying the indoor map when desired.

        // The dictionary's string[] = {"true", audioFileName} if it's an audio iBeacon, false otherwise

        // These two variables are used when BlueTooth is disabled on the device.
        // In case BlueTooth wasn't enabled on app launch, the IBeaconDirector
        // will retry initializing its' services with the interval
        // CHECK_FOR_BLUETOOTH_INTERVAL until the user has enabled BlueTooth.
        const int CHECK_FOR_BLUETOOTH_INTERVAL = 10; // in seconds
        Timer blueToothRetryTimer;

        // The interval between checks for iBeacons
        const int CHECK_FOR_NEW_IBEACONS_INTERVAL = 2; // in seconds
        // Or else iBeacons found during app start-up don't get reported to the user
        const int IBEACON_TIMER_START_DELAY = 30;
        Timer iBeaconsCheckTimer;

        const string PROXIMITY_RESTRICTION = "Immediate";

        public IBeaconsDirector()
        {
            UUID = "b9407f30-f5f8-466e-aff9-25556b57fe6d";
            beaconRegion = new BeaconRegion("Musee Des Ondes", UUID);
            map = DependencyService.Get<IJavascriptInterface>();
            iBeacons = new Dictionary<IBeacon, string[]>();

            // Only fails if BlueTooth is disabled or the device doesn't support it
            tryStartingIBeaconsService(null);
        }

        // Used to initialize the iBeacons' service. If it fails,
        // it will try again every CHECK_FOR_BLUETOOTH_INTERVAL seconds.
        // It fails if: * BlueTooth is disabled while running app, or
        //              * BlueTooth is unsupported on the device running the app
        private void tryStartingIBeaconsService(object args)
        {
            Device.BeginInvokeOnMainThread(async () => {
                var status = await EstimoteManager.Instance.Initialize();
                if (status != BeaconInitStatus.Success)
                {
                    System.Diagnostics.Debug.WriteLine("=\n=BlueTooth is disabled\n=\n=");
                    if (blueToothRetryTimer == null)
                        blueToothRetryTimer = new Timer(tryStartingIBeaconsService,
                                                        null,
                                                        0,
                                                        CHECK_FOR_BLUETOOTH_INTERVAL * 1000);
                }
                else if (status == BeaconInitStatus.Success)
                {
                    System.Diagnostics.Debug.WriteLine("=\n=BlueTooth is enabled\n=\n=");
                    if (blueToothRetryTimer != null) blueToothRetryTimer.Dispose();

                    EstimoteManager.Instance.Ranged += (sender, beacons) => { };
                    EstimoteManager.Instance.RegionStatusChanged += (sender, region) => { };

                    EstimoteManager.Instance.StartRanging(beaconRegion);

                    iBeaconsCheckTimer = new Timer(iBeaconIntervalCheck, null,
                                                   IBEACON_TIMER_START_DELAY,
                                                   CHECK_FOR_NEW_IBEACONS_INTERVAL*1000);
                }
            });
        }

        public void iBeaconIntervalCheck(object args) {
            Device.BeginInvokeOnMainThread(async () => {
                IEnumerable<IBeacon> newIBeacons = await fetchNewIBeacons();

                manageBackgroundAudio();

                foreach (IBeacon iBeacon in newIBeacons) {
                    // Adding the new iBeacon to the dictionary for further reference

                    // Accessible properties of iBeacons:
                    // -> ibeacon.Minor,
                    // -> ibeacon.Major,
                    // -> ibeacon.Proximity.ToString() returns: "Unknown", "Far", "Near" or "Immediate",
                    // -> ibeacon.Uuid
                    
                    map.CallJs("iBeaconDiscovered(" + iBeacon.Minor + "," + iBeacon.Major + ");");
                }
            });
        }

        // Loops through the already found iBeacons for audio iBeacons
        // and if they are in range, play them, else stop playing them 
        // As of now, it will allow many to be playing at once.
        private void manageBackgroundAudio()
        {
            foreach (IBeacon key in iBeacons.Keys)
            {
                // If it is an audio iBeacon
                if (iBeacons[key][0].Equals("true"))
                {
                    // If it's close enough
                    if (satisfiesProximity(key.Proximity.ToString()))
                    {
                        // Play it if it's not already playing
                        DependencyService.Get<IAudio>().PlayAudioFile(iBeacons[key][1]);
                    }
                    // If it's not, stop playing it if it's playing
                    else
                        DependencyService.Get<IAudio>().StopAudioFile(iBeacons[key][1]);
                }
            }
        }

        // Returns true if proximity is less than or equal to PROXIMITY_RESTRICTION
        private bool satisfiesProximity(string proximity)
        {
            if (PROXIMITY_RESTRICTION.Equals("Immediate")) {
                if (proximity.Equals("Immediate")) return true;
            }
            if (PROXIMITY_RESTRICTION.Equals("Near")) {
                if (proximity.Equals("Immediate")) return true;
                if (proximity.Equals("Near")) return true;
            }
            if (PROXIMITY_RESTRICTION.Equals("Far")) {
                if (proximity.Equals("Immediate")) return true;
                if (proximity.Equals("Near")) return true;
                if (proximity.Equals("Far")) return true;
            }
            return false;
        }

        // Converts a C# iBeacon instance to javascript instance
        // -> Not used as of now <-
        private string iBeaconToJavascript(IBeacon iBeacon) {
            string iBeaconJS = "{";
            iBeaconJS += "minor: " + iBeacon.Minor + ",";
            iBeaconJS += "major: " + iBeacon.Major + ",";
            iBeaconJS += "proximity: '" + iBeacon.Proximity + "',";
            iBeaconJS += "}";

            return iBeaconJS;
        }

        async Task<IEnumerable<IBeacon>> fetchNewIBeacons() {
            IEnumerable<IBeacon> foundIBeacons = await EstimoteManager.Instance.FetchNearbyBeacons(beaconRegion, new TimeSpan(0, 0, 1));
            List<IBeacon> newIBeacons = new List<IBeacon>();

            foreach (IBeacon foundIBeacon in foundIBeacons) {
                string prox = foundIBeacon.Proximity.ToString();
                if (satisfiesProximity(prox)) {
                    if (!iBeacons.ContainsKey(foundIBeacon)) {
                        System.Diagnostics.Debug.WriteLine("=\n= newBeacon =\n="); // Debugging
                        newIBeacons.Add(foundIBeacon); // Add to the return list
                        iBeacons.Add(foundIBeacon, new string[] { "false", "" }); // Add to dictionary
                    }
                }
            }
            return newIBeacons;
        }

        // Set the iBeacon with the given minor and major values as a background audio
        // iBeacon. Furthermore, stores the audioFileName to play for that audio iBeacon
        public void setIBeaconAsAudioIBeacon(int minor, int major, string audioFileName) {
            foreach (IBeacon key in iBeacons.Keys)
            {
                // Finding the corresponding iBeacon in the dictionary
                if (key.Minor == (ushort)minor && key.Major == (ushort)major)
                {
                    // Storing the fact that it's an audio iBeacon along with
                    // the audiofile to play for it
                    iBeacons[key] = new string[] { "true", audioFileName };
                    break;
                }
            }
        }
    }
}