var markerIcon = L.icon({
    iconUrl: 'images/marker-icon.png',
    shadowUrl: '',

    iconSize: [25, 41], // size of the icon
    //shadowSize: [50, 64], // size of the shadow
    iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [1, 1] // point from which the popup should open relative to the iconAnchor
});

//floor1 markers (POIs)
var floor1Marker1 = L.marker([0, 0], { icon: markerIcon }).bindPopup('0,0'),
    floor1Marker2 = L.marker([0, 188], { icon: markerIcon }).bindPopup('0,188'),
    floor1Marker3 = L.marker([-93, 0], { icon: markerIcon }).bindPopup('-93,0'),
    floor1Marker4 = L.marker([-93, 188], { icon: markerIcon }).bindPopup('-93,188');

//floor2 markers
var floor2Marker1 = L.marker([-10, 20], { icon: markerIcon }).bindPopup('0,0'),
    floor2Marker2 = L.marker([-70, 120], { icon: markerIcon }).bindPopup('0,0');

//floor3 markers
var floor3Marker1 = L.marker([-50, 30], { icon: markerIcon }).bindPopup('0,0'),
    floor3Marker2 = L.marker([-40, 170], { icon: markerIcon }).bindPopup('0,0');

//floor4 markers
var floor4Marker1 = L.marker([-80, 50], { icon: markerIcon }).bindPopup('0,0'),
    floor4Marker2 = L.marker([-30, 90], { icon: markerIcon }).bindPopup('0,0');

//floor5 markers

var floor5Marker1 = L.marker([-46, 94], { icon: markerIcon }).bindPopup('0,0'),
    floor5Marker2 = L.marker([-60, 10], { icon: markerIcon }).bindPopup('0,0');




            //var floor1Overlay = L.layerGroup([floor1Marker1, floor1Marker2, floor1Marker3, floor1Marker4]);
            //floor overlay radio buttons
            var overlayMaps = {
                //"Markers": floor1Overlay
            };
            