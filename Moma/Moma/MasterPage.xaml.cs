using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class MasterPage : ContentPage
    {
        public ListView ListView { get { return listView; } }

        public MasterPage()
        {
            InitializeComponent();

            var masterPageItems = new List<MasterPageItem>();
            masterPageItems.Add(new MasterPageItem
            {
                Title = "Map",
                IconSource = "map_icon.png",
                TargetType = typeof(MapPage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = "Storyline",
                IconSource = "storyline_icon.png",
                TargetType = typeof(StorylinePage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = "Scavenger Hunt",
                IconSource = "scavenger_icon.png",
                TargetType = typeof(ScavengerPage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = "Museum  Directions",
                IconSource = "directions_icon.png",
                TargetType = typeof(DirectionsPage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = "Contact",
                IconSource = "contact_icon.png",
                TargetType = typeof(ContactPage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = "Help",
                IconSource = "help_icon.png",
                TargetType = typeof(HelpPage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = "Settings",
                IconSource = "settings_icon.png",
                TargetType = typeof(SettingsPage)
            });


            listView.ItemsSource = masterPageItems;
        }
    }
}
