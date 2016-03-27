using System;
using Android.Webkit;
using Moma.Droid;
using Java.Interop;
using Android.Widget;
using Android.Content;
using Xamarin.Forms;

namespace Moma.Droid
{
	public class JSBridge : Java.Lang.Object
	{
		readonly WeakReference<HybridWebViewRenderer> hybridWebViewRenderer;
        HybridWebViewRenderer hybridRenderer;
        IJavascriptInterface js = DependencyService.Get<IJavascriptInterface>();

        public JSBridge (HybridWebViewRenderer hybridRenderer)
		{
			hybridWebViewRenderer = new WeakReference <HybridWebViewRenderer> (hybridRenderer);
		}

		[JavascriptInterface]
		[Export ("invokeAction")]
		public void InvokeAction (string data)
		{

			if (hybridWebViewRenderer != null && hybridWebViewRenderer.TryGetTarget (out hybridRenderer)) {
				hybridRenderer.Element.InvokeAction (data);
			}
		}

        // ==========================
        // Playing and stopping audio
        // ==========================
        [JavascriptInterface]
        [Export]
        public void playAudioFile(String fileName) {
            DependencyService.Get<IAudio>().PlayAudioFile(fileName);
        }

        [JavascriptInterface]
        [Export]
        public void stopAudioFile(String fileName) {
            DependencyService.Get<IAudio>().StopAudioFile(fileName);
        }

        [JavascriptInterface]
        [Export]
        public void stopAllAudio() {
            DependencyService.Get<IAudio>().StopAllAudio();
        }

        [JavascriptInterface]
        [Export]
        public void playOrStopAudioFile(string fileName) {
            DependencyService.Get<IAudio>().PlayOrStopAudioFile(fileName);
        }

        [JavascriptInterface]
        [Export]
        public async void ScanQRCode()
        {
         var result =  await DependencyService.Get<IQrCodeScanningService>().ScanAsync();
            if (result != ""){
                js.CallJs("showQRText('" + result.Replace("\n", " ") + "');");
            }            //jllJs("showQRText('fuck you bitch');");
            //
            // js.CallJs("showQRText('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh\nbyeeeeeeehttps://www.the-qrcode-generator.com/sd.knfhsk;dfnkdslfn,sd cds\nsflkcndsl,c dlk ckdsnfdksnmckdsncsancks.\ncz xmc,ashkclsanc.aldsajf;sancms,c zxkcsc\n c c cc c c  c c c c c c c c c c c\nbakakdcbsnc nxz\ncz xmcbskcbaskdbn,snchsaikcbkc\nzxc jxkchalsicsalclasx\nzc ,jxbshcbz,cbnas,kfhcbxcjzxbc mzx\nz c,sbccbsjbcjsbcjsbc\nzacnxmx cmxzncshdskancmx,cnzxc,\n,mcxz ccksnc\naskj\nalskncl.knsklsanck');");

        }

        [JavascriptInterface]
        [Export]
        public void showQRCodeText()
        {
            var sample = "Emile Berliner\nBorn in Germany May 20, 1851, he first worked as a printer, then as a clerk in a\nfabric store. It was here that his talent as an inventor first surfaced.He invented a\nnew loom for weaving cloth. Emile Berliner immigrated to the United States in 1870, following the example of a friend.He spent much of his time at the library\nof the Cooper Institute where he took a keen interest in electricity and sound.";
           js.CallJs("showQRText('" + sample.Replace("\n", " ") + "');");
        }

        public void redirect()
        {
        }
        [JavascriptInterface]
        [Export]
        public int getQRNumber()
        {
            var num = DependencyService.Get<IQrCodeScanningService>().getNumberQRCodes();

            return num;
        }

    }
}

