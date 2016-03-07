using System;
using System.Collections.Generic;
using Estimotes;
using Xamarin.Forms;

namespace Moma
{
    public class IBeaconsDirector
    {
        BeaconRegion beaconRegion;     // We'll be directing iBeacons within this beaconRegion,
        String UUID;                   // the iBeacons use this UUID
        IEnumerable<IBeacon> ibeacons; // and will be stored here when found during scanning,
        IJavascriptInterface map;      // notifying the indoor map when desired

        bool scanning;  // Is the IBeaconManager scanning for iBeacons?

        public IBeaconsDirector()
        {
            scanning = false;

            UUID = "b9407f30-f5f8-466e-aff9-25556b57fe6d";
            beaconRegion = new BeaconRegion("Musee Des Ondes", UUID);
            map = DependencyService.Get<IJavascriptInterface>();
        }

        public async void startScanning()
        {
            var status = await EstimoteManager.Instance.Initialize();
            if (status != BeaconInitStatus.Success)
            {
                // BlueTooth is disabled or unsupported on device
                // System.Diagnostics.Debug.WriteLine("");
                scanning = false;
            }
            else {
                EstimoteManager.Instance.Ranged += (sender, beacons) => { };
                EstimoteManager.Instance.RegionStatusChanged += (sender, region) => { };

                EstimoteManager.Instance.StartRanging(beaconRegion);

                int onTickInterval = 1000; // makes it call OnTick with that ms period
                var timer = new Timer(OnTick, null, 1000, onTickInterval);

                scanning = true;
            }
        }

        public void OnTick(object args)
        {
            Device.BeginInvokeOnMainThread(async () =>
            {
                ibeacons = await EstimoteManager.Instance.FetchNearbyBeacons(beaconRegion, new TimeSpan(0, 0, 5));
                foreach (IBeacon ibeacon in ibeacons)
                {
                    // Accessable properties of iBeacons:
                    // -> ibeacon.Minor,
                    // -> ibeacon.Major,
                    // -> ibeacon.Proximity.ToString() returns: "Unknown", "Far", "Near" or "Immediate",
                    // -> ibeacon.Uuid
                    if ("Immediate".Equals(ibeacon.Proximity.ToString()))
                        map.CallJs("iBeaconDiscovered(" + ibeacon.Major + "," + ibeacon.Minor + ");");
                }
            });
        }

        // Returns true if the IBeaconDirector is scanning for iBeacons
        public bool isScanning()
        {
            return scanning;
        }
    }
}