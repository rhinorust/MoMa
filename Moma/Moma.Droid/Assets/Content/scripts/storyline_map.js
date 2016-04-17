//Marker Icons
var MapObj = new Map();
var StorylineMapObj = new StorylineMap();
var ListPOI = [];
var ListPOT = [];
var floorDiff = 1;
var baseMaps = {};
var map;

var markerIconPOIBlue = MapObj.createMarker("images/marker-icon-blue.png", 64, 64, 30, 64, 1, 1);
var markerIconPOIGreen = MapObj.createMarker("images/marker-icon-green.png", 64, 64, 30, 64, 1, 1);
var markerIconPOIRed = MapObj.createMarker("images/marker-icon-red.png", 64, 64, 30, 64, 1, 1);
var markerIconNode = MapObj.createMarker("images/none-marker-icon.png");
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
    $("#scanText").html(tools.getLocalization(translation, ["map", "scan"]));
    $("#endBtn").html(tools.getLocalization(translation, ["map", "end"]));
    $("#starBtn").html(tools.getLocalization(translation, ["map", "start"]));

    $("#yesButton").html(tools.getLocalization(translation, ["map", "Yes"]));
    $("#noButton").html(tools.getLocalization(translation, ["map", "No"]));


    $("#currentStoryline").text(tools.getLocalization(translation, ["storyline", "CurrentStoryline"]) + localStorage.getItem("currentStoryline"));
    $("#previewStoryline").text(tools.getLocalization(translation, ["storyline", "PreviewStoryline"]) + localStorage.getItem("previewStoryline"));
    if (localStorage.getItem("previewStoryline") != null) {
        $("#currentStoryline").hide();
        storylineSelectedID = localStorage.getItem("previewStoryline");
    } else {
        $("#previewStoryline").hide();
        storylineSelectedID = localStorage.getItem("currentStoryline");
    }
    //browser testing (default storyline)
    if (storylineSelectedID == null) {
        storylineSelectedID = "0";
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
    for (var i = 0; i < floors.length; i++) {
        var property = (i + floorDiff) + "";
        baseMaps[property] = floors[i].groupLayer;
    }
    //floor overlay radio buttons
    var overlayMaps = {
    };

    //create map
    map = L.map("map", {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom,
        crs: L.CRS.Simple
    });
    map.on("load", function() {
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
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map).setPosition("bottomright");
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
    } else {
        $("#currentStoryline").show();
        $("#previewStoryline").hide();


        if ((lastVisitedNodeID != null && lastVisitedNodeID != storyline.nodePath[0] + "")) {
            //popup asking "Would you like to be directed to the start of the storyline?"
            showShortMessageBox("Alert",
                tools.getLocalization(translation, ["storyline", "reDirectBegin"]),
                function() {
                    pathToStart();

                    for (var i in map._layers) {
                        if (map._layers[i]._path != undefined) {
                            try {
                                map.removeLayer(map._layers[i]);
                            } catch (e) {
                                console.log("problem with " + e + map._layers[i]);
                            }
                        }
                    }

                    floors = StorylineMapObj.createPolyline(floors, navigationPath);
                    for (var j = 0; j < floors.length; j++) {
                        floors[j].groupLayer.addLayer(floors[j].polyline);

                        for (var i = 0; i < floors[j].markers.length; i++) {
                            floors[j].groupLayer.addLayer(floors[j].markers[i]);
                        }
                    }
                    var tempfloor = ListPOI[lastVisitedNodeID].floorID;
                    map.addLayer(floors[tempfloor - floorDiff].polyline);
                    floors = StorylineMapObj.addPolylines(floors);

                    focusOnStart();
                },
                function() { focusOnStart() });
        } else {
            focusOnStart();
        }
    }
}

function pathToStart() {
    var dijkstras = new Dijkstra(ListPOI, ListPOT);
    var start = localStorage.getItem("lastVisitedNodeID");
    var finish = storyline.nodePath[0] + "";
    var shortestPathID = dijkstras.shortestPath(start, finish);
    navigationPath = new Navigation(shortestPathID, true);
    navigationPath = StorylineMapObj.parseNodePath(navigationPath);
    floors = StorylineMapObj.createPolyline(floors, navigationPath);
    floors = MapObj.groupLayers(floors);
    floors = StorylineMapObj.addPolylines(floors);
    startNode = ListPOI[navigationPath.nodePath[0] + ""];
}

