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

        /// <summary>
        /// 
        /// </summary>
        public MasterPage()
        {
            InitializeComponent();

            var masterPageItems = new List<MasterPageItem>();
            masterPageItems.Add(new MasterPageItem
            {
                Title = AppLanguageResource.Map,
                IconSource = "ic_action_navigate.png",
                TargetType = typeof(MapPage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = AppLanguageResource.Storyline,
                IconSource = "ic_action_map.png",
                TargetType = typeof(StorylinePage)
            });
           masterPageItems.Add(new MasterPageItem
           {
              Title = AppLanguageResource.Scavenger,
              IconSource = "ic_action_search.png",
              TargetType = typeof(ScavengerPage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = AppLanguageResource.Directions,
                IconSource = "ic_action_compass.png",
                TargetType = typeof(DirectionsPage)
            });
            masterPageItems.Add(new MasterPageItem
           {
                Title = AppLanguageResource.Contact,
                IconSource = "ic_action_phone.png",
                TargetType = typeof(ContactPage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = AppLanguageResource.Help,
                IconSource = "ic_action_help.png",
                TargetType = typeof(HelpPage)
            });
            masterPageItems.Add(new MasterPageItem
            {
                Title = AppLanguageResource.Settings,
                IconSource = "ic_action_settings.png",
                TargetType = typeof(SettingsPage)
            });


            listView.ItemsSource = masterPageItems;
        }
    }
}
