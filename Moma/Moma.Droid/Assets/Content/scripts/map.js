﻿//Marker Icons
var MapObj = new Map();
var ListPOI = [];
var ListPOT = [];
var baseMaps;
var map;

var markerIconPOIBlue = MapObj.createMarker('images/marker-icon-blue.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIGreen = MapObj.createMarker('images/marker-icon-green.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIRed = MapObj.createMarker('images/marker-icon-red.png', 64, 64, 30, 64, 1, 1);
var markerIconNode = MapObj.createMarker('images/none-marker-icon.png');
var mapMinZoom = 1;
var mapMaxZoom = 5;
var floors = [new Floor(1), new Floor(2), new Floor(3), new Floor(4), new Floor(5)];

function init() {
//create map
    map = L.map('map', {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom,
        crs: L.CRS.Simple
    }).setView([0, 0], mapMinZoom);

    floors = MapObj.parsePOI(floors);
    floors = MapObj.parsePOT(floors);
    floors = MapObj.createFloorTileLayers(floors, mapMinZoom, mapMaxZoom);
    floors = MapObj.groupLayers(floors);

    //map bounds
    var mapBounds = new L.LatLngBounds(
        map.unproject([0, 770], 2),
        map.unproject([900, 0], 2));
    //add bounds to map
    map.fitBounds(mapBounds, { reset: true });
    //map.setMaxBounds(map.getBounds());

    baseMaps = {
        "1": floors[0].groupLayer.addTo(map),
        "2": floors[1].groupLayer,
        "3": floors[2].groupLayer,
        "4": floors[3].groupLayer,
        "5": floors[4].groupLayer
    };
    var overlayMaps = {};

    //Add controls (radio buttons) to map in order to switch between floors
    var control = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map).setPosition('bottomright');
    map.invalidateSize();
    
    //map.removeLayer(floor1LayerGroup);
    //control.removeLayer(floor1Array);
    //L.rectangle(mapBounds, { color: "#ff7800", weight: 1 }).addTo(map);

    // zoom the map to the polyline
    //map.fitBounds(polyline.getBounds());
 
}