var markerIcon = L.icon({
    iconUrl: 'images/marker-icon.png',
    shadowUrl: '',

    iconSize: [25, 41], // size of the icon
    //shadowSize: [50, 64], // size of the shadow
    iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [1, 1] // point from which the popup should open relative to the iconAnchor
});
var floor1Array = [], floor2Array = [], floor3Array = [], floor4Array = [], floor5Array = [];

//floor1 markers (POIs)
/*
var floor1Marker1 = L.marker([125, 45], { icon: markerIcon }).bindPopup('Artifact 1'),
    floor1Marker2 = L.marker([0, 188], { icon: markerIcon }).bindPopup('Artifact 2'),
    floor1Marker3 = L.marker([-93, 0], { icon: markerIcon }).bindPopup('Artifact 3'),
    floor1Marker4 = L.marker([-93, 188], { icon: markerIcon }).bindPopup('Artifact 4');
floor1Array = [floor1Marker1, floor1Marker2, floor1Marker3, floor1Marker4];
*/

//floor2 markers
floor2Coordinates = [[-42, 108], [-58, 108], [-62, 113], [-71, 114], [-71, 166],
                     [-30, 168], [-24, 113], [-17, 113], [-17, 102], [-20, 101],
                     [-18, 81], [-20, 80], [-17, 62], [-15, 34], [-8, 34], [-7, 25]];

var latlngs = Array();

//Get latlng from first marker
for (i = 0; i < floor2Array.length; i++) {
    alert(floor2Array[i]);
    latlngs.push(floor2Array[i].getLatLng());
}

for (i = 0; i < floor2Coordinates.length; i++) {
    floor2Array.push(L.marker(floor2Coordinates[i], { icon: markerIcon }).bindPopup('Artifact ' + i + ''));
    latlngs.push(floor2Coordinates[i]);
}



//floor3 markers
/*
var floor3Marker1 = L.marker([-50, 30], { icon: markerIcon }).bindPopup('Artifact 7'),
    floor3Marker2 = L.marker([-40, 170], { icon: markerIcon }).bindPopup('Artifact 8');
floor3Array = [floor3Marker1, floor3Marker2];

//floor4 markers
var floor4Marker1 = L.marker([-80, 50], { icon: markerIcon }).bindPopup('Artifact 9'),
    floor4Marker2 = L.marker([-30, 90], { icon: markerIcon }).bindPopup('Artifact 10');
floor4Array = [floor4Marker1, floor4Marker2];

//floor5 markers

var floor5Marker1 = L.marker([-46, 94], { icon: markerIcon }).bindPopup('Artifact 11'),
    floor5Marker2 = L.marker([-60, 10], { icon: markerIcon }).bindPopup('Artifact 12');
floor5Array = [floor5Marker1, floor5Marker2];
*/


            //var floor1Overlay = L.layerGroup([floor1Marker1, floor1Marker2, floor1Marker3, floor1Marker4]);
            //floor overlay radio buttons
            var overlayMaps = {
                //"Markers": floor1Overlay
            };
            