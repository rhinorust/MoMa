using System.ComponentModel;
using Android.App;
using Android.Content;
using Android.Graphics;
using Android.Views;
using Android.Widget;
using App1.Droid;
using Moma.Controls;
using Moma.Library;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
using RelativeLayout = Android.Widget.RelativeLayout;

[assembly: ExportRenderer(typeof (MyVideoPlayer), typeof (MyVideoPlayerRenderer))]

namespace App1.Droid
{
    public class MyVideoPlayerRenderer : ViewRenderer<MyVideoPlayer, RelativeLayout>
    {
        private bool _AttachedController;
        private RelativeLayout _MainLayout;
        private MediaController _MCController;
        private MyVideoView _MyVideoView;

        public MyVideoPlayerRenderer()
        {
            _AttachedController = false;
        }

        protected override void Dispose(bool disposing)
        {
            if (_MCController != null && _MyVideoView != null)
            {
                _MyVideoView.SetMediaController(null);
            }
            if (_MCController != null)
            {
                _MCController.Dispose();
                _MCController = null;
            }

            if (_MyVideoView != null)
            {
                _MyVideoView.StopPlayback();
                _MyVideoView.Dispose();
                _MyVideoView = null;
            }
            base.Dispose(disposing);
        }

        protected override void OnElementChanged(ElementChangedEventArgs<MyVideoPlayer> e)
        {
            base.OnElementChanged(e);
            if (Control == null)
            {
                var layoutInflater = (LayoutInflater) Context.GetSystemService(Context.LayoutInflaterService);
                _MainLayout = (RelativeLayout) layoutInflater.Inflate(Resource.Layout.VideoLayout, null);
                SetNativeControl(_MainLayout);
            }

            _MyVideoView = Control.FindViewById<MyVideoView>(Resource.Id.videoView1);


            // full screen hack?  
            ResizeScreen(true); //this.Element.FullScreen);

            // must set reference to root element
            _MyVideoView.ParentElement = Element;

            // pick controller
            _MCController = new MediaController(Context);
            _MCController.SetMediaPlayer(_MyVideoView);

            if (Element.AddVideoController)
            {
                _AttachedController = true;
                _MyVideoView.SetMediaController(_MCController);
            }
            else
            {
                _AttachedController = false;
            }

            // load file
            _MyVideoView.LoadFile(Element.FileSource);

            if (Element.AutoPlay)
            {
                // play if set to autoplay on load
                _MyVideoView.Play();
            }
        }

        protected override void OnElementPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            base.OnElementPropertyChanged(sender, e);
            var source = Element;
            if (source != null && _MyVideoView != null)
            {
                if (e.PropertyName == MyVideoPlayer.SeekProperty.PropertyName)
                {
                    _MyVideoView.SeekTo((int) Element.Seek);
                }
                else if (e.PropertyName == MyVideoPlayer.FileSourceProperty.PropertyName)
                {
                    // load the play file
                    _MyVideoView.LoadFile(Element.FileSource);
                    _MyVideoView.Play();
                }
                else if (e.PropertyName == MyVideoPlayer.AddVideoControllerProperty.PropertyName)
                {
                    if (source.AddVideoController && _AttachedController == false)
                    {
                        _MyVideoView.SetMediaController(_MCController);
                    }
                    else
                    {
                        _MyVideoView.SetMediaController(null);
                    }
                }
                else if (e.PropertyName == MyVideoPlayer.FullScreenProperty.PropertyName)
                {
                    ResizeScreen(source.FullScreen);
                }
                else if (e.PropertyName == "OrientationChanged")
                {
                    ResizeScreen(source.FullScreen);
                }
                else if (e.PropertyName == MyVideoPlayer.ActionBarHideProperty.PropertyName)
                {
                    ResizeScreen(source.FullScreen);
                }
                else if (e.PropertyName == MyVideoPlayer.PlayerActionProperty.PropertyName)
                {
                    if (source.PlayerAction == VideoState.PAUSE)
                    {
                        _MyVideoView.Pause();
                    }
                    else if (source.PlayerAction == VideoState.PLAY)
                    {
                        _MyVideoView.Play();
                    }
                    else if (source.PlayerAction == VideoState.RESTART)
                    {
                        _MyVideoView.SeekTo(0);
                        _MyVideoView.Play();
                    }
                    else if (source.PlayerAction == VideoState.STOP)
                    {
                        _MyVideoView.StopPlayback();
                    }
                }
            }
        }

        private void ResizeScreen(bool fullscreen)
        {
            var a = Context as Activity;
            if (Element.ActionBarHide)
            {
                a.ActionBar.Hide();
            }
            else
            {
                a.ActionBar.Show();
            }
            if (fullscreen)
            {
                var p = _MyVideoView.LayoutParameters as RelativeLayout.LayoutParams;
                p.Height = LayoutParams.FillParent;

                // added works ok for rotation
                var view = a.Window.DecorView;
                var rect = new Rect();
                view.GetWindowVisibleDisplayFrame(rect);

                var width = (int) Element.ContentWidth;
                var height = Element.ActionBarHide ? rect.Height() : (int) Element.ContentHeight;
                var holder = _MyVideoView.Holder;

                p.Height = height;
                p.Width = width;

                holder.SetFixedSize(width, height);
                // end

                p.AlignWithParent = true;
                _MyVideoView.LayoutParameters = p;
            }
            else
            {
                var p = _MyVideoView.LayoutParameters as RelativeLayout.LayoutParams;
                if (Element.HeightRequest > 0 || Element.WidthRequest > 0)
                {
                    if (Element.HeightRequest > 0)
                    {
                        p.Height = (int) Element.HeightRequest;
                    }
                    if (Element.WidthRequest > 0)
                    {
                        p.Width = (int) Element.WidthRequest;
                    }
                    _MyVideoView.LayoutParameters = p;
                }
                p.AlignWithParent = false;
                _MyVideoView.LayoutParameters = p;
            }

            InvalidLayout();
        }

        private void InvalidLayout()
        {
            if (Element.Orientation == MyVideoPlayer.ScreenOrientation.LANDSCAPE)
            {
            }
            Device.BeginInvokeOnMainThread(() =>
            {
                _MyVideoView.ForceLayout();
                _MyVideoView.RequestLayout();
                _MyVideoView.Holder.SetSizeFromLayout();
                _MyVideoView.Invalidate();
            });
        }
    }
}