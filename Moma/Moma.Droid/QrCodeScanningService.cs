using System;
using System.Collections.Generic;
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

[assembly: Dependency(typeof(QrCodeScanningService))]
namespace Moma.Droid
{
    class QrCodeScanningService: IQrCodeScanningService
    {
        IJavascriptInterface js;
        public async Task<string> ScanAsync()
        {
            var scanner = new MobileBarcodeScanner();
            var options = new ZXing.Mobile.MobileBarcodeScanningOptions();
            options.PossibleFormats = new List<ZXing.BarcodeFormat>() {
             ZXing.BarcodeFormat.QR_CODE
            };
            var scanResults = await scanner.Scan(options);

            //js.CallJs("showQRText(" + scanResults.Text + ");");

            return scanResults.Text;
        }
    }
}