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
            return await DisplayAlert("Active Storyline", "There is currently an active storyline, are you sure you want to start a new one?", "Yes", "No");
        }
    }
}
