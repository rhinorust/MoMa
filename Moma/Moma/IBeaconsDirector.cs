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
        Dictionary<IBeacon, bool> iBeacons; // and will be stored here when found during scanning,
        IJavascriptInterface map;           // notifying the indoor map when desired.

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

        public IBeaconsDirector()
        {
            UUID = "b9407f30-f5f8-466e-aff9-25556b57fe6d";
            beaconRegion = new BeaconRegion("Musee Des Ondes", UUID);
            map = DependencyService.Get<IJavascriptInterface>();
            iBeacons = new Dictionary<IBeacon, bool>();

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

                    iBeaconsCheckTimer = new Timer(doActionForNewIBeacons, null,
                                                   IBEACON_TIMER_START_DELAY,
                                                   CHECK_FOR_NEW_IBEACONS_INTERVAL*1000);
                }
            });
        }

        public void doActionForNewIBeacons(object args) {
            Device.BeginInvokeOnMainThread(async () => {
                IEnumerable<IBeacon> newIBeacons = await fetchNewIBeacons();

                foreach (IBeacon iBeacon in newIBeacons) {
                    // Adding the new iBeacon to the dictionary for further reference

                    // Accessable properties of iBeacons:
                    // -> ibeacon.Minor,
                    // -> ibeacon.Major,
                    // -> ibeacon.Proximity.ToString() returns: "Unknown", "Far", "Near" or "Immediate",
                    // -> ibeacon.Uuid
                    
                    map.CallJs("iBeaconDiscovered(" + iBeacon.Minor + "," + iBeacon.Major + ");");
                }
            });
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
                if (/*prox.Equals("Near") || */prox.Equals("Immediate")) {
                    if (!iBeacons.ContainsKey(foundIBeacon)) {
                        System.Diagnostics.Debug.WriteLine("=\n= newBeacon =\n="); // Debugging
                        newIBeacons.Add(foundIBeacon); // Add to the return list
                        iBeacons.Add(foundIBeacon, true); // Add to dictionary
                    }
                }
            }
            return newIBeacons;
        }
    }
}