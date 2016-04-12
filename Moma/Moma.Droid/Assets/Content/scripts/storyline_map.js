//Marker Icons
var MapObj = new Map();
var StorylineMapObj = new StorylineMap();
var ListPOI = [];
var ListPOT = [];
var floorDiff = 1;
var baseMaps = {};
var map;

var markerIconPOIBlue = MapObj.createMarker('images/marker-icon-blue.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIGreen = MapObj.createMarker('images/marker-icon-green.png', 64, 64, 30, 64, 1, 1);
var markerIconPOIRed = MapObj.createMarker('images/marker-icon-red.png', 64, 64, 30, 64, 1, 1);
var markerIconNode = MapObj.createMarker('images/none-marker-icon.png');
var mapMinZoom = 1;
var mapMaxZoom = 5;
var floors = [];
var storyline;
var storylineSelectedID;
var lastVisitedNodeID = localStorage.getItem("lastVisitedNodeID");
var navigationPath = new Navigation([], false);
var startNode;

function displayStoryline() {
    //Test - next POI button
    $("#nextBtn").hide();
    $("#scanBtn").hide();
    $("#endBtn").hide();
    $("#scanText").html(tools.getLocalization(translation, ['map', 'scan']));
    
    $('#currentStoryline').text("Current storyline: " + localStorage.getItem("currentStoryline"));
    $('#previewStoryline').text("Previewing storyline: " + localStorage.getItem("currentStoryline"));
    if (localStorage.getItem("startIsSelected") == null)
        $('#currentStoryline').hide();
    else
        $('#previewStoryline').hide();
    storylineSelectedID = localStorage.getItem("currentStoryline");
    //browser testing (default storyline)
    if (storylineSelectedID == null) {
        storylineSelectedID= "0";
    }
    floors = MapObj.parseFloors();
    floors = MapObj.parsePOI(floors);
    floors = MapObj.parsePOT(floors);
    floors = MapObj.createFloorTileLayers(floors, mapMinZoom, mapMaxZoom);
    MapObj.parseEdges();
    storyline = StorylineMapObj.parseStoryline(storylineSelectedID);
    storyline = StorylineMapObj.parseNodePath(storyline);


    if (lastVisitedNodeID != null && lastVisitedNodeID != storyline.nodePath[0]+"") {
        var dijkstras = new Dijkstra(ListPOI, ListPOT);
        start = lastVisitedNodeID;
        finish = storyline.nodePath[0]+"";
        var shortestPathID = dijkstras.shortestPath(start, finish);
        navigationPath = new Navigation(shortestPathID, true);
        navigationPath = StorylineMapObj.parseNodePath(navigationPath);
        floors = StorylineMapObj.createPolyline(floors, navigationPath);
        floors = MapObj.groupLayers(floors);
        floors = StorylineMapObj.addPolylines(floors);

        startNode = ListPOI[navigationPath.nodePath[0]+""];
        //$('#currentStoryline').text("Navigate to the start");
    } else {
        floors = StorylineMapObj.createPolyline(floors, storyline);
        floors = MapObj.groupLayers(floors);
        floors = StorylineMapObj.addPolylines(floors);
        startNode = ListPOI[storyline.nodePath[0]+""];
    }

    //floor radio buttons
    for (i = 0; i < floors.length; i++) {
        var property = (i + floorDiff)+"";
        if (i == 0) {
            baseMaps[property] = floors[i].groupLayer;
        } else {
            baseMaps[property] = floors[i].groupLayer;
        }
    }
    //floor overlay radio buttons
    var overlayMaps = {
        //"Markers": floor1Overlay
    };

    //create map
    map = L.map('map', {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom,
        crs: L.CRS.Simple    });
    map.on("load", function () {
            map.addLayer(floors[parseInt(startNode.floorID) - floorDiff].groupLayer);

            if (localStorage.getItem("startIsSelected") == "true") {
            startStoryline();
        }
        
    });
    map.setView([0, 0], mapMaxZoom);
    //map bounds
    var mapBounds = new L.LatLngBounds(
        map.unproject([0, 6144], mapMaxZoom),
        map.unproject([3072, 0], mapMaxZoom));

    //add bounds to map
    map.fitBounds(mapBounds);
    //Add controls (radio buttons) to map in order to switch between floors
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map).setPosition('bottomright');
}

function endPreview() {
    localStorage.removeItem("currentStoryline");
    window.location.replace("storylines.html");
}

function endStoryline() {
    localStorage.removeItem("currentStoryline");
    localStorage.removeItem("startIsSelected");
    window.location.replace("storylines.html");
}

function startStoryline() {
    localStorage.setItem("startIsSelected", "true");
    $("#starBtn").hide();
    $("#backBtn").hide();
    $("#nextBtn").show();
    $("#scanBtn").show();
    $("#endBtn").show();

    focusOnStart();

    jsBridge.startScanningForIBeacons();
}

