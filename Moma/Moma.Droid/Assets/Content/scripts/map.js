//Marker Icons
var MapObj = new Map();
var ListPOI = [];
var ListPOT = [];
var floorDiff = 1;
var baseMaps = {};
var map;
var lastVisitedNodeID = null;
var lastMinor = "";
var lastMajor = "";

var markerIconPOIBlue = MapObj.createMarker("images/marker-icon-blue.png", 64, 64, 30, 64, 1, 1);
var markerIconPOIGreen = MapObj.createMarker("images/marker-icon-green.png", 64, 64, 30, 64, 1, 1);
var markerIconPOIRed = MapObj.createMarker("images/marker-icon-red.png", 64, 64, 30, 64, 1, 1);
var markerIconNode = MapObj.createMarker("images/none-marker-icon.png");
var mapMinZoom = 2;
var mapMaxZoom = 5;
var floors = [];

// For showing the content of iBeacons during free tour
var iBeaconsFoundDuringFreeTour = [];

function init() {

//create map
    map = L.map("map", {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom,
        crs: L.CRS.Simple
    }).setView([0, 0], mapMinZoom);

    floors = MapObj.parseFloors();
    floors = MapObj.parsePOI(floors);
    floors = MapObj.parsePOT(floors);
    floors = MapObj.createFloorTileLayers(floors, mapMinZoom, mapMaxZoom);
    floors = MapObj.groupLayers(floors);

    //map bounds
    var mapBounds = new L.LatLngBounds(
        map.unproject([0, 6144], map.getMaxZoom()),
        map.unproject([3072, 0], map.getMaxZoom()));
    //add bounds to map
    map.fitBounds(mapBounds, { reset: true });

    for (var i = 0; i < floors.length; i++) {
        var property = (i + floorDiff) + "";
        if (i == 0) {
            baseMaps[property] = floors[i].groupLayer.addTo(map);
        } else {
            baseMaps[property] = floors[i].groupLayer;
        }
    }
    var overlayMaps = {};

    //Add controls (radio buttons) to map in order to switch between floors
    var control = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map).setPosition("bottomright");
    map.invalidateSize();

    $("#scanText").html(tools.getLocalization(translation, ["map", "scan"]));
    jsBridge.startScanningForIBeacons();
}

function currentPOI(minor, major) {
    if (lastMinor != minor && lastMajor != major) {
        lastMinor = minor;
        lastMajor = major;

        lastVisitedNodeID = findPOIWithIBeacon(minor, major);
        if (lastVisitedNodeID != -1) {
            localStorage.setItem("lastVisitedNodeID", lastVisitedNodeID);
        }
    }

    if (iBeaconsFoundDuringFreeTour[minor + "," + major] == null) {
        iBeaconsFoundDuringFreeTour[minor + "," + major] = "shown";
        freeBeaconDiscovered(minor, major);
    }
}