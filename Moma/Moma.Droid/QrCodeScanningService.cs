using System;
using System.Collections;
using System.Linq;
using System.Text;
using Xamarin.Forms;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using ZXing.Mobile;
using System.Threading.Tasks;
using Moma.Droid;
using System.Globalization;
using System.Threading;
using System.Collections.Generic;

[assembly: Dependency(typeof(QrCodeScanningService))]
namespace Moma.Droid
{
    class QrCodeScanningService: IQrCodeScanningService
    {
        IJavascriptInterface js;
        static Hashtable scannedQRCodes;

        public async Task<string> ScanAsync()
        {
            var scanner = new MobileBarcodeScanner();
            var options = new ZXing.Mobile.MobileBarcodeScanningOptions();
            options.PossibleFormats = new List<ZXing.BarcodeFormat>() {
             ZXing.BarcodeFormat.QR_CODE
            };
            var scanResults = await scanner.Scan(options);

            //js.CallJs("showQRText(" + scanResults.Text + ");");
            if (scanResults != null) {
                addQRCode(scanResults.Text);
                js.CallJs("addToMessages({type: 'QRCode', title: 'QrCode', data: '" + scanResults.Text + "'");
                return scanResults.Text;
            }
            else
            {
                return "";
            }
           // return scanResults.Text;
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

        public int getNumberQRCodes()
        {
            if (scannedQRCodes == null)
            {
                return 0;
            }
            else {
                return scannedQRCodes.Count;
            }
        }

        public Hashtable getQRList()
        {
            return scannedQRCodes;
        }


    }
}
