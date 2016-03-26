var messageBox;
var boxTitle;
var boxIBeacons;
var boxQRCodes;

$('document').ready(function () {
    messageBox  = $('#messages');
    boxTitle    = messageBox.find('#title h1');
    boxIBeacons = messageBox.find('#iBeacons ul');
    boxQRCodes = messageBox.find('#QRCodes ul');

    boxTitle.text("Messages");

    messageBox.find('#close').click(function () {
        messageBox.css('visibility', 'hidden');
    });

    // Debugging
    //addToMessages({ type: 'iBeacon', title: 'iBeacon test', minor: 40, major: 50 });
    //addToMessages({ type: 'QRCode', title: 'QRCode title', data: 'QRCode data' });
    //showHideMessages();
});

// Examples for poi:
// poi = {type: "QRCode", title: "POI title", data: "Data included in QRCode"}
// or
// poi = {type: "iBeacon", title: "POI title", minor: minor, major: major, 
// 
// post: The given poi is appended as a link to the messages list
function addToMessages(poi) {
    // What jsFunction will be fired when the link is clicked
    var jsFunction = "";
    if (poi.type === "iBeacon")
        jsFunction = "showIBeacon(" + poi.minor + "," + poi.major + ");";
    if (poi.type === "QRCode")
        jsFunction = "showQRCode('" + poi.title + "','" + poi.data + "');";

    // What box we are appending to
    var appendBox = (poi.type === "iBeacon") ? boxIBeacons : boxQRCodes;

    // If there's no items in the appendBox yet, clear the hardcoded string that's sitting there
    if (appendBox.text().indexOf("<li>") === -1) appendBox.empty();

    var appendix = '<li>';
    // Add what happens when this link is clicked
    appendix += '<a onclick="' + jsFunction;
    // also, when clicked, close the messageBox
    appendix += 'messageBox.css(\'visibility\', \'hidden\');';
    // Prevent link's default behaviour
    appendix += '" href="javascript:void(0);">';
    // Link's title
    appendix += poi.title + '</a>';
    appendix += '</li>';

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