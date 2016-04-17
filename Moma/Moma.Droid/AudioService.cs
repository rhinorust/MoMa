using System.Collections.Generic;
using Android.Media;
using Moma.Droid;
using Xamarin.Forms;
using Application = Android.App.Application;

[assembly: Dependency(typeof (AudioService))]

namespace Moma.Droid
{
    public class AudioService : IAudio
    {
        private IJavascriptInterface js;
        private readonly Dictionary<string, MediaPlayer> mediaPlayers;

        public AudioService()
        {
            mediaPlayers = new Dictionary<string, MediaPlayer>();
            js = DependencyService.Get<IJavascriptInterface>();
        }

        // Plays the given fileName if it's not already playing. Example:
        // playAudioFile("MOEB POINT 4 - Small.mp3") will play Droid/Assets/Content/audio/MOEB POINT 4 - Small.mp3
        // if it's not already playing
        public void PlayAudioFile(string fileName)
        {
            var player = getPlayer(fileName);
            if (player != null)
            {
                if (!player.IsPlaying)
                {
                    player.Stop();
                    player.Prepare(); // Replays it
                }
            }
            else createPlayerAndPlay(fileName);
        }

        // Stops the given fileName (if it is playing). Example:
        // stopAudioFile("MOEB POINT 4 - Small.mp3") will stop Droid/Assets/Content/audio/MOEB POINT 4 - Small.mp3
        public void StopAudioFile(string fileName)
        {
            var player = getPlayer(fileName);
            if (player != null && player.IsPlaying)
            {
                player.SeekTo(0);
                player.Stop();
            }
        }

        // Will stop all audio playing
        public void StopAllAudio()
        {
            foreach (var entry in mediaPlayers)
            {
                if (entry.Value.IsPlaying)
                {
                    entry.Value.SeekTo(0);
                    entry.Value.Stop();
                }
            }
        }

        public void PlayOrStopAudioFile(string fileName)
        {
            var player = getPlayer(fileName);
            if (player != null)
            {
                if (player.IsPlaying) StopAudioFile(fileName);
                else PlayAudioFile(fileName);
            }
            else createPlayerAndPlay(fileName);
        }

        // Returns the MediaPlayer instance if it exists, null otherwise
        private MediaPlayer getPlayer(string fileName)
        {
            MediaPlayer player = null;
            if (mediaPlayers.ContainsKey(fileName))
                mediaPlayers.TryGetValue(fileName, out player);
            return player;
        }

        // Creates an instance of MediaPlayer for the given
        // fileName, plays it and stores in the dictionary
        private void createPlayerAndPlay(string fileName)
        {
            var player = new MediaPlayer();
            var fd = Application.Context.Assets.OpenFd("Content/" + fileName);
            player.Prepared += (s, e) => { player.Start(); };
            player.SetDataSource(fd.FileDescriptor, fd.StartOffset, fd.Length);
            player.Prepare();
            mediaPlayers.Add(fileName, player);
        }
    }
}