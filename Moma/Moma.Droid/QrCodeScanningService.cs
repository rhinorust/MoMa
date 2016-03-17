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
        public async Task<string> ScanAsync()
        {
            var scanner = new MobileBarcodeScanner();
            var scanResults = await scanner.Scan();

            return scanResults.Text;
        }
    }
}