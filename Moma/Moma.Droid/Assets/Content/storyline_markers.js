//Marker Icons
var markerIconPOIBlue = L.icon({
    iconUrl: 'images/marker-icon-blue.png',
    shadowUrl: '',

    iconSize: [64, 64], // size of the icon
    //shadowSize: [50, 64], // size of the shadow
    iconAnchor: [30, 64], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [1, 1] // point from which the popup should open relative to the iconAnchor
});
var markerIconPOIGreen = L.icon({
    iconUrl: 'images/marker-icon-green.png',
    shadowUrl: '',
    iconSize: [64, 64], // size of the icon
    iconAnchor: [30, 64], // point of the icon which will correspond to marker's location
    popupAnchor: [1, 1] // point from which the popup should open relative to the iconAnchor
});
var markerIconPOIRed = L.icon({
    iconUrl: 'images/marker-icon-red.png',
    shadowUrl: '',
    iconSize: [64, 64], // size of the icon
    iconAnchor: [30, 64], // point of the icon which will correspond to marker's location
    popupAnchor: [1, 1] // point from which the popup should open relative to the iconAnchor
});
var markerIconNode = L.icon({
    iconUrl: 'images/none-marker-icon.png',
    shadowUrl: '',
});

//Get storyline selected from storyline.html
var storylineSelected = 1;

var floorArray = [{ floor: [] }, { floor: [] }, { floor: [] }, { floor: [] }, { floor: [] }, ];

//Floor 2 marker & node coordinates
storyline1Coordinates = [
    [],
    [
        { coord: [-42, 108], isPOI: 'true' }, { coord: [-58, 108], isPOI: 'false' }, { coord: [-62, 113], isPOI: 'false' }, { coord: [-71, 114], isPOI: 'true' }, { coord: [-71, 166], isPOI: 'true' },
        { coord: [-30, 168], isPOI: 'true' }, { coord: [-24, 113], isPOI: 'false' }, { coord: [-17, 113], isPOI: 'true' }, { coord: [-17, 102], isPOI: 'false' }, { coord: [-20, 101], isPOI: 'false' },
        { coord: [-18, 81], isPOI: 'false' }, { coord: [-20, 80], isPOI: 'true' }, { coord: [-17, 62], isPOI: 'false' }, { coord: [-15, 34], isPOI: 'false' }, { coord: [-8, 34], isPOI: 'false' }, { coord: [-7, 25], isPOI: 'true' }
    ],
    [],
    [],
    []
];
storyline2Coordinates = [
    [
        { coord: [-84, 115], isPOI: 'true' }, { coord: [-81, 115], isPOI: 'false' }, { coord: [-81, 113], isPOI: 'true' }
    ],
    [
        { coord: [-81, 113], isPOI: 'true' }, { coord: [-72, 114], isPOI: 'true' }, { coord: [-63, 114], isPOI: 'false' }, { coord: [-58, 109], isPOI: 'false' }, { coord: [-46, 109], isPOI: 'false' },
        { coord: [-44, 74], isPOI: 'true' }
    ],
    [],
    [],
    []
];
//Floor 2 marker icons & popups

var floorlatlngs = [{ floor: [] }, { floor: [] }, { floor: [] }, { floor: [] }, { floor: [] }, ];

if (storylineSelected == 1) {
    setMarkersAndPolyline(storyline1Coordinates);
} else if (storylineSelected == 2) {
    setMarkersAndPolyline(storyline2Coordinates);
} else if (storylineSelected == 3) {

} else {
    //no storyline selected (free map)
}


function setMarkersAndPolyline(storylineCoordinates) {
    var count = 0;
    var start = true;
    var end = true;
    for (floorIndex = 0; floorIndex < 5; floorIndex++) {
        for (nodeIndex = 0; nodeIndex < storylineCoordinates[floorIndex].length; nodeIndex++) {
            var markerIcon;
            if (storylineCoordinates[floorIndex][nodeIndex].isPOI == 'true') {
                //POI marker icon
                markerIcon = markerIconPOIBlue;
                count++;
                if (start) {
                    //start marker icon
                    markerIcon = markerIconPOIGreen;
                    start = false;
                }
                if (nodeIndex == storylineCoordinates[floorIndex].length - 1 && 0 == storylineCoordinates[floorIndex+1].length) {
                    //end marker icon
                    markerIcon = markerIconPOIRed;
                }
            } else {
                //invisible marker for nodes
                markerIcon = markerIconNode;
            }

            floorArray[floorIndex].floor.push(L.marker(storylineCoordinates[floorIndex][nodeIndex].coord, { icon: markerIcon, keepInView: true }).bindPopup('Artifact ' + count + '<br> <button>Learn more</button>'));
            floorlatlngs[floorIndex].floor.push(storylineCoordinates[floorIndex][nodeIndex].coord);

        }
    }
}

