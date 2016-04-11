﻿//Marker Icons
var MapObj = new Map();
var ListPOI = [];
var ListPOT = [];
var floorDiff = 1;
var baseMaps = {};
var map;
var lastVisitedNodeID = null;
var mapInitBool;

var markerIconPOIBlue = MapObj.createMarker('images/marker-icon-blue.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIGreen = MapObj.createMarker('images/marker-icon-green.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIRed = MapObj.createMarker('images/marker-icon-red.png', 64, 64, 30, 64, 1, 1);
var markerIconNode = MapObj.createMarker('images/none-marker-icon.png');
var mapMinZoom = 1;
var mapMaxZoom = 5;
var floors = [];

function init() {

    mapInitBool = true;
//create map
    map = L.map('map', {
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
    //map.setMaxBounds(map.getBounds());

    for (i = 0; i < floors.length; i++) {
        var property = (i + floorDiff)+"";
        if (i == 0) {
            baseMaps[property] = floors[i].groupLayer.addTo(map);
        } else {
            baseMaps[property] = floors[i].groupLayer;
        }
    }
    var overlayMaps = {};

    //Add controls (radio buttons) to map in order to switch between floors
    var control = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map).setPosition('bottomright');
    map.invalidateSize();

    $("#scanText").html(tools.getLocalization(translation, ['map', 'scan']));
    jsBridge.startScanningForIBeacons();
    //map.removeLayer(floor1LayerGroup);
    //control.removeLayer(floor1Array);
   //L.rectangle(mapBounds, { color: "#ff7800", weight: 1 }).addTo(map);

    // zoom the map to the polyline
    //map.fitBounds(polyline.getBounds());

 
}

function currentPOI(minor, major) {
    console.log(minor + " " + major + "*******************************************");
    poi = findPOIWithIBeacon(minor, major);
    if (poi != -1) {
        console.log("poi not valid");
        lastVisitedNodeID = poi.id;
    }

    if (lastVisitedNodeID != localStorage.getItem("lastVisitedNodeID") || mapInitBool) {
        console.log("popup call");
        localStorage.setItem("lastVisitedNodeID", lastVisitedNodeID);
        iBeaconDiscovered(minor, major);
        mapInitBool = false;
    }
}