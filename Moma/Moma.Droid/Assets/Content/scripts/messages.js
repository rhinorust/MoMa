var messageBox;

$('document').ready(function () {
    messageBox = $('#messages');

    var closeButton = messageBox.find('#close');
    closeButton.click(function () {
        messageBox.css('visibility', 'hidden');
    });

    // Debugging
    //setIBeacons([{ minor: 44, major: 66, prox: 'Near' }, { minor: 88, major: 99, prox: 'Far' }]);
    //showHideMessages();
});

function setIBeacons(arrayOfIBeacons) {
    var title = messageBox.find('#title h1');
    var iBeacons = messageBox.find('#iBeacons');
    var qrCodes = messageBox.find('#QRCodes');

    title.text("Messages");

    // Populate iBeacons
    var appendix = '<ul>';
    for (var i = 0; i < arrayOfIBeacons.length; i++) {
        appendix += '<li><p>iBeacon ' + (i + 1);
        appendix += ', minor: ' + arrayOfIBeacons[i].minor;
        appendix += ', major: ' + arrayOfIBeacons[i].major;
        appendix += ', proximity: ' + arrayOfIBeacons[i].prox + '</p></li>';
    }
    appendix += '</ul>';
    iBeacons.empty();
    iBeacons.append(appendix);

    // Populate QR Codes
    appendix = '<h2>QRCodes</h2>';
    /*for (var i = 0; i < 2; i++) {
        appendix += '<li><p>QRCode '+(i+1)+'</p></li>';
    }
    appendix += '</ul>';*/
    qrCodes.empty();
    qrCodes.append(appendix);
}

// Called by C# when user clicks the messages icon in the toolbar
// Showing or hiding the messages
function showHideMessages() {
    if (messageBox.css('visibility') === 'hidden')
        messageBox.css('visibility', 'visible');
    else
        messageBox.css('visibility', 'hidden');
}