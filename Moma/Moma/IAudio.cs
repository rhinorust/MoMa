using System;

namespace Moma
{
    public interface IAudio
    {
        void PlayAudioFile(string fileName);
        void StopAudioFile(string fileName);
        void StopAllAudio();
        void PlayOrStopAudioFile(string fileName);
    }
}

