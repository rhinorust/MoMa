using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class StorylinePage : ContentPage
    {
        public StorylinePage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Storyline;
        }

        public async Task<bool> confirmPopup()
        {
            return await DisplayAlert(AppLanguageResource.ActiveStoryline, AppLanguageResource.ActiveQuestion, AppLanguageResource.Yes, AppLanguageResource.No);
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            MainPage.Current.showMessageToolbarIcon(true);
        }
    }
}
