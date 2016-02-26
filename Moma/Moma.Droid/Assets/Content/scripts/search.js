//creates the list view dynamically based on the js file
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
            ul.listview('refresh');
        }
    }
}

//Should get the language from the resource file
function getLanguage() {
    return "English";
}

function focusOnNode(node) {
    node.preventDefault();
    $('li').attr("class", "ui-screen-hidden");
    var id = node.target.id;
    $('#autocomplete-input').val(node.target.innerHTML);
    var poi = DATA.node[0].poi;
    var coordinates = {};
    for (var i = 0; i < poi.length; i++) {
        if(poi[i].id == id) {
            coordinates.x = poi[i].x;
            coordinates.y = poi[i].y;
        }
    }
    //map.panTo(new L.LatLngBounds(x,y));
}
