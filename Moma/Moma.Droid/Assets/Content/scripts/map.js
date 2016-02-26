var baseMaps;
var map;
function init() {
    //floor maps
    floor1Array.push(L.tileLayer('floor1/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floor2Array.push(L.tileLayer('floor2/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floor3Array.push(L.tileLayer('floor3/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floor4Array.push(L.tileLayer('floor4/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));
    floor5Array.push(L.tileLayer('floor5/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, bounds: mapBounds, attribution: '', noWrap: true, tms: false }));

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

    //zoom levels
    var mapMinZoom = 1;
    var mapMaxZoom = 5;

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