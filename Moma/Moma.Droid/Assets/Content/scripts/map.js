//Marker Icons
var MapObj = new Map();
var ListPOI = [];
var ListPOT = [];
var markerIconPOIBlue = MapObj.createMarker('images/marker-icon-blue.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIGreen = MapObj.createMarker('images/marker-icon-green.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIRed = MapObj.createMarker('images/marker-icon-red.png', 64, 64, 30, 64, 1, 1);
var markerIconNode = MapObj.createMarker('images/none-marker-icon.png');
var mapMinZoom = 1;
var mapMaxZoom = 5;


var floors = [new Floor(1), new Floor(2), new Floor(3), new Floor(4), new Floor(5)];
floors = MapObj.parsePOI(floors);
floors = MapObj.parsePOT(floors);
floors = MapObj.createFloorTileLayers(floors, mapMinZoom, mapMaxZoom);



//================================================================================================================
var floor1Array = [], floor2Array = [], floor3Array = [], floor4Array = [], floor5Array = [];

//Floor 2 marker & node coordinates
var floor2Coordinates = [{ coord: [-42, 108], isPOI: 'true' }, { coord: [-58, 108], isPOI: 'false' }, { coord: [-62, 113], isPOI: 'false' }, { coord: [-71, 114], isPOI: 'true' }, { coord: [-71, 166], isPOI: 'true' },
{ coord: [-30, 168], isPOI: 'true' }, { coord: [-24, 113], isPOI: 'false' }, { coord: [-17, 113], isPOI: 'true' }, { coord: [-17, 102], isPOI: 'false' }, { coord: [-20, 101], isPOI: 'false' },
{ coord: [-18, 81], isPOI: 'false' }, { coord: [-20, 80], isPOI: 'true' }, { coord: [-17, 62], isPOI: 'false' }, { coord: [-15, 34], isPOI: 'false' }, { coord: [-8, 34], isPOI: 'false' }, { coord: [-7, 25], isPOI: 'true' }];


//Floor 2 marker icons & popups
var count = 0;

for (var i = 0; i < floor2Coordinates.length; i++) {
    var markerIcon;
    if (floor2Coordinates[i].isPOI == 'true') {
        //POI marker icon
        markerIcon = markerIconPOIBlue;
        count++;
    } else {
        //invisible marker for nodes
        markerIcon = markerIconNode;
    }
    floor2Array.push(L.marker(floor2Coordinates[i].coord, { icon: markerIcon, keepInView: true }).bindPopup('Artifact ' + count + '<br> <button>Learn more</button>'));
}

//Global variables. Can be accessed in other js linked to html page.
var baseMaps;
var map;
function init() {

    //zoom levels
    

    //floor maps
    floor1Array.push(L.tileLayer('floor1/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom}));
    floor2Array.push(L.tileLayer('floor2/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom}));
    floor3Array.push(L.tileLayer('floor3/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom }));
    floor4Array.push(L.tileLayer('floor4/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom}));
    floor5Array.push(L.tileLayer('floor5/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom}));

    //Floor layer groups
    var floor1LayerGroup = L.layerGroup(floor1Array),
        floor2LayerGroup = L.layerGroup(floor2Array),
        floor3LayerGroup = L.layerGroup(floor3Array),
        floor4LayerGroup = L.layerGroup(floor4Array),
        floor5LayerGroup = L.layerGroup(floor5Array);

    //floor radio buttons
    baseMaps = {
        "1": floor1LayerGroup,
        "2": floor2LayerGroup,
        "3": floor3LayerGroup,
        "4": floor4LayerGroup,
        "5": floor5LayerGroup
    };
    //floor overlay radio buttons
    var overlayMaps = {
        //"Markers": floor1Overlay
    };

    //create map
    map = L.map('map', {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom,
        crs: L.CRS.Simple,
        layers: floor1LayerGroup
    }).setView([0, 0], mapMaxZoom);
    //map bounds
    var mapBounds = new L.LatLngBounds(
        map.unproject([0, 3072], mapMaxZoom),
        map.unproject([6144, 0], mapMaxZoom));
    //add bounds to map
    map.fitBounds(mapBounds);
    
    //Add controls (radio buttons) to map in order to switch between floors
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map).setPosition('bottomright');
    map.invalidateSize();
    //L.rectangle(mapBounds, { color: "#ff7800", weight: 1 }).addTo(map);

    //STORYLINE======================================================
    //line between markers

    // zoom the map to the polyline
    //map.fitBounds(polyline.getBounds());
 
}