function focusOnStart() {
    if (navigationPath.isNotAtStart) {
        firstNodeID = navigationPath.nodePath[0]+"";
        firstNode = navigationPath.nodes[firstNodeID];
    } else {
        firstNodeID = storyline.nodePath[0]+"";
        firstNode = storyline.nodes[firstNodeID];
    }
    focusOnNode(firstNode, 3);
}


//***TODO***
//When beacon in proximity function is fired, should call this method
//Check whether beacon uuid == next Node.iBeacon.uuid
//if true -> fire popup
function currentPOI(minor, major) {

    // Check if the given minor,major match the first poi in the storyline
    if (lastVisitedNodeID === null) {
        if ((""+storyline.nodes[0].iBeacon.minor) === minor && (""+storyline.nodes[0].iBeacon.major) === major) {
            nextPOI();
            jsBridge.confirmIBeacon(minor, major);
            iBeaconDiscovered(minor, major);
        }
    } else { // Check if the given minor,major match the next poi in the storyline
        var nextNodeID = parseInt(lastVisitedNodeID) + 1;
        if (nextNodeID < storyline.nodes.length) {
            var nextBeacon = storyline.nodes[nextNodeID].iBeacon;
            if (nextBeacon.minor === minor && nextBeacon.major === major) {
                nextPOI();
                jsBridge.confirmIBeacon(minor, major);
                iBeaconDiscovered(minor, major);
            }
        }   
    }
}

function nextPOI() {
    var node;
    var floorIDInt;

    for (i = 0; i < storyline.nodePath.length; i++) {
        //if isPOI
        node = storyline.nodes[storyline.nodePath[i] + ""];
        floorIDInt = parseInt(node.floorID);
        if (ListPOI[storyline.nodePath[i] + ""] != null && localStorage.getItem("lastVisitedNodeID") != storyline.nodePath[i] + "") {
            focusOnNode(node, 3);
            localStorage.setItem("lastVisitedNodeID", storyline.nodePath[i] + "");
            lastVisitedNodeID = storyline.nodePath[i];
            storyline.nodePath.splice(0, i);
            break;
        } else {

            var marker = floors[floorIDInt - floorDiff].markersById[node.id + ""];
            floors[floorIDInt - floorDiff].groupLayer.removeLayer(marker);
            map.removeLayer(marker);
            //remove marker from floor.groupLayer too
        }
    }
    floors = StorylineMapObj.createPolyline(floors, storyline);
    map.removeLayer(floors[floorIDInt - floorDiff].polyline);

    for (i = 0; i < floors.length; i++) {
        floors[i].groupLayer.removeLayer(floors[i].polyline);
        //floors[i].groupLayers();
        floors[i].addPolylineLayer();
    }
    map.addLayer(floors[floorIDInt - floorDiff].polyline);
}

function focusOnNode(node, zoom) {
        var floors = $('input[name=leaflet-base-layers]:radio');
        jQuery.each(floors, function (index, radio) {
            if ($(radio).next()[0].innerHTML.trim() == node.floorID+"") {
                if (radio.checked) {
                    map.setView(new L.LatLng(node.y, node.x), zoom, { animate: true });
                } else {
                    $(radio).prop("checked", true).trigger("click");
                    map.panTo(new L.LatLng(node.y, node.x));
                    map.setZoom(zoom);
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
        if (localStorage.getItem("lastVisitedNodeID") == storyline.nodePath[0]+"") {
            navigationPath.isNotAtStart = false;
            localStorage.removeItem("lastVisitedNodeID");
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
        currentPOI(storyline);
        //iBeaconDiscovered(9377, 54177);
    }
}


var ids = [{ minor: "56840", major: "59520" }, { minor: "7229", major: "11163" }, { minor: "47495", major: "32561" }];
var nextidsIndex = 0;
function advanceStoryLine() {
    if (nextidsIndex == ids.length)
        goBack();
    else {
        currentPOI(ids[nextidsIndex].minor, ids[nextidsIndex].major);
        nextidsIndex++;
    }
}

function goBack() {
    storyline = navigationPath;
    nextPOI(); // Start navigation back
    //if (localStorage.getItem("lastVisitedNodeID") == storyline.nodePath[0] + "") {
    navigationPath.isNotAtStart = false;
    localStorage.removeItem("lastVisitedNodeID");
    //Readd all markers
    floors = StorylineMapObj.createPolyline(floors, storyline);

    for (i = 0; i < floors.length; i++) {
        for (j = 0; j < floors[i].markers.length; j++) {
            floors[i].groupLayer.addLayer(floors[i].markers[j]);
        }
    }
    floors = StorylineMapObj.addPolylines(floors);
    focusOnStart();
    //}
}