var poiIB;
var poiIBoxTitle;
var poiIBoxContent;

$('document').ready(function () {
    poiIB          = $('#POI_Information');
    poiIBoxTitle   = poiIB.find('#title h1');
    poiIBoxContent = poiIB.find('#content');

    var closeButton = poiIB.find('#close');
    closeButton.click(function () {
        poiIB.css('visibility', 'hidden');
    });

    // Debugging: For opening the POI information box without an iBeacon
    //iBeaconDiscovered('54177', '9377');
});

// Tries to find the iBeacon with matching minor and major
// and if it does, adds to the messages and displays the iBeacon's information
function iBeaconDiscovered(minor, major) {
    var poi = findPOIWithIBeacon(minor, major);

    if (poi !== -1) { // If it was found
        // If it's not a background audio iBeacon
        //if (poi.media.audio.length == 0) {
            var poiTitle = poi.title[0].title;
            addToMessages({ type: "iBeacon", title: poiTitle, minor: minor, major: major });
            showIBeacon(minor, major); // Show the IBeacon's information
        //}
        // If it is an audio iBeacon, let the C#'s iBeaconsDirector know and it will take
        // care of playing/looping/stopping the audio based on dynamic proximity to it's iBeacon
        //if (poi.media.audio.length != 0) {
        //    jsBridge.setIBeaconAsAudioIBeacon(minor, major, poi.media.audio[0].path);
        //}
    }
}

// returns the poi instance that holds the iBeacon that
// has the given minor and major values
function findPOIWithIBeacon(minor, major) {
    var pois = DATA.node[0].poi;
    // Find the POI with the given minor and major and
    // return the iBeacon object if found
    for (var i = 0; i < pois.length; i++) {
        var poi = pois[i];
        var iBeacon = poi.ibeacon;
        if (iBeacon.minor === minor && iBeacon.major === major) {
            return poi;
        }
    }
    return -1; // If none was found 
}

// Displays the POI information box populated with this iBeacon's information
function showIBeacon(minor, major) {
    var poi = findPOIWithIBeacon(minor, major);

    if (poi !== -1) { // If we got a hit
        var poiDescription = poi.description[0].description;
        var poiTitle = poi.title[0].title;
        // Add the media elements to the POI information box
        var images = poi.media.image;
        var videos = poi.media.video;

        var content = "";

        // If there are videos, we ask C# to show them all
        if (videos.length > 0) {
            // Interrupt and play the first video
            jsBridge.playVideo(videos[0].path, videos[0].caption, true);

            // Add the rest to the C#'s video playQueue
            for (var i = 1; i < videos.length; i++) {
                jsBridge.playVideo(videos[i].path, videos[i].caption, false);
            }
        }
        // if there are images or text we will show the poi information box
        //else {
        if (images.length > 0) {
            for (var j = 0; j < images.length; j++)
                content += imagef(images[j].path);
        }

        content += textf(poiDescription);
        var title = poiTitle;

        if (images.length > 0 || poiDescription.length() > 0) {
            poiIBoxTitle.text(title);
            poiIBoxContent.empty();
            poiIBoxContent.append(content);

            // Close the message box
            messageBox.css('visibility', 'hidden');

            poiIB.css('visibility', 'visible');
        }

        // Updating the messageIcon in the C# toolbar
        jsBridge.messageWasRead(poiTitle);

        // Remove it's new tag from the iBeacons' list if it exists
        removeNEWTagFor(poiTitle, '#iBeacons');
    }
}

function showQRCode(title, data) {
    poiIBoxTitle.text(title);
    poiIBoxContent.empty();
    poiIBoxContent.append(data);

    // Updating the messageIcon in the C# toolbar
    jsBridge.messageWasRead(title);

    // Remove it's new tag from the QRCodes' list if it exists
    removeNEWTagFor(title, '#QRCodes');

    // Close the message box
    messageBox.css('visibility', 'hidden');

    poiIB.css('visibility', 'visible');
}

// title is the title of the QRCode/iBeacon in the messages
// to remove the NEW tag from,
// container is either '#iBeacons' or '#QRCodes'
function removeNEWTagFor(title, container) {
    // Find the corresponding iBeacon in the message list
    $('#messages').find('#content '+container+' li').each(function () {
        // Removing the NEW tag next to the message it if it is there
        if ($(this).find('a').text() === title) {
            $(this).find('p').removeClass('newMessage'); // Clear the new message class
            $(this).find('p').addClass('oldMessage');
            $(this).find('p').text(''); // Clear the "NEW" message
        }
    });
}

function imagef(fileName) {
    return '<img src="'+fileName+'">';
}

function textf(fileName) {
    return '<p>'+fileName+'</p>';
}