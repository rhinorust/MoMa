//Class Diagram Objects

function POI(id, x, y, floorID, title, description, iBeacon, video, image, audio) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.floorID = floorID;
    this.title = title;
    this.description = description;
    this.iBeacon = iBeacon;
    this.video = video;
    this.image = image;
    this.audio = audio;

    this.getQRInfo = function (QRID) {
        return"string";
    };
    this.getPOIPosition = function () {
        return "string";
    };
    this.displayMorePOIInfo = function () {
        return "string";
    };
    this.getMorePOIInfo = function () {
        return "string";
    };
    this.findQRPOI = function (QRID) {
        return null;
    };
    this.getPOIInfo = function () {
        return "string";
    };
    this.displayLLPOILocation = function () {

    };
    this.getPopularPOI = function () {
        ;
    }

}

function POT(id, x, y, floorID, label) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.floorID = floorID;
    this.label = label;
}

function IBeacon(uuid, major, minor) {
    this.uuid = uuid;
    this.major = major;
    this.minor = minor;
}

function Video(videoID, path, caption) {
    this.videoID = videoID;
    this.path = path;
    this.caption = caption;

    this.showVideo = function () {
        //show video
    }
}

function Image(imageID, path, caption) {
    this.imageID = imageID;
    this.path = path;
    this.caption = caption;

    this.showImage = function () {
        //show image
    }
}

function Audio(audioID, path, caption) {
    this.audioID = audioID;
    this.path = path;
    this.caption = caption;

    this.playAudio = function () {
        //play video
    }
}

function Floor(floorID) {
    this.floorID = floorID;
    this.imagePath;
    this.imageWidth;
    this.imageHeight;
    this.POI = [];//poi + pot on this layer
    this.POT = [];
    this.markerLayer = [];
    this.tileLayer;

    this.parseFloor = function () {
        var floor = DATA.floorPlan[floorID - 1];
        this.imagePath = floor.imagePath;
        this.imageWidth = floor.imageWidth;
        this.imageHeight = floor.imageHeight;
    };
    this.parseFloor();//call function on constructor

    this.createTileLayer = function (minZoom, maxZoom) {
        this.tileLayer = L.tileLayer('floor'+floorID+'/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom });
    };
}

function Storyline(id, title, description, nodePath, thumbnailPath, walkingTimeInMinutes, floorsCovered) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.nodePath = nodePath;
    this.thumbnailPath = thumbnailPath;
    this.walkingTimeInMinutes = walkingTimeInMinutes;
    this.floorsCovered = floorsCovered
}

//Map Object
function Map() {

    this.createMarker = function (iconURL, iconWidth, iconHeight, iconAnchorWidth, iconAnchorHeight, iconAnchorX, iconAnchorY) {
        var marker = L.icon({
            iconUrl: iconURL,
            shadowUrl: '',
            iconSize: [iconWidth, iconHeight], // size of the icon
            //shadowSize: [50, 64], // size of the shadow
            iconAnchor: [iconAnchorWidth, iconAnchorHeight], // point of the icon which will correspond to marker's location
            //shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [iconAnchorX, iconAnchorY] // point from which the popup should open relative to the iconAnchor
        });
        return marker;
    };

    this.parsePOI = function (floors) {
        var arrayPOI = DATA.node[0].poi;
        for (i = 0; i < arrayPOI.length; i++) {
            var p = arrayPOI[i];
            var poi = new POI(p.id, p.x, p.y, p.floorID, p.title[0].title, p.description[0].description, p.iBeacon, p.media.video, p.media.image, p.media.audio);
            floors[p.floorID - 1].POI.push(poi);
            floors[p.floorID - 1].markerLayer.push(L.marker([poi.y,poi.x], { icon: markerIconPOIBlue }).bindPopup(poi.description));
            ListPOI.push(poi);
        }
        return floors;
    };

    this.parsePOT = function (floors) {
        var arrayPOT = DATA.node[0].pot;
        for (i = 0; i < arrayPOT.length; i++) {
            var p = arrayPOT[i];
            var pot = new POT(p.id, p.x, p.y, p.floorID, p.label.label);
            floors[p.floorID - 1].POT.push(pot);
            ListPOT.push(pot);
        }
        return floors;
    };

    this.createFloorTileLayers = function (floors, minZoom, maxZoom) {
        for (i = 0; i < floors.length; i++) {
            floors[i].createTileLayer(minZoom,maxZoom);
        }
        return floors;
    }
}
