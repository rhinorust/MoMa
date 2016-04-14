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
var mapMinZoom = 2;
var mapMaxZoom = 5;
var floors = [];
var storyline;
var storylineSelectedID;
var lastVisitedNodeID = localStorage.getItem("lastVisitedNodeID");
var repeatNode = null;
var repeatNodeDik = null;
var navigationPath = new Navigation([], false);
var startNode;

function displayStoryline() {
    //Test - next POI button
    $("#nextBtn").hide();
    $("#scanBtn").hide();
    $("#endBtn").hide();
    //#testing
    $("#scanText").html(tools.getLocalization(translation, ['map', 'scan']));
    $("#endBtn").html(tools.getLocalization(translation, ['map', 'end']));
    $("#starBtn").html(tools.getLocalization(translation, ['map', 'start']));

    $("#yesButton").html(tools.getLocalization(translation, ['map', 'Yes']));
    $("#noButton").html(tools.getLocalization(translation, ['map', 'No']));

    
    $('#currentStoryline').text(tools.getLocalization(translation, ['storyline', 'CurrentStoryline']) + localStorage.getItem("currentStoryline"));
    $('#previewStoryline').text(tools.getLocalization(translation, ['storyline', 'PreviewStoryline']) + localStorage.getItem("previewStoryline"));
    if (localStorage.getItem("previewStoryline") != null) {
        $('#currentStoryline').hide();
        storylineSelectedID = localStorage.getItem("previewStoryline");
    }
    else {
        $('#previewStoryline').hide();
        storylineSelectedID = localStorage.getItem("currentStoryline");
    }
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

    floors = StorylineMapObj.createPolyline(floors, storyline);
    floors = MapObj.groupLayers(floors);
    floors = StorylineMapObj.addPolylines(floors);
    startNode = ListPOI[storyline.nodePath[0] + ""];


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

        if (localStorage.getItem("previewStoryline") == null) {
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
    localStorage.removeItem("previewStoryline");
    window.location.replace("storylines.html");
}

function endStoryline() {
    localStorage.removeItem("currentStoryline");
    window.location.replace("storylines.html");
}

function startStoryline() {
    $("#starBtn").hide();
    $("#backBtn").hide();
    $("#nextBtn").show();
    $("#scanBtn").show();
    $("#endBtn").show();
    if (localStorage.getItem("previewStoryline") != null) {
        //#testing
        jsBridge.confirmPreviewPopup(localStorage.getItem("previewStoryline"));
    }
    else {
        $('#currentStoryline').show();
        $('#previewStoryline').hide();


        if ((lastVisitedNodeID != null && lastVisitedNodeID != storyline.nodePath[0] + "")) {
            //popup asking "Would you like to be directed to the start of the storyline?"
            showShortMessageBox("Alert",
                    tools.getLocalization(translation, ['storyline', 'reDirectBegin']),
                function () {
                    pathToStart();
                    //clear storyline path
                    /*
                    for (j = 0; j < floors.length; j++) {
                        floors[j].groupLayer.removeLayer(floors[j].polyline);
                        map.removeLayer(floors[j].polyline);
                        for (var i = 0; i < floors[j].markers.length; i++) {
                            floors[j].groupLayer.removeLayer(floors[j].markers[i]);
                        }
                    }*/
                    for (i in map._layers) {
                        if (map._layers[i]._path != undefined) {
                            try {
                                map.removeLayer(map._layers[i]);
                            }
                            catch (e) {
                                console.log("problem with " + e + map._layers[i]);
                            }
                        }
                    }

                    floors = StorylineMapObj.createPolyline(floors, navigationPath);
                    for (j = 0; j < floors.length; j++) {
                        floors[j].groupLayer.addLayer(floors[j].polyline);
                        
                        for (var i = 0; i < floors[j].markers.length; i++) {
                            floors[j].groupLayer.addLayer(floors[j].markers[i]);
                        }
                    }
                    var tempfloor = ListPOI[lastVisitedNodeID].floorID;
                    map.addLayer(floors[tempfloor-floorDiff].polyline);
                    floors = StorylineMapObj.addPolylines(floors);

                    focusOnStart();
                },
                function () { focusOnStart() });
        } else {
            focusOnStart();
        }
    }
}

function pathToStart() {
    var dijkstras = new Dijkstra(ListPOI, ListPOT);
    start = localStorage.getItem('lastVisitedNodeID');
    console.log('start: '+start);
    finish = storyline.nodePath[0] + "";
    console.log('finish: ' + finish);
    var shortestPathID = dijkstras.shortestPath(start, finish);
    navigationPath = new Navigation(shortestPathID, true);
    navigationPath = StorylineMapObj.parseNodePath(navigationPath);
    floors = StorylineMapObj.createPolyline(floors, navigationPath);
    floors = MapObj.groupLayers(floors);
    floors = StorylineMapObj.addPolylines(floors);
    startNode = ListPOI[navigationPath.nodePath[0] + ""];
    console.log(navigationPath.nodePath+'$$$');
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
    //#testing
    jsBridge.startScanningForIBeacons();
}


//***TODO***
//When beacon in proximity function is fired, should call this method
//Check whether beacon uuid == next Node.iBeacon.uuid
//if true -> fire popup
function currentPOI(minor, major) {
    console.log("currentPOI minor: "+minor+", major: "+major+"**********************************************************************************");
    var nextPOIInPath = null;
    //if navigation to start path
    if (navigationPath.isNotAtStart) {
        console.log("dijkstra");
        for (i = 0; i < navigationPath.nodePath.length; i++) {
            if (ListPOI[navigationPath.nodePath[i] + ""] != null) {
                console.log("found poi");
                nextPOIInPath = ListPOI[navigationPath.nodePath[i]];
                break;
            }
        }
        var lastNode = ListPOI[storyline.nodePath[0]];
        var isDone = false;
        if (lastNode.iBeacon.minor == minor && lastNode.iBeacon.major == major && lastVisitedNodeID != repeatNodeDik) {
            isDone = true;
        }
        lastVisitedNodeID = nextPOIInPath.id;

        if ((nextPOIInPath != null && lastVisitedNodeID != repeatNodeDik && nextPOIInPath.iBeacon.minor == minor && nextPOIInPath.iBeacon.major == major)
            || (isDone)) {
            console.log("call update poi");
            console.log('array: '+navigationPath.nodePath);
            repeatNodeDik = lastVisitedNodeID;
            
            updatePOI(navigationPath);
            repeatNode = null;
            if (localStorage.getItem("lastVisitedNodeID") == storyline.nodePath[0] + "" || isDone) {
                navigationPath.isNotAtStart = false;
                repeatNodeDik = null;
                localStorage.removeItem("lastVisitedNodeID");
                //Readd all markers
                for (i in map._layers) {
                    if (map._layers[i]._path != undefined) {
                        try {
                            map.removeLayer(map._layers[i]);
                        }
                        catch (e) {
                            console.log("problem with " + e + map._layers[i]);
                        }
                    }
                }
                floors = StorylineMapObj.createPolyline(floors, storyline);
                
                for (i = 0; i < floors.length; i++) {
                    for (j = 0; j < floors[i].markers.length; j++) {
                        floors[i].groupLayer.addLayer(floors[i].markers[j]);
                    }
                }
                var tempfloor = ListPOI[storyline.nodePath[0]+""].floorID;
                map.addLayer(floors[tempfloor - floorDiff].polyline);
                floors = StorylineMapObj.addPolylines(floors);
                focusOnStart();
            }
        }
    } else {
        console.log("storyline");
        for (i = 0; i < storyline.nodePath.length; i++) {
            if (ListPOI[storyline.nodePath[i] + ""] != null) {
                console.log("found poi");
                nextPOIInPath = ListPOI[storyline.nodePath[i]];
                break;
            }
        }
        lastVisitedNodeID = nextPOIInPath.id;

        if (nextPOIInPath != null && lastVisitedNodeID != repeatNode && nextPOIInPath.iBeacon.minor == minor && nextPOIInPath.iBeacon.major == major) {
            console.log("call popup");
            repeatNode = lastVisitedNodeID;
            updatePOI(storyline);
            iBeaconDiscovered(minor, major);
            repeatNodeDik = null;
        }
        console.log("done ibeacon");
    }
    

    

    // Check if the given minor,major match the first poi in the storyline
    /*if (lastVisitedNodeID === null) {
        if ((""+storyline.nodes[0].iBeacon.minor) === minor && (""+storyline.nodes[0].iBeacon.major) === major) {
            nextPOI();
            //jsBridge.confirmIBeacon(minor, major);
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
    }*/
}

function updatePOI(storyline) {
    var node;
    var floorIDInt;
    for (i = 0; i < storyline.nodePath.length; i++) {

        node = storyline.nodes[storyline.nodePath[i] + ""];
        floorIDInt = parseInt(node.floorID);

        if (ListPOI[storyline.nodePath[i] + ""] != null && lastVisitedNodeID == storyline.nodePath[i] + "") {
            console.log(storyline.nodePath[i]);
            focusOnNode(node, 3);
            localStorage.setItem("lastVisitedNodeID", storyline.nodePath[i] + "");
            storyline.nodePath.splice(0, i);
            floors = StorylineMapObj.createPolyline(floors, storyline);
            for (j in map._layers) {
                if (map._layers[j]._path != undefined) {
                    try {
                        map.removeLayer(map._layers[j]);
                    }
                    catch (e) {
                        console.log("problem with " + e + map._layers[j]);
                    }
                }
            }
            //map.removeLayer(floors[floorIDInt - floorDiff].polyline);

            for (j = 0; j < floors.length; j++) {
                //floors[j].groupLayer.removeLayer(floors[j].polyline);
                //floors[i].groupLayers();
                floors[j].addPolylineLayer();
            }
            map.addLayer(floors[floorIDInt - floorDiff].polyline);
            storyline.nodePath.splice(0, 1);
            break;
        } else {
            var marker = floors[floorIDInt - floorDiff].markersById[node.id + ""];
            floors[floorIDInt - floorDiff].groupLayer.removeLayer(marker);
            map.removeLayer(marker);
        }
    }
 
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
        updatePOI(navigationPath);
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
        updatePOI(storyline);
        //iBeaconDiscovered(9377, 54177);
    }
}


/*var ids = [{ minor: "56840", major: "59520" }, { minor: "7229", major: "11163" }, { minor: "47495", major: "32561" }];
var nextidsIndex = 0;
function advanceStoryLine() {
    if (nextidsIndex == ids.length)
        goBack();
    else {
        currentPOI(ids[nextidsIndex].minor, ids[nextidsIndex].major);
        nextidsIndex++;
    }
}*/

/*function goBack() {
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
}*/
