function displayStoryline() {
    //--TO DO
    //GET & PARSE JSON (add to separate js file before the marker.js file)
    //rearange the js and divide into separate files
    //adapt code to deal between storyline and free map (POI icons, paths, back to storyline selection page button)

    //--marker.js file contains coordinates that were parsed from json and the storyline trajectories

    //--set variable storylineSelected to the storyline id/number selected from the storyline selection page
    
    //floor maps
    floorArray[0].floor.push(L.tileLayer('floor1/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floorArray[1].floor.push(L.tileLayer('floor2/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floorArray[2].floor.push(L.tileLayer('floor3/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floorArray[3].floor.push(L.tileLayer('floor4/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floorArray[4].floor.push(L.tileLayer('floor5/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));

    //storyline polyline paths
    if (storylineSelected == 1) {
        floorArray[1].floor.push(L.polyline(floorlatlngs[1].floor, { color: '#0066ff', weight: 10, opacity: 0.7 }));
    } else if (storylineSelected == 2) {
        floorArray[0].floor.push(L.polyline(floorlatlngs[0].floor, { color: '#0066ff', weight: 10, opacity: 0.7 }));
        floorArray[1].floor.push(L.polyline(floorlatlngs[1].floor, { color: '#0066ff', weight: 10, opacity: 0.7 }));
    } else if (storylineSelected == 3) {

    } else {
        //no storyline selected (free map)
    }

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

    //zoom levels
    var mapMinZoom = 1;
    var mapMaxZoom = 5;

    //create map
    var map = L.map('map', {
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

    } else if (storylineSelected == 3) {

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
    window.location.replace("storyline_index.html");
}