//Marker Icons
var MapObj = new Map();
var StorylineMapObj = new StorylineMap();
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
var storyline;
var storylineSelectedID;
var lastVisitedNodeID = localStorage.getItem("lastVisitedNodeID");
var navigationPath = new Navigation([], false);

function displayStoryline() {
    //Test - next POI button
    $("#nextBtn").hide();
    if (storylineSelectedID == null) {
        storylineSelectedID= "S1";
    }
    
    $('#currentStoryline').text("Current storyline: " + localStorage.getItem("currentStoryline"));
    $('#previewStoryline').text("Previewing storyline: " + localStorage.getItem("currentStoryline"));
    storylineSelectedID = localStorage.getItem("currentStoryline");

    floors = MapObj.parsePOI(floors);
    floors = MapObj.parsePOT(floors);
    floors = MapObj.createFloorTileLayers(floors, mapMinZoom, mapMaxZoom);
    MapObj.parseEdges();
    storyline = StorylineMapObj.parseStoryline(storylineSelectedID);
    storyline = StorylineMapObj.parseNodePath(storyline);

    //browser testing (default storyline)

    if (lastVisitedNodeID != null && lastVisitedNodeID != storyline.nodePath[0]) {
        //From list of POI & POT & edges, find shortest path
        //Get all nodes(markers) from shortest path and add them to floor object
        //create polyline, groupLayers adn add that to map
        //display title: get to the starting point
        //once first beacon is scanned, clear markers and call functions below to create the new storyline
        var dijkstras = new Dijkstra(ListPOI, ListPOT);
        //start = last visited node, finish = storyline start node 
        start = lastVisitedNodeID;
        finish = storyline.nodePath[0];
        var shortestPathID = dijkstras.shortestPath(start, finish);
        navigationPath = new Navigation(shortestPathID, true);
        navigationPath = StorylineMapObj.parseNodePath(navigationPath);
        floors = StorylineMapObj.createPolyline(floors, navigationPath);
        floors = MapObj.groupLayers(floors);
        floors = StorylineMapObj.addPolylines(floors);
        $('#currentStoryline').text("Navigate to the start");
    } else {
        floors = StorylineMapObj.createPolyline(floors, storyline);
        floors = MapObj.groupLayers(floors);
        floors = StorylineMapObj.addPolylines(floors);
    }

    //floor radio buttons
    var baseMaps = {
        "1": floors[0].groupLayer,
        "2": floors[1].groupLayer,
        "3": floors[2].groupLayer,
        "4": floors[3].groupLayer,
        "5": floors[4].groupLayer
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
        layers: floors[0].groupLayer
    }).setView([0, 0], mapMaxZoom);
    //map bounds
    var mapBounds = new L.LatLngBounds(
        map.unproject([0, 6144], mapMaxZoom),
        map.unproject([3072, 0], mapMaxZoom));

    //add bounds to map
    map.fitBounds(mapBounds);
    //Add controls (radio buttons) to map in order to switch between floors
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map).setPosition('bottomright');

    if (localStorage.getItem("startIsSelected") == "true") {
        localStorage.removeItem("startIsSelected");
        startStoryline();
    }
}

function endPreview() {
    localStorage.removeItem("currentStoryline");
    window.location.replace("storylines.html");
}

function startStoryline() {
    $("#starBtn").hide();
    $("#backBtn").hide();
    $("#previewStoryline").hide();
    $("#nextBtn").show();
    focusOnStart();
}

function focusOnStart() {
    if (navigationPath.isNotAtStart) {
        firstNodeID = navigationPath.nodePath[0];
        firstNode = navigationPath.nodes[firstNodeID];
    } else {
        firstNodeID = storyline.nodePath[0];
        firstNode = storyline.nodes[firstNodeID];
    }
    focusOnNode(firstNode);
}


//***TODO***
//When beacon in proximity function is fired, should call this method
//Check whether beacon uuid == next Node.iBeacon.uuid
//if true -> fire popup
function currentPOI(storyline) {

    var node;
    for (i = 0; i < storyline.nodePath.length; i++) {
        //if isPOI
        node = storyline.nodes[storyline.nodePath[i]];
        if (storyline.nodePath[i].charAt(0) == "0" && localStorage.getItem("lastVisitedNodeID") != storyline.nodePath[i]) {
            focusOnNode(node);
            localStorage.setItem("lastVisitedNodeID", storyline.nodePath[i]);
            storyline.nodePath.splice(0, i);
            break;
        } else {
            var marker = floors[node.floorID - 1].markersById[node.id];
            floors[node.floorID - 1].groupLayer.removeLayer(marker);
            map.removeLayer(marker);
            //remove marker from floor.groupLayer too
        }
    }
    floors = StorylineMapObj.createPolyline(floors, storyline);
    map.removeLayer(floors[node.floorID-1].polyline);

    for (i = 0; i < floors.length; i++) {
        floors[i].groupLayer.removeLayer(floors[i].polyline);
        //floors[i].groupLayers();
        floors[i].addPolylineLayer();
    }
    map.addLayer(floors[node.floorID - 1].polyline);
}

function focusOnNode(node) {
        var floors = $('input[name=leaflet-base-layers]:radio');
        jQuery.each(floors, function (index, radio) {
            if ($(radio).next()[0].innerHTML.trim() == node.floorID+"") {
                if (radio.checked) {
                    map.setView(new L.LatLng(node.y, node.x), 3, { animate: true });
                } else {
                    $(radio).prop("checked", true).trigger("click");
                    map.panTo(new L.LatLng(node.y, node.x));
                    map.setZoom(3);
                }
                //openMarkerPopup(markerId);
                return;
            }
        });
}

//testing
function simulateBeacon() {
    if (navigationPath.isNotAtStart) {
        currentPOI(navigationPath);
        if (localStorage.getItem("lastVisitedNodeID") == storyline.nodePath[0]) {
            navigationPath.isNotAtStart = false;
            localStorage.removeItem("lastVisitedNodeID");
            /*
            var node = navigationPath.nodes[navigationPath.nodePath[navigationPath.nodePath.length - 1]];
            var marker = floors[node.floorID - 1].markersById[node.id];
            floors[node.floorID - 1].groupLayer.removeLayer(marker);
            map.removeLayer(marker);
            map.removeLayer(floors[node.floorID - 1].polyline);
            for (i = 0; i < floors.length; i++) {
                floors[i].groupLayer.removeLayer(floors[i].polyline);
                floors[i].markers = [];
                floors[i].polylineLatLng = [];
                floors[i].polyline = null;
            }*/
            
            //Readd all markers

            floors = StorylineMapObj.createPolyline(floors, storyline);
            
            for (i = 0; i < floors.length; i++) {
                for (j = 0; j < floors[i].markers.length; j++) {
                    floors[i].groupLayer.addLayer(floors[i].markers[j]);
                }
            }
            floors = StorylineMapObj.addPolylines(floors);
            focusOnStart();
        }
    } else {
        iBeaconDiscovered(9377, 54177);
        currentPOI(storyline);
    }
}
