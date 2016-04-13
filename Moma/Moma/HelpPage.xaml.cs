using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class HelpPage : ContentPage
    {
        Boolean alreadyPlayed;
        public HelpPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Help;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            if (!alreadyPlayed)
            {
                MainPage.Current.playVideo("helpvideo", "Moma instructions", true);
            }
            alreadyPlayed = true;
        }
    
    }
}
