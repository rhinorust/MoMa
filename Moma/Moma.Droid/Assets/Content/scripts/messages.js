var messageBox;
var messageBoxTitle;
var messageBoxIBeacons;
var messageBoxQRCodes;

$('document').ready(function () {
    messageBox         = $('#messages');
    messageBoxTitle    = messageBox.find('#title h1');
    messageBoxIBeacons = messageBox.find('#iBeacons ul');
    messageBoxQRCodes  = messageBox.find('#QRCodes ul');

    messageBoxTitle.text("Messages");

    messageBox.find('#close').click(function () {
        messageBox.css('visibility', 'hidden');
    });

    // Debugging
    //addToMessages({ type: 'iBeacon', title: 'Point of Interest 5', minor: 54177, major: 9377 });
    //addToMessages({ type: 'QRCode', title: 'QRCode title', data: 'QRCode data' });
    //showHideMessages();
});

// Examples for poi:
// poi = {type: "QRCode", title: "POI title", data: "Data included in QRCode"}
// or
// poi = {type: "iBeacon", title: "POI title", minor: minor, major: major} 
// post: The given poi is appended as a link to the messages list
function addToMessages(poi) {
    // What jsFunction will be fired when the link is clicked
    var jsFunction = "";
    if (poi.type === "iBeacon")
        jsFunction = "showIBeacon(" + poi.minor + "," + poi.major + ");";
    if (poi.type === "QRCode")
        jsFunction = "showQRCode('" + poi.title + "','" + poi.data + "');";

    // What box we are appending to
    var appendBox = (poi.type === "iBeacon") ? messageBoxIBeacons : messageBoxQRCodes;

    // If there's no items in the appendBox yet, clear the hardcoded string that's sitting there
    if (appendBox.text().indexOf("<li>") === -1)
        appendBox.empty();

    var appendix = '<li><p class="newMessage">NEW</p>';
    // Add what happens when this link is clicked
    appendix += '<a onclick="' + jsFunction;
    // also, when clicked, close the messageBox
    appendix += 'messageBox.css(\'visibility\', \'hidden\');';
    // Prevent link's default behaviour
    appendix += '" href="javascript:void(0);">';
    // Link's title
    appendix += poi.title + '</a>';
    appendix += '</li>';

    // Updating the messageIcon in the C# toolbar
    jsBridge.messageWasAdded(poi.title);

    // Append the link to the correct box
    appendBox.append(appendix);
}

// Called by C# when user clicks the messages icon in the toolbar
// Showing or hiding the messages
function showHideMessages() {
    if (messageBox.css('visibility') === 'hidden')
        messageBox.css('visibility', 'visible');
    else
        messageBox.css('visibility', 'hidden');
}