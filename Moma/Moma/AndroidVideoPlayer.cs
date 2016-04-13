using Moma.Controls;
using Moma.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Moma
{
    public class AndroidVideoPlayer : ContentPage
    {
        private VideoPlayerView player;
        private  string videoName;

        public string getVideoName()
        {
            return videoName;
        }

        public AndroidVideoPlayer(string videoName, string poiTitle)
        {
            Title = poiTitle;
            this.videoName = videoName;

            player = new VideoPlayerView();

            /*this.ToolbarItems.Add(new ToolbarItem
            {
                Order = ToolbarItemOrder.Secondary,
                Text = "Controller",
                Command = new Command(() => {
                    this.player.VideoPlayer.AddVideoController = !this.player.VideoPlayer.AddVideoController;
                })
            });*/

            /*this.ToolbarItems.Add(new ToolbarItem
            {
                Order = ToolbarItemOrder.Secondary,
                Text = "Full Screen",
                Command = new Command(() => {

                    // resize the Content for full screen mode
                    this.player.VideoPlayer.FullScreen = !this.player.VideoPlayer.FullScreen;
                    if (this.player.VideoPlayer.FullScreen)
                    {
                        this.player.HeightRequest = -1;
                        this.Content.VerticalOptions = LayoutOptions.FillAndExpand;
                        player.VideoPlayer.FullScreen = true;
                    }
                    else
                    {
                        this.player.HeightRequest = 200;
                        this.Content.VerticalOptions = LayoutOptions.StartAndExpand;
                        player.VideoPlayer.FullScreen = false;
                    }
                })
            });*/

            /*this.ToolbarItems.Add(new ToolbarItem
            {
                Order = ToolbarItemOrder.Secondary,
                Text = "Play",
                Command = new Command(() => {
                    this.player.VideoPlayer.PlayerAction = Library.VideoState.PLAY;
                })
            });

            this.ToolbarItems.Add(new ToolbarItem
            {
                Order = ToolbarItemOrder.Secondary,
                Text = "Stop",
                Command = new Command(() => {
                    this.player.VideoPlayer.PlayerAction = Library.VideoState.STOP;
                })
            });

            this.ToolbarItems.Add(new ToolbarItem
            {
                Order = ToolbarItemOrder.Secondary,
                Text = "Pause",
                Command = new Command(() => {
                    this.player.VideoPlayer.PlayerAction = Library.VideoState.PAUSE;
                })
            });

            this.ToolbarItems.Add(new ToolbarItem
            {
                Order = ToolbarItemOrder.Secondary,
                Text = "Restart",
                Command = new Command(() => {
                    this.player.VideoPlayer.PlayerAction = Library.VideoState.RESTART;
                })
            });*/

            // heightRequest must be set if not full screen
            //player.HeightRequest = 200;
            player.VideoPlayer.AddVideoController = true;

            // location in raw folder
            player.VideoPlayer.FileSource = videoName;

            // autoplay video
            player.VideoPlayer.AutoPlay = true;

            this.Content = new StackLayout
            {
                VerticalOptions = LayoutOptions.StartAndExpand,
                Children =
                {
                    player
                }
            };

            // Go fullscreen
            this.player.HeightRequest = -1;
            this.Content.VerticalOptions = LayoutOptions.FillAndExpand;
            player.VideoPlayer.FullScreen = true;
        }

        protected override void OnDisappearing()
        {
            Library.VideoState videoState = this.player.VideoPlayer.State;
            if (videoState != Library.VideoState.ENDED)
                MainPage.Current.videoEnded(videoName);
            MainPage.Current.showMessageToolbarIcon(true);
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            this.player.VideoPlayer.PropertyChanged += (object sender, System.ComponentModel.PropertyChangedEventArgs e) => {
                if (e.PropertyName == MyVideoPlayer.StateProperty.PropertyName)
                {
                    var s = this.player.VideoPlayer.State;
                    if (s == Library.VideoState.ENDED)
                    {
                        System.Diagnostics.Debug.WriteLine("State: ENDED");
                        // Notify MainPage so the next video in the playqueue can be played.
                        MainPage.Current.videoEnded(videoName);
                    }
                    else if (s == Library.VideoState.PAUSE)
                    {
                        System.Diagnostics.Debug.WriteLine("State: PAUSE");
                    }
                    else if (s == Library.VideoState.PLAY)
                    {
                        System.Diagnostics.Debug.WriteLine("State: PLAY");
                    }
                    else if (s == Library.VideoState.STOP)
                    {
                        System.Diagnostics.Debug.WriteLine("State: STOP");
                    }
                }
                else if (e.PropertyName == MyVideoPlayer.InfoProperty.PropertyName)
                {
                    System.Diagnostics.Debug.WriteLine("Info:\r\n" + this.player.VideoPlayer.Info);
                }
            };
            MainPage.Current.showMessageToolbarIcon(false);
        }

        protected override void OnSizeAllocated(double width, double height)
        {
            this.player.VideoPlayer.ContentHeight = height;
            this.player.VideoPlayer.ContentWidth = width;
            if (width < height)
            {

                this.player.VideoPlayer.Orientation = Controls.MyVideoPlayer.ScreenOrientation.PORTRAIT;
            }
            else {
                this.player.VideoPlayer.Orientation = Controls.MyVideoPlayer.ScreenOrientation.LANDSCAPE;
            }
            this.player.VideoPlayer.OrientationChanged();
            base.OnSizeAllocated(width, height);
        }
    }
}
