using System;
using System.Threading;
using System.Threading.Tasks;

namespace Moma
{
    public delegate void TimerCallback(object state);

    public class Timer : CancellationTokenSource, IDisposable
    {
        public Timer(TimerCallback callback, object state, int delayBeforeTimerStarts, int interval)
        {
            Task.Delay(delayBeforeTimerStarts, Token).ContinueWith(async (t, s) =>
            {
                var tuple = (Tuple<TimerCallback, object>)s;

                while (true)
                {
                    if (IsCancellationRequested)
                        break;
                    Task.Run(() => tuple.Item1(tuple.Item2));
                    await Task.Delay(interval);
                }

            }, Tuple.Create(callback, state), CancellationToken.None,
                TaskContinuationOptions.ExecuteSynchronously | TaskContinuationOptions.OnlyOnRanToCompletion,
                TaskScheduler.Default);
        }

        public new void Dispose() { base.Cancel(); }
    }
}