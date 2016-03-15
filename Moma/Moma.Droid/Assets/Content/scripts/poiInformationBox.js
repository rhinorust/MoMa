var poiIB;
var data; // JSON.txt data will be stored here by C#
// Temporary, to be fixed later
var audioFileName  = "";

$('document').ready(function () {
    poiIB = $('#POI_InformationBox');

    $('#close').click(function () {
        poiIB.css('visibility', 'hidden');
        stopAudioAndVideo()
    });

    // Debugging: For opening the POI information box without an iBeacon
	//iBeaconDiscovered(9377, 54177);
});

function iBeaconDiscovered(major, minor) {
    var title = poiIB.find('#title h1');
    var content = poiIB.find('#content');

    var boxTitle = "";
    var boxContent = "";

    var pois = DATA.node[0].poi;
    // Find the POI with the given major and minor and
    // populate the POI information box with their content
    // Finally, display the POI information box.
    for (var i = 0; i < pois.length; i++) {
        var poi = pois[i];
        var iBeacon = poi.iBeacon;
        if (iBeacon.major === major && iBeacon.minor === minor) {
            var poiDescription = poi.description[0].description;
            var poiTitle = poi.title[0].title;
            // Add the media elements to the POI information box
            var images = poi.media.image;
            var videos = poi.media.video;
            var audio  = poi.media.audio;
            // If there are images
            if (images.length > 0) {
                for (var j = 0; j < images.length; j++)
                    boxContent += imagef(images[j].path);
            }   
            // If there are videos
            if (videos.length > 0) {
                // Only add one for now
                boxContent += videof(videos[0].path);
            }
            // If there is audio
            if (audio.length > 0) {
                // Only add one for now
                audioFileName = audio[0].path;
                boxContent += audiof(audio[0].path);
            }

            boxContent += textf(poiDescription);
            boxTitle = poiTitle;

            title.text(boxTitle);
            content.empty();
            content.append(boxContent);

            poiIB.css('visibility', 'visible');

            break;
        }
    }
}

function videof(fileName) {
    return '<video controls="controls" src="'+fileName+'"></video>';
}

function imagef(fileName) {
    return '<img src="'+fileName+'">';
}

function audiof(fileName) {
    return '<img src="images/playAudio.png" onClick="jsBridge.playOrStopAudioFile(\''+fileName+'\')">';
}

function textf(fileName) {
    return '<p>'+fileName+'</p>';
}

function stopAudioAndVideo() {
    var vid = $('video');
    if (vid) {
        vid.get(0).pause();
    }
    jsBridge.stopAudioFile(audioFileName);
}