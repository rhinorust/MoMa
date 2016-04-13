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

    // If the poi was found
    if (poi !== -1) {
        // What is the current language?
        var curLanguage = jsBridge.getLanguage();

        // Find the right language title
        var poiTitle = "";
        for (var i = 0; i < poi.title.length; i++) {
            if (poi.title.language.toLowerCase() === curLanguage)
                poiTitle = poi.title[i];
        }
        addToMessages({ type: "iBeacon", title: poiTitle, minor: minor, major: major });
        showIBeacon(minor, major); // Show the IBeacon's information
    }
}

// returns the storylinePoint poi instance corresponding
// to the given minor,major,storylineID
function findPOIWithIBeacon(minor, major) {
    var storylineID = storylineSelectedID; // Justin's variable
    if (storylineID == null) return -1;

    var pois = DATA.node.poi;
    // Find the POI with the given minor and major and
    // return the iBeacon object if found
    for (var i = 0; i < pois.length; i++) {
        var poi = pois[i];
        var iBeacon = poi.ibeacon;
        if (iBeacon.minor === minor && iBeacon.major === major) {
            // Now we have to find the right storypoint for that iBeacon
            for (var j = 0; j < poi.storyPoint.length; j++) {
                if (poi.storyPoint[j].storylineID === storylineID)
                    return poi.storyPoint[j];
            }
        }
    }
    return -1; // If none was found 
}

// Displays the POI information box populated with this
// iBeacon's storyline information
function showIBeacon(minor, major) {
    var poi = findPOIWithIBeacon(minor, major);

    // If we got a hit
    if (poi !== -1) {
        // What is the current language?
        var curLanguage = jsBridge.getLanguage();

        // Find the right language title
        var poiTitle = "";
        for (var i = 0; i < poi.title.length; i++) {
            if (poi.title.language.toLowerCase() === curLanguage)
                poiTitle = poi.title[i];
        }

        // Find the right language description
        var poiDescription = "";
        for (var i = 0; i < poi.description.length; i++) {
            if (poi.description.language.toLowerCase() === curLanguage)
                poiDescription = poi.description[i];
        }

        // The media elements
        var images = poi.media.image;
        var videos = poi.media.video;
        var audio  = poi.media.audio;

        // If there is any audio, we ask C# to play it
        if (audio.length > 0) {
            for (var i = 0; i < audio.length; i++) {
                if (audio[i].language.toLowerCase() === curLanguage) {
                    // Only play one. Doesn't make sense to play any more at the same time
                    jsBridge.playAudioFile(audio[i].path);
                    break;
                }
            }
        }

        // If there are videos, we ask C# to show them all, one after another
        if (videos.length > 0) {
            var firstVideoStarted = false;

            for (var i = 0; i < videos.length; i++) {
                if (videos[i].language.toLowerCase() === curLanguage) {
                    if (firstVideoStarted === false) {
                        jsBridge.playVideo(videos[i].path, videos[i].caption, true);
                        firstVideoStarted = true;
                    }
                    else
                        jsBridge.playVideo(videos[i].path, videos[i].caption, false);
                }
            }
        }

        if (images.length > 0 || poiDescription.length() > 0) {
            var content = "";

            // if there are images or text we will show the poi information box
            if (images.length > 0) {
                for (var j = 0; j < images.length; j++)
                    content += imagef(images[j].path);
            }

            content += poiDescription;

            poiIBoxTitle.empty()
            poiIBoxTitle.append(poiTitle);
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