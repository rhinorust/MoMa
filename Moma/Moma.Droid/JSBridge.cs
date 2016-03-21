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

        public JSBridge (HybridWebViewRenderer hybridRenderer)
		{
			hybridWebViewRenderer = new WeakReference <HybridWebViewRenderer> (hybridRenderer);
		}

		[JavascriptInterface]
		[Export ("invokeAction")]
		public void InvokeAction (string data)
		{
			HybridWebViewRenderer hybridRenderer;

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
    }
}

