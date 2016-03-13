﻿//creates the list view of POI dynamically based on the js file
function createListView() {
    var language = getLanguage();
    var ul = $('#listViewUl');
    var poi = DATA.node[0].poi;
    for (var i = 0; i < poi.length; i++) {
        var li = document.createElement('li');
        var aTag = document.createElement('a');
        //aTag.href = "#";
        var foundTitle = false;
        for (var j = 0; j < poi[i].title.length; j++) {
            if (poi[i].title[j].language == language) {
                aTag.innerHTML = poi[i].title[j].title;
                aTag.id = poi[i].id;
                aTag.addEventListener("click", focusOnNode, false);
                li.appendChild(aTag);
                foundTitle = true;
                break;
            }
        }
        if (foundTitle) {
            ul.append(li);
            ul.listview().listview('refresh');
        }
    }
}

//Should get the language from the resource file
function getLanguage() {
    return "English";
}

//Hides the search list and autocomplete the search bar
//Triggers the radio button event to switch to the right floor
//Centers the map to the coordinate of the POI
//Zooms the map to a specified level (here, 4)
//Opens the popup of the marker
function focusOnNode(node) {
    node.preventDefault();
    $('li').attr("class", "ui-screen-hidden");
    var id = node.target.id;
    $('#autocomplete-input').val(node.target.innerHTML);
    var poi = DATA.node[0].poi;
    var coordinates = {};
    var floorId;
    //var markerId;
    for (var i = 0; i < poi.length; i++) {
        if(poi[i].id == id) {
            coordinates.x = poi[i].x;
            coordinates.y = poi[i].y;
            floorId = poi[i].floorID;
            //markerId = poi[i].id; 
        }
    }

    if (typeof floorId != 'undefined' && floorId != null) {
        var floors = $('input[name=leaflet-base-layers]:radio');
        jQuery.each(floors, function (index, radio) {
            if ($(radio).next()[0].innerHTML.trim() == floorId.trim()) {
                if (radio.checked) {
                    map.setView(new L.LatLng(coordinates.x, coordinates.y), 4, { animate: true });
                } else {
                    $(radio).prop("checked", true).trigger("click");
                    map.panTo(new L.LatLng(coordinates.x, coordinates.y));
                    map.setZoom(4);
                }
                //openMarkerPopup(markerId);
                return;
            }
        });
    }
}

//Open the marker popup based on its id. 
//They should be assigned when creating the markers
function openMarkerPopup(markerId) {
    map.eachLayer(function(marker) {
        if (marker._leaflet_id == markerId) {
            marker.openPopup();
            return;
        }
    });
}