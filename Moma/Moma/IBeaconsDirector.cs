using System;
using System.Collections.Generic;
using Estimotes;
using Xamarin.Forms;
using System.Threading.Tasks;
using System.Threading;

namespace Moma
{
    public class IBeaconsDirector
    {
        BeaconRegion beaconRegion;          // We'll be directing iBeacons within this beaconRegion.
        String UUID;                        // The iBeacons use this UUID
        Dictionary<IBeacon, string[]> iBeacons; // and will be stored here when found during scanning,
        IJavascriptInterface map;           // notifying the indoor map when desired.

        // Example:
        // The dictionary's string[] = {"false", "true", audioFileName}
        // First value is whether the iBeacon has been confirmed by javascript or not
        // second value is if it's an audio iBeacon or not
        // and if so, the audioFileName

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

        const string PROXIMITY_RESTRICTION = "Near";//#testing

        // For synchronizing javascript and C# threads of accessing the iBeacons dictionary
        Semaphore semaphore;

        // For knowing whether the IBeaconsDirector has started scanning for iBeacons
        bool scanInitialised;

        // For knowing if we are reporting found iBeacons or not
        bool scanning;

        public IBeaconsDirector()
        {
            System.Diagnostics.Debug.WriteLine("Ibeacon director running***********************************************************");

            UUID = "b9407f30-f5f8-466e-aff9-25556b57fe6d";
            beaconRegion = new BeaconRegion("Musee Des Ondes", UUID);
            map = DependencyService.Get<IJavascriptInterface>();
            iBeacons = new Dictionary<IBeacon, string[]>();

            semaphore = new Semaphore(1, 1);

            scanInitialised = false;

            scanning = false;
        }

        // Called by javascript's storyline when ready to find iBeacons
        public void startScanningForIBeacons()
        {
            if (!scanInitialised)
                tryStartingIBeaconsService(null);
            else
                scanning = true;
        }

        // Called by javascript
        public void stopScanningForIBeacons()
        {
            scanning = true;
        }

        // Used to initialize the iBeacons' service. If it fails,
        // it will try again every CHECK_FOR_BLUETOOTH_INTERVAL seconds.
        // It fails if: * BlueTooth is disabled while running app, or
        //              * BlueTooth is unsupported on the device running the app
        // If it fails, it will retry until it succeeds.
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

                    scanInitialised = true;

                    scanning = true;
                }
            });
        }

        public void iBeaconIntervalCheck(object args) {
            if (scanning)
            {
                Device.BeginInvokeOnMainThread(async () => {
                    IEnumerable<IBeacon> newIBeacons = await fetchNewIBeacons();

                    manageBackgroundAudio();

                    foreach (IBeacon iBeacon in newIBeacons)
                    {
                        // Adding the new iBeacon to the dictionary for further reference

                        // Accessible properties of iBeacons:
                        // -> ibeacon.Minor,
                        // -> ibeacon.Major,
                        // -> ibeacon.Proximity.ToString() returns: "Unknown", "Far", "Near" or "Immediate",
                        // -> ibeacon.Uuid

                        // For the storyline to update locations
                        map.CallJs("currentPOI('" + iBeacon.Minor + "','" + iBeacon.Major + "');");
                        System.Diagnostics.Debug.WriteLine("call currentPOI from c#***********************************************************");
                    }
                });
            }
        }

        // Loops through the already found iBeacons for audio iBeacons
        // and if they are in range, play them, else stop playing them 
        // As of now, it will allow many to be playing at once.
        private void manageBackgroundAudio()
        {
            // Request access to the iBeacons' dictionary
            semaphore.WaitOne();

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

            // Release semaphore
            semaphore.Release();
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

        // Always returns the iBeacons that satisfy the proximity check
        async Task<IEnumerable<IBeacon>> fetchNewIBeacons() {
            IEnumerable<IBeacon> foundIBeacons = await EstimoteManager.Instance.FetchNearbyBeacons(beaconRegion, new TimeSpan(0, 0, 1));
            List<IBeacon> newIBeacons = new List<IBeacon>();

            foreach (IBeacon foundIBeacon in foundIBeacons)
            {
                newIBeacons.Add(foundIBeacon);
            }

            /*foreach (IBeacon foundIBeacon in foundIBeacons) {
                string prox = foundIBeacon.Proximity.ToString();
                if (satisfiesProximity(prox)) {
                    // Request access to the iBeacons' dictionary
                    semaphore.WaitOne();

                    // See if the foundBeacon is already in the iBeacons dictionary
                    bool alreadyInDict = false;
                    foreach (IBeacon previousIBeacon in iBeacons.Keys)
                    {
                        // If the found beacon is in the dictionary
                        if (foundIBeacon.Minor == previousIBeacon.Minor
                            && foundIBeacon.Major == previousIBeacon.Major)
                        {
                            alreadyInDict = true;
                            string[] value;
                            iBeacons.TryGetValue(previousIBeacon, out value);
                            if (value[0].Equals("false")) // If this iBeacon hasn't been confirmed by javascript
                            {
                                newIBeacons.Add(foundIBeacon); // Add to the return list
                                System.Diagnostics.Debug.WriteLine("=\n= newBeacon <waiting to be used> =\n="); // Debugging
                                break;
                            }
                        }
                    }
                    if (!alreadyInDict) // If not already in the dictionary, add it
                    {
                        iBeacons.Add(foundIBeacon, new string[] { "false", "false", "" });
                        System.Diagnostics.Debug.WriteLine("=\n= newBeacon added to Dictionary =\n="); // Debugging
                        newIBeacons.Add(foundIBeacon); // Add to the return list
                    }

                    // Release semaphore
                    semaphore.Release();
                }
            }*/
            return newIBeacons;
        }

        // Javascript calls this to tell C# to stop reporting the beacon found
        /*public void confirmIBeacon(string minor, string major)
        {
            // Request access to the iBeacons' dictionary
            semaphore.WaitOne();

            foreach (IBeacon iBeacon in iBeacons.Keys)
            {
                if (Convert.ToInt32(iBeacon.Minor).ToString().Equals(minor)
                    && Convert.ToInt32(iBeacon.Major).ToString().Equals(major)) {
                    string[] newValue = new string[3];

                    //string[] oldValue;
                    //iBeacons.TryGetValue(iBeacon, out oldValue);

                    // Currently overwrites audio ibeacons
                    //newValue[0] = "true";
                    //newValue[1] = "false";//oldValue[1];
                    //newValue[2] = "";// oldValue[2];

                    // Throwing a java file not found error
                    //iBeacons[iBeacon] = newValue;
                    break;
                }
            }

            // Release the semaphore
            semaphore.Release();
        }*/

        // Set the iBeacon with the given minor and major values as a background audio
        // iBeacon. Furthermore, stores the audioFileName to play for that audio iBeacon
        public void setIBeaconAsAudioIBeacon(int minor, int major, string audioFileName) {
            // Request access to the iBeacons' dictionary
            semaphore.WaitOne();

            foreach (IBeacon key in iBeacons.Keys)
            {
                // Finding the corresponding iBeacon in the dictionary
                if (key.Minor == (ushort)minor && key.Major == (ushort)major)
                {
                    // Storing the fact that it's an audio iBeacon along with
                    // the audiofile to play for it
                    string[] value = iBeacons[key];
                    value[1] = "true";
                    value[2] = audioFileName;
                    iBeacons[key] = value;
                    break;
                }
            }

            // Release the semaphore
            semaphore.Release();
        }
    }
}