function focusOnStart() {
    if (navigationPath.isNotAtStart) {
        var firstNodeID = navigationPath.nodePath[0] + "";
        var firstNode = navigationPath.nodes[firstNodeID];
    } else {
        var firstNodeID = storyline.nodePath[0] + "";
        var firstNode = storyline.nodes[firstNodeID];
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
    var nextPOIInPath = null;
    //if navigation to start path
    if (navigationPath.isNotAtStart) {
        for (var i = 0; i < navigationPath.nodePath.length; i++) {
            if (ListPOI[navigationPath.nodePath[i] + ""] != null) {
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
            repeatNodeDik = lastVisitedNodeID;

            updatePOI(navigationPath);
            repeatNode = null;
            if (localStorage.getItem("lastVisitedNodeID") == storyline.nodePath[0] + "" || isDone) {
                navigationPath.isNotAtStart = false;
                repeatNodeDik = null;
                localStorage.removeItem("lastVisitedNodeID");
                //Read all markers
                for (i in map._layers) {
                    if (map._layers[i]._path != undefined) {
                        try {
                            map.removeLayer(map._layers[i]);
                        } catch (e) {
                            console.log("problem with " + e + map._layers[j]);
                        }
                    }
                }
                floors = StorylineMapObj.createPolyline(floors, storyline);

                for (var i = 0; i < floors.length; i++) {
                    for (var j = 0; j < floors[i].markers.length; j++) {
                        floors[i].groupLayer.addLayer(floors[i].markers[j]);
                    }
                }
                var tempfloor = ListPOI[storyline.nodePath[0] + ""].floorID;
                map.addLayer(floors[tempfloor - floorDiff].polyline);
                floors = StorylineMapObj.addPolylines(floors);
                focusOnStart();
            }
        }
    } else {
        for (i = 0; i < storyline.nodePath.length; i++) {
            if (ListPOI[storyline.nodePath[i] + ""] != null) {
                nextPOIInPath = ListPOI[storyline.nodePath[i]];
                break;
            }
        }
        lastVisitedNodeID = nextPOIInPath.id;

        if (nextPOIInPath != null && lastVisitedNodeID != repeatNode && nextPOIInPath.iBeacon.minor == minor && nextPOIInPath.iBeacon.major == major) {
            repeatNode = lastVisitedNodeID;
            updatePOI(storyline);
            iBeaconDiscovered(minor, major);
            repeatNodeDik = null;
        }
    }
}

function updatePOI(storyline) {
    var node;
    var floorIDInt;
    for (var i = 0; i < storyline.nodePath.length; i++) {

        node = storyline.nodes[storyline.nodePath[i] + ""];
        floorIDInt = parseInt(node.floorID);

        if (ListPOI[storyline.nodePath[i] + ""] != null && lastVisitedNodeID == storyline.nodePath[i] + "") {
            focusOnNode(node, 3);
            localStorage.setItem("lastVisitedNodeID", storyline.nodePath[i] + "");
            storyline.nodePath.splice(0, i);
            floors = StorylineMapObj.createPolyline(floors, storyline);
            for (j in map._layers) {
                if (map._layers[j]._path != undefined) {
                    try {
                        map.removeLayer(map._layers[j]);
                    } catch (e) {
                        console.log("problem with " + e + map._layers[j]);
                    }
                }
            }

            for (j = 0; j < floors.length; j++) {
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
    var floors = $("input[name=leaflet-base-layers]:radio");
    jQuery.each(floors, function(index, radio) {
        if ($(radio).next()[0].innerHTML.trim() == node.floorID + "") {
            if (radio.checked) {
                map.setView(new L.LatLng(node.y, node.x), zoom, { animate: true });
            } else {
                $(radio).prop("checked", true).trigger("click");
                map.panTo(new L.LatLng(node.y, node.x));
                map.setZoom(zoom);
            }
            return;
        }
    });
}

//testing
function simulateBeacon() {
    if (navigationPath.isNotAtStart) {
        updatePOI(navigationPath);
        if (localStorage.getItem("lastVisitedNodeID") == storyline.nodePath[0] + "") {
            navigationPath.isNotAtStart = false;
            localStorage.removeItem("lastVisitedNodeID");
            //Read all markers
            floors = StorylineMapObj.createPolyline(floors, storyline);

            for (i = 0; i < floors.length; i++) {
                for (var j = 0; j < floors[i].markers.length; j++) {
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