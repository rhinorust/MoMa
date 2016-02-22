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

var floor1Array = [], floor2Array = [], floor3Array = [], floor4Array = [], floor5Array = [];

//Floor 2 marker & node coordinates
floor2Coordinates = [{ coord: [-42, 108], isPOI: 'true' }, { coord: [-58, 108], isPOI: 'false' }, { coord: [-62, 113], isPOI: 'false' }, { coord: [-71, 114], isPOI: 'true' }, { coord: [-71, 166], isPOI: 'true' },
{ coord: [-30, 168], isPOI: 'true' }, { coord: [-24, 113], isPOI: 'false' }, { coord: [-17, 113], isPOI: 'true' }, { coord: [-17, 102], isPOI: 'false' }, { coord: [-20, 101], isPOI: 'false' },
{ coord: [-18, 81], isPOI: 'false' }, { coord: [-20, 80], isPOI: 'true' }, { coord: [-17, 62], isPOI: 'false' }, { coord: [-15, 34], isPOI: 'false' }, { coord: [-8, 34], isPOI: 'false' }, { coord: [-7, 25], isPOI: 'true' }];


//Floor 2 marker icons & popups
var floor2latlngs = Array();
var count = 0;

for (i = 0; i < floor2Coordinates.length; i++) {
    var markerIcon;
    if (floor2Coordinates[i].isPOI == 'true') {
        //POI marker icon
        markerIcon = markerIconPOIBlue;
        count++;
        if (i == 0) {
            //start marker icon
            markerIcon = markerIconPOIGreen;
        }
        if (i == floor2Coordinates.length - 1) {
            //end marker icon
            markerIcon = markerIconPOIRed;
        }
    } else {
        //invisible marker for nodes
        markerIcon = markerIconNode;
    }
    floor2Array.push(L.marker(floor2Coordinates[i].coord, { icon: markerIcon, keepInView:true }).bindPopup('Artifact ' + count + '<br> <button>Learn more</button>'));
    floor2latlngs.push(floor2Coordinates[i].coord);
}

            