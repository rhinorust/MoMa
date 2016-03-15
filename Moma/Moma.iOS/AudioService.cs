using System;
using Xamarin.Forms;
using App1.iOS;
using System.IO;
using Foundation;
using AVFoundation;
using Moma;
using System.Collections.Generic;

[assembly: Dependency(typeof(AudioService))]
namespace App1.iOS
{
    public class AudioService : IAudio
    {
        Dictionary<string, AVAudioPlayer> mediaPlayers;

        public AudioService() {
            mediaPlayers = new Dictionary<string, AVAudioPlayer>();
        }

        // Plays the given fileName. Example:
        // playAudioFile("MOEB POINT 4 - Small.mp3") will play Droid/Assets/Content/audio/MOEB POINT 4 - Small.mp3
        public void PlayAudioFile(string fileName) {
            // If this mediaPlayer has been created before, just replay it
            if (mediaPlayers.ContainsKey(fileName)) {
                AVAudioPlayer player;
                mediaPlayers.TryGetValue(fileName, out player);
                player.Stop();
                player.CurrentTime = 0;
                player.Play();
            else {
                string sFilePath = NSBundle.MainBundle.PathForResource(Path.GetFileNameWithoutExtension(fileName),
                                                                       Path.GetExtension(fileName));
                var url = NSUrl.FromString(sFilePath);

                AVAudioPlayer player = AVAudioPlayer.FromUrl(url);
                //.FinishedPlaying += (object sender, AVStatusEventArgs e) => {
                //    player = null;
                //};
                player.Play();
                mediaPlayers.Add(fileName, player);
            }
        }

        // Stops the given fileName (if it is playing). Example:
        // stopAudioFile("MOEB POINT 4 - Small.mp3") will stop Droid/Assets/Content/audio/MOEB POINT 4 - Small.mp3
        public void StopAudioFile(string fileName) {
            if (mediaPlayers.ContainsKey(fileName)) {
                AVAudioPlayer player;
                mediaPlayers.TryGetValue(fileName, out player);
                player.Stop();
                player.CurrentTime = 0;
            }
        }

        // Will stop all audio playing
        public void StopAllAudio() {
            foreach (KeyValuePair<string, AVAudioPlayer> entry in mediaPlayers) {
                entry.Value.Stop();
                entry.Value.CurrentTime = 0;
            }
        }

        public void PlayOrStopAudioFile(string fileName) {
            // Not implemented
        }
    }
}

