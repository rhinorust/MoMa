var map;

var polyline = [];
function displayStoryline() {
    //Test - next POI button
    $("#nextBtn").hide();

    //--TO DO
    //GET & PARSE JSON (add to separate js file before the marker.js file)
    //rearange the js and divide into separate files
    //adapt code to deal between storyline and free map (POI icons, paths, back to storyline selection page button)

    //--marker.js file contains coordinates that were parsed from json and the storyline trajectories

    //--set variable storylineSelected to the storyline id/number selected from the storyline selection page
    
    //zoom levels
    var mapMinZoom = 1;
    var mapMaxZoom = 5;

    //floor maps
    floorArray[0].floor.push(L.tileLayer('floor1/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floorArray[1].floor.push(L.tileLayer('floor2/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floorArray[2].floor.push(L.tileLayer('floor3/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floorArray[3].floor.push(L.tileLayer('floor4/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floorArray[4].floor.push(L.tileLayer('floor5/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));

    $('#currentStoryline').text("Current storyline: " + localStorage.getItem("currentStoryline"));
    $('#previewStoryline').text("Previewing storyline: " + localStorage.getItem("currentStoryline"));

    if (storylineSelected == 1) {
        storylineSelectedCoordinates = storyline1Coordinates;
        setMarkersAndPolyline(storyline1Coordinates);
    } else if (storylineSelected == 2) {
        storylineSelectedCoordinates = storyline2Coordinates;
        setMarkersAndPolyline(storyline2Coordinates);
    } else if (storylineSelected == 3) {

    } else {
        //no storyline selected (free map)
    }
    //storyline polyline paths

    polyline[0] = L.polyline(floorlatlngs[0].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });
    polyline[1] = L.polyline(floorlatlngs[1].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });
    polyline[2] = L.polyline(floorlatlngs[2].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });
    polyline[3] = L.polyline(floorlatlngs[3].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });
    polyline[4] = L.polyline(floorlatlngs[4].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });

    floorArray[0].floor.push(polyline[0]);
    floorArray[1].floor.push(polyline[1]);
    floorArray[2].floor.push(polyline[2]);
    floorArray[3].floor.push(polyline[3]);
    floorArray[4].floor.push(polyline[4]);

    //Floor layer groups
    var floor1LayerGroup = L.layerGroup(floorArray[0].floor),
        floor2LayerGroup = L.layerGroup(floorArray[1].floor),
        floor3LayerGroup = L.layerGroup(floorArray[2].floor),
        floor4LayerGroup = L.layerGroup(floorArray[3].floor),
        floor5LayerGroup = L.layerGroup(floorArray[4].floor);

    //floor radio buttons
    var baseMaps = {
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


    //Display start POI floor
    if (storylineSelected == 1) {
        floor2LayerGroup.addTo(map);
    } else if (storylineSelected == 2) {
        //TODO: No storyline yet
    } else if (storylineSelected == 3) {
        //TODO: No storyline yet
    } else {
        //no storyline selected (free map)
    }

    //L.rectangle(mapBounds, { color: "#ff7800", weight: 1 }).addTo(map);

    //STORYLINE======================================================
    //line between markers

    // zoom the map to the polyline
    //map.fitBounds(polyline.getBounds());
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
    for (var floorIndex = 0; floorIndex < 5; floorIndex++) {
        for (var nodeIndex = 0; nodeIndex < storylineSelectedCoordinates[floorIndex].length; nodeIndex++) {
            if (storylineSelectedCoordinates[floorIndex][nodeIndex].isStart == "true") {
                node = storylineSelectedCoordinates[floorIndex][nodeIndex];
                floorNumber = floorIndex + 1;
                focusOnNode(node, floorNumber);
                break;
            }
        }
    }
}
function nextPOI() {
    for (var floorIndex = 0; floorIndex < 5; floorIndex++) {
        for (var nodeIndex = 0; nodeIndex < storylineSelectedCoordinates[floorIndex].length; nodeIndex++) {
            //alert(floorIndex + ", " + nodeIndex);
            var x = storylineSelectedCoordinates[floorIndex][nodeIndex].coord[0];
            var y = storylineSelectedCoordinates[floorIndex][nodeIndex].coord[1];

            if (storylineSelectedCoordinates[floorIndex][nodeIndex].isPOI == "true") {
                var node = storylineSelectedCoordinates[floorIndex][nodeIndex];

                storylineSelectedCoordinates[floorIndex].splice(0,nodeIndex+1);
                var floorNumber = floorIndex + 1;
                focusOnNode(node, floorNumber);
                return;
            }
        }
    }
}
function focusOnNode(node, floorNumber) {
        var floors = $('input[name=leaflet-base-layers]:radio');
        jQuery.each(floors, function (index, radio) {
            if ($(radio).next()[0].innerHTML.trim() == floorNumber+"") {
                if (radio.checked) {
                    map.setView(new L.LatLng(node.coord[0], node.coord[1]), 4, { animate: true });
                } else {
                    $(radio).prop("checked", true).trigger("click");
                    map.panTo(new L.LatLng(node.coord[0], node.coord[1]));
                    map.setZoom(4);
                }
                //openMarkerPopup(markerId);
                return;
            }
        });
    
}

function simulateBeacon() {
    
    iBeaconDiscovered(9377, 54177)
    //setMarkersAndPolyline(storylineSelectedCoordinates);
   // reloadMap();
    nextPOI();


}

function reloadMap() {

    floorArray[0].floor.pop();
    floorArray[1].floor.pop();
    floorArray[2].floor.pop();
    floorArray[3].floor.pop();
    floorArray[4].floor.pop();

    polyline[0] = L.polyline(floorlatlngs[0].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });
    polyline[1] = L.polyline(floorlatlngs[1].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });
    polyline[2] = L.polyline(floorlatlngs[2].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });
    polyline[3] = L.polyline(floorlatlngs[3].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });
    polyline[4] = L.polyline(floorlatlngs[4].floor, { color: '#0066ff', weight: 10, opacity: 0.7 });

    /*
    floorArray[0].floor.push(polyline[0]);
    floorArray[1].floor.push(polyline[1]);
    floorArray[2].floor.push(polyline[2]);
    floorArray[3].floor.push(polyline[3]);
    floorArray[4].floor.push(polyline[4]);*/

    //Floor layer groups
    var floor1LayerGroup = L.layerGroup(floorArray[0].floor),
        floor2LayerGroup = L.layerGroup(floorArray[1].floor),
        floor3LayerGroup = L.layerGroup(floorArray[2].floor),
        floor4LayerGroup = L.layerGroup(floorArray[3].floor),
        floor5LayerGroup = L.layerGroup(floorArray[4].floor);

    //floor radio buttons
    var baseMaps = {
        "1": floor1LayerGroup,
        "2": floor2LayerGroup,
        "3": floor3LayerGroup,
        "4": floor4LayerGroup,
        "5": floor5LayerGroup
    };
    var overlayMaps = {};

    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map)

}