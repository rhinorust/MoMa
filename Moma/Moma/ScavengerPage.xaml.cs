using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class ScavengerPage : ContentPage
    {
        public ScavengerPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Scavenger;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            MainPage.Current.showMessageToolbarIcon(false);
        }
    }
}
