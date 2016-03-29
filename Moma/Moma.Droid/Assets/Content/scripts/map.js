//Marker Icons
var MapObj = new Map();
var ListPOI = [];
var ListPOT = [];
var floorDiff = 1;
var baseMaps = {};
var map;

var markerIconPOIBlue = MapObj.createMarker('images/marker-icon-blue.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIGreen = MapObj.createMarker('images/marker-icon-green.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIRed = MapObj.createMarker('images/marker-icon-red.png', 64, 64, 30, 64, 1, 1);
var markerIconNode = MapObj.createMarker('images/none-marker-icon.png');
var mapMinZoom = 2;
var mapMaxZoom = 5;
var floors = [];

function init() {

    L.CRS.CustomZoom = L.extend({}, L.CRS.Simple, {
        scale: function (zoom) {
            return 256 * Math.pow(2, zoom);
        }
    });
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
    
    //map.removeLayer(floor1LayerGroup);
    //control.removeLayer(floor1Array);
   //L.rectangle(mapBounds, { color: "#ff7800", weight: 1 }).addTo(map);

    // zoom the map to the polyline
    //map.fitBounds(polyline.getBounds());
 
}