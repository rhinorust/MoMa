using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace Moma
{
    public partial class MapPage : ContentPage
    {
        public static MapPage Current { get; set; }

        // The toolbar item that represents the messages
        private ToolbarItem messagesToolbarItem;

        // How many messages are unread
        private Dictionary<string, bool> unreadMessages;

        public MapPage()
        {
            InitializeComponent();
            Title = AppLanguageResource.Map;
            
            // Messages toolbar item
            messagesToolbarItem = new ToolbarItem("Messages", "messages_none.png", showHideMessages);
            ToolbarItems.Add(messagesToolbarItem);
            unreadMessages = new Dictionary<string, bool>();

            ToolbarItems.Add(new ToolbarItem("Search", "mag.png", showHideSearchBar));

            // Keeping the instance of this page in the Current
            Current = this;
        }

        public void showHideSearchBar()
        {
            var jsInterface = DependencyService.Get<IJavascriptInterface>();
            jsInterface.ShowHideSearchBar();
        }

        public void showHideMessages()
        {
            var jsInterface = DependencyService.Get<IJavascriptInterface>();
            jsInterface.CallJs("showHideMessages();");
        }

        // Changing the icon of the messages' toolbar icon
        private void setIconForMessages(string picture)
        {
            messagesToolbarItem.Icon = new FileImageSource { File = "drawable/" + picture };
        }

        // Add the message which has the message title messageTitle
        // to the list of unread messages
        public void messageWasAdded(string messageTitle)
        {
            if (!unreadMessages.ContainsKey(messageTitle))
                unreadMessages.Add(messageTitle, false);
            updateMessageIcon();
        }

        // Remove the message which has the message title messageTitle
        // from the list of unread messages if it exists there
        public void messageWasRead(string messageTitle)
        {
            if (unreadMessages.ContainsKey(messageTitle))
                unreadMessages.Remove(messageTitle);
            updateMessageIcon();
        }

        private void updateMessageIcon()
        {
            if (unreadMessages.Count == 0) setIconForMessages("messages_none.png");
            if (unreadMessages.Count == 1) setIconForMessages("messages_one.png");
            if (unreadMessages.Count == 2) setIconForMessages("messages_two.png");
            if (unreadMessages.Count >= 3) setIconForMessages("messages_plus.png");
        }
    }
}
