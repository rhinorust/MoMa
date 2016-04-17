using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moma.Droid;
using Xamarin.Forms;
using ZXing;
using ZXing.Mobile;

[assembly: Dependency(typeof (QrCodeScanningService))]

namespace Moma.Droid
{
    internal class QrCodeScanningService : IQrCodeScanningService
    {
        private static Hashtable scannedQRCodes;
        private IJavascriptInterface js;

        public async Task<string> ScanAsync()
        {
            var scanner = new MobileBarcodeScanner();
            var options = new MobileBarcodeScanningOptions();
            options.PossibleFormats = new List<BarcodeFormat>
            {
                BarcodeFormat.QR_CODE
            };
            var scanResults = await scanner.Scan(options);

            if (scanResults != null)
            {
                addQRCode(scanResults.Text);
                return scanResults.Text;
            }
            return "";
        }

        public int getNumberQRCodes()
        {
            if (scannedQRCodes == null)
            {
                return 0;
            }
            return scannedQRCodes.Count;
        }

        public void addQRCode(string text)
        {
            if (scannedQRCodes == null)
            {
                scannedQRCodes = new Hashtable();
            }

            if (!scannedQRCodes.ContainsValue(text))
            {
                scannedQRCodes.Add(Guid.NewGuid(), text);
            }
        }

        public Hashtable getQRList()
        {
            return scannedQRCodes;
        }
    }
}