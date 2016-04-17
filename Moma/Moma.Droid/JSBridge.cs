﻿using System;
using System.Diagnostics;
using Android.Webkit;
using App1.Droid;
using Java.Interop;
using Xamarin.Forms;
using Object = Java.Lang.Object;

namespace Moma.Droid
{
    public class JSBridge : Object
    {
        private readonly WeakReference<HybridWebViewRenderer> hybridWebViewRenderer;
        private HybridWebViewRenderer hybridRenderer;
        private readonly IJavascriptInterface js = DependencyService.Get<IJavascriptInterface>();

        public JSBridge(HybridWebViewRenderer hybridRenderer)
        {
            hybridWebViewRenderer = new WeakReference<HybridWebViewRenderer>(hybridRenderer);
        }

        [JavascriptInterface]
        [Export("invokeAction")]
        public void InvokeAction(string data)
        {
            if (hybridWebViewRenderer != null && hybridWebViewRenderer.TryGetTarget(out hybridRenderer))
            {
                hybridRenderer.Element.InvokeAction(data);
            }
        }

        // ==========================
        // Playing and stopping audio
        // ==========================
        [JavascriptInterface]
        [Export]
        public void playAudioFile(string fileName)
        {
            DependencyService.Get<IAudio>().PlayAudioFile(fileName);
        }

        [JavascriptInterface]
        [Export]
        public void stopAudioFile(string fileName)
        {
            DependencyService.Get<IAudio>().StopAudioFile(fileName);
        }

        [JavascriptInterface]
        [Export]
        public void stopAllAudio()
        {
            DependencyService.Get<IAudio>().StopAllAudio();
        }

        [JavascriptInterface]
        [Export]
        public void playOrStopAudioFile(string fileName)
        {
            DependencyService.Get<IAudio>().PlayOrStopAudioFile(fileName);
        }

        [JavascriptInterface]
        [Export]
        public void setIBeaconAsAudioIBeacon(int minor, int major, string audioFileName)
        {
            App.Current.IBeaconsDirector().setIBeaconAsAudioIBeacon(minor, major, audioFileName);
        }

        // ==============
        // Video playback
        // ==============
        [JavascriptInterface]
        [Export]
        public void playVideo(string videoName, string poiTitle, bool interrupt)
        {
            MainPage.Current.playVideo(videoName, poiTitle, interrupt);
        }

        // ==============
        // QR Codes stuff
        // ==============
        [JavascriptInterface]
        [Export]
        public async void ScanQRCode()
        {
            var result = await DependencyService.Get<IQrCodeScanningService>().ScanAsync();
            if (result != "")
            {
                js.CallJs("showQRText('" + result.Replace("\n", " ") + "');");
            }
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

        [JavascriptInterface]
        [Export]
        public string getLanguage()
        {
            var userSettings = new AndroidUserSettings();
            var language = userSettings.GetUserSetting("language");

            if (language.ToLower().Equals("english"))
            {
                return "en";
            }
            if (language.ToLower().Equals("french"))
            {
                return "fr";
            }
            if (language.ToLower().Equals("deutsche"))
            {
                return "de";
            }
            return "en";
        }

        // ==========================
        // Changing the messagesIcon
        // ==========================
        [JavascriptInterface]
        [Export]
        public void messageWasAdded(string messageTitle)
        {
            // Tells the MapPage there was one message added which will
            // update the messagesIcon to the new number of unread messages
            MainPage.Current.messageWasAdded(messageTitle);
        }

        [JavascriptInterface]
        [Export]
        public void messageWasRead(string messageTitle)
        {
            // Tells the MapPage there was one message read which will
            // update the messagesIcon to the new number of unread messages
            MainPage.Current.messageWasRead(messageTitle);
        }

        [JavascriptInterface]
        [Export]
        public void showMessageToolbarIcon(bool visible)
        {
            MainPage.Current.showMessageToolbarIcon(visible);
        }

        // ==========
        // Debugging
        // ==========
        [JavascriptInterface]
        [Export]
        public void print(string text)
        {
            Debug.WriteLine("\n=\n=\n=\n=" + text + "\n=\n=\n=\n=");
        }

        // ========
        // iBeacons
        // ========
        [JavascriptInterface]
        [Export]
        public void startScanningForIBeacons()
        {
            App.Current.IBeaconsDirector().startScanningForIBeacons();
        }

        [JavascriptInterface]
        [Export]
        public void stopScanningForIBeacons()
        {
            App.Current.IBeaconsDirector().stopScanningForIBeacons();
        }


        // ========
        // native popup
        // ========
        [JavascriptInterface]
        [Export]
        public async void confirmPopup(string storylineID)
        {
            var storylineContext = new StorylinePage();
            var answer = await storylineContext.confirmPopup();

            if (answer)
            {
                js.CallJs("localStorage.removeItem('currentStoryline');" +
                          "localStorage.removeItem('lastVisitedNodeID');" +
                          "localStorage.setItem('currentStoryline'," + storylineID + ");" +
                          "window.location.replace('storyline_index.html');");
            }

            if (answer == false)
            {
                js.CallJs("window.location.replace('storyline_index.html');");
            }
        }

        [JavascriptInterface]
        [Export]
        public async void confirmPreviewPopup(string storylineID)
        {
            var storylineContext = new StorylinePage();
            var answer = await storylineContext.confirmPopup();

            if (answer)
            {
                js.CallJs("localStorage.removeItem('previewStoryline');" +
                          "localStorage.removeItem('currentStoryline');" +
                          "localStorage.removeItem('lastVisitedNodeID');" +
                          "localStorage.setItem('currentStoryline'," + storylineID + ");" +
                          "window.location.replace('storyline_index.html');");
            }
        }
    }
}