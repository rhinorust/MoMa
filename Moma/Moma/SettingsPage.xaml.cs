using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class SettingsPage : ContentPage
    {
        private Dictionary<string, string> languageDict = new Dictionary<string, string>
        {
            {"English", "english"},
            {"French", "french" },
            {"Deutsche", "deutsche" }
        };
        public SettingsPage()
        {
            InitializeComponent();
            var grid = new Grid
            {
                VerticalOptions = LayoutOptions.FillAndExpand,
                HorizontalOptions = LayoutOptions.FillAndExpand,
                RowDefinitions =
                {
                    new RowDefinition { Height = GridLength.Auto },
                    new RowDefinition { Height = GridLength.Auto }
                },
                ColumnDefinitions =
                {
                    new ColumnDefinition { Width = GridLength.Auto },
                    new ColumnDefinition { Width = new GridLength(1, GridUnitType.Star) },
                }
            };

            grid.Children.Add(new Label
            {
                Text = "Language",
                TextColor = Color.Black,
            },0,0);

            Picker picker = new Picker
            {
                Title = "Color",
                VerticalOptions = LayoutOptions.CenterAndExpand
            };

            picker.SelectedIndexChanged += ChangeLanguageSettings;

            foreach (var lang in languageDict.Keys)
            {
                picker.Items.Add(lang);
            }

            grid.Children.Add(picker,1,0);



            Content = grid;
        }

        protected void ChangeLanguageSettings(object sender, EventArgs e)
        {
            var picker = sender as Picker;
            var settings = DependencyService.Get<IUserSettings>();
            if (picker.SelectedIndex == -1)
            {
                settings.SetUserSetting("language", "english");
            }
            else
            {
                string languageValue;
                if (languageDict.TryGetValue(picker.Items[picker.SelectedIndex], out languageValue))
                {
                    settings.SetUserSetting("language", languageValue);
                }
            }
        }
    }
}
