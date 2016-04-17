$(document).ready(function() {
    $(document).on("keyup", "input[data-type='search']", function() {
        $("#listViewUl").show();
        $("#listViewUl").listview("refresh");
    });
});

//creates the list view of POI dynamically based on the js file
function createListView() {
    var language = currentLanguage;
    var ul = $("#listViewUl");
    var poi = DATA.node.poi;
    for (var i = 0; i < poi.length; i++) {
        var li = document.createElement("li");
        var aTag = document.createElement("a");
        aTag.href = "#";
        var foundTitle = false;
        for (var j = 0; j < poi[i].title.length; j++) {
            if (poi[i].title[j].language.toLowerCase() === language.toLowerCase()) {
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
        }
    }
    ul.listview().listview("refresh");
}

//Hides the search list and autocomplete the search bar
//Triggers the radio button event to switch to the right floor
//Centers the map to the coordinate of the POI
//Zooms the map to a specified level (here, 4)
//Opens the popup of the marker
function focusOnNode(node) {
    node.preventDefault();
    $("#listViewUl li").attr("class", "ui-screen-hidden");
    var id = node.target.id;
    var poi = ListPOI[id];
    if (poi != null) {
        if (typeof poi.floorID != "undefined" && poi.floorID != null) {
            var floors = $('input[name="leaflet-base-layers"][type="radio"]');
            jQuery.each(floors, function(index, radio) {
                if ($(radio).next()[0].innerHTML.trim() === poi.floorID.toString().trim()) {
                    map.invalidateSize();
                    if (radio.checked) {
                        map.setView([poi.y, poi.x], 4, { animate: true });
                    } else {
                        $(radio).prop("checked", true).trigger("click");
                        map.panTo([poi.y, poi.x]);
                        map.setZoom(4);
                    }
                    return false;
                }
            });
        }
    }
    $("#listViewUl").hide();
    $("input[data-type='search']").val("");
    map.invalidateSize();
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