using Xamarin.Forms;

namespace Moma
{
    public partial class HelpPage : ContentPage
    {
        private bool alreadyPlayed;

        public HelpPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Help;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            MainPage.Current.showMessageToolbarIcon(false);

            if (!alreadyPlayed)
            {
                MainPage.Current.playVideo("helpvideo", "Moma Instructions", true);
            }
            alreadyPlayed = true;
        }
    }
}