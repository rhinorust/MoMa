//language variable
//english = 0
var lang = 0;

//Class Diagram Objects

function POI(id, x, y, floorID, title, description, iBeacon, video, image, audio) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.floorID = floorID;
    this.title = title;
    this.description = description;
    this.iBeacon = iBeacon;
    this.video = video;
    this.image = image;
    this.audio = audio;
    this.edges = [];

    this.getQRInfo = function (QRID) {
        return"string";
    };
    this.getPOIPosition = function () {
        return "string";
    };
    this.displayMorePOIInfo = function () {
        return "string";
    };
    this.getMorePOIInfo = function () {
        return "string";
    };
    this.findQRPOI = function (QRID) {
        return null;
    };
    this.getPOIInfo = function () {
        return "string";
    };
    this.displayLLPOILocation = function () {

    };
    this.getPopularPOI = function () {
        ;
    }

}

function POT(id, x, y, floorID, label) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.floorID = floorID;
    this.label = label;
    this.edges = [];
}

function Edge(startNode, endNode, distance, floorID) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.distance = distance;
    this.floorID = floorID;
}

function IBeacon(uuid, major, minor) {
    this.uuid = uuid;
    this.major = major;
    this.minor = minor;
}

function Video(videoID, path, caption) {
    this.videoID = videoID;
    this.path = path;
    this.caption = caption;

    this.showVideo = function () {
        //show video
    }
}

function Image(imageID, path, caption) {
    this.imageID = imageID;
    this.path = path;
    this.caption = caption;

    this.showImage = function () {
        //show image
    }
}

function Audio(audioID, path, caption) {
    this.audioID = audioID;
    this.path = path;
    this.caption = caption;

    this.playAudio = function () {
        //play video
    }
}

function Floor(floorID) {
    this.floorID = floorID;
    this.imagePath;
    this.imageWidth;
    this.imageHeight;
    //poi + pot on this layer
    this.POI = [];
    this.POT = [];
    this.markersById = [];
    this.tileLayer;
    this.markers = [];
    this.groupLayer;

    this.polyline;
    this.polylineLatLng = [];

    this.parseFloor = function () {
        var floor = DATA.floorPlan[floorID - 1];
        this.imagePath = floor.imagePath;
        this.imageWidth = floor.imageWidth;
        this.imageHeight = floor.imageHeight;
    };
    //call function on constructor
    this.parseFloor();

    this.createTileLayer = function (minZoom, maxZoom) {
        this.tileLayer = L.tileLayer('floor'+floorID+'/{z}/{x}/{y}.png', { minZoom: mapMinZoom, maxZoom: mapMaxZoom, attribution: '', noWrap: true, tms: false});
    };

    this.groupLayers = function () {
        this.groupLayer = L.layerGroup(this.markers).addLayer(this.tileLayer);
    };

    this.addPolylineLayer = function () {
        this.polyline = L.polyline(this.polylineLatLng, { color: '#0066ff', weight: 10, opacity: 0.7 });
        this.groupLayer.addLayer(this.polyline);
    };

}

function Storyline(id, title, description, nodePath, thumbnailPath, walkingTimeInMinutes, floorsCovered) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.nodePath = nodePath;
    this.thumbnailPath = thumbnailPath;
    this.walkingTimeInMinutes = walkingTimeInMinutes;
    this.floorsCovered = floorsCovered;
    this.nodes = []; //associative array
}

function Navigation(nodePath, isNotAtStart) {
    this.title = "Navigate to the start";
    this.nodePath = nodePath;
    this.nodes = [];
    this.isNotAtStart = isNotAtStart;
}

//Map Object
function Map() {

    this.createMarker = function (iconURL, iconWidth, iconHeight, iconAnchorWidth, iconAnchorHeight, iconAnchorX, iconAnchorY) {
        var marker = L.icon({
            iconUrl: iconURL,
            shadowUrl: '',
            iconSize: [iconWidth, iconHeight],
            //shadowSize: [50, 64], // size of the shadow
            // point of the icon which will correspond to marker's location
            iconAnchor: [iconAnchorWidth, iconAnchorHeight],
            //shadowAnchor: [4, 62],  // the same for the shadow
            // point from which the popup should open relative to the iconAnchor
            popupAnchor: [iconAnchorX, iconAnchorY]
        });
        return marker;
    };

    this.parsePOI = function (floors) {
        var arrayPOI = DATA.node[0].poi;
        for (var i = 0; i < arrayPOI.length; i++) {
            var p = arrayPOI[i];
            var poi = new POI(p.id, p.x, p.y, p.floorID, p.title[lang].title, p.description[0].description, p.iBeacon, p.media.video, p.media.image, p.media.audio);
            floors[p.floorID - 1].POI[poi.id+""] = poi;
            floors[p.floorID - 1].markersById[poi.id + ""] = L.marker([poi.y, poi.x], { icon: markerIconPOIBlue }).bindPopup(poi.description);
            floors[p.floorID - 1].markers.push(floors[p.floorID - 1].markersById[poi.id + ""]);
            ListPOI[poi.id + ""] = poi;
        }
        return floors;
    };

    this.parsePOT = function (floors) {
        var arrayPOT = DATA.node[0].pot;
        for (var i = 0; i < arrayPOT.length; i++) {
            var p = arrayPOT[i];
            var pot = new POT(p.id, p.x, p.y, p.floorID, p.label.label);
            floors[p.floorID - 1].POT[pot.id + ""] = pot;
            floors[p.floorID - 1].markersById[pot.id + ""] = L.marker([pot.y, pot.x], { icon: markerIconNode });
            floors[p.floorID - 1].markers.push(floors[p.floorID - 1].markersById[pot.id + ""]);
            ListPOT[pot.id+""] = pot;
        }
        return floors;
    };

    this.parseEdges = function () {
        var arrayEdges = DATA.edge;
        for (i = 0; i < arrayEdges.length; i++) {
            var e = arrayEdges[i];
            var edge = new Edge(e.startNode, e.endNode, e.distance, e.floorID);
            if (edge.startNode.charAt(0) == "1") {
                ListPOT[edge.startNode].edges.push(edge);
            } else if (edge.startNode.charAt(0) == "0") {
                ListPOI[edge.startNode].edges.push(edge);
            }
            if (edge.endNode.charAt(0) == "1") {
                ListPOT[edge.endNode].edges.push(edge);
            } else if (edge.endNode.charAt(0) == "0") {
                ListPOI[edge.endNode].edges.push(edge);
            }
        }
    }

    this.createFloorTileLayers = function (floors, minZoom, maxZoom) {
        for (i = 0; i < floors.length; i++) {
            floors[i].createTileLayer(minZoom,maxZoom);
        }
        return floors;
    }

    this.groupLayers = function (floors) {
        for (i = 0; i < floors.length; i++) {
            floors[i].groupLayers();
        }
        return floors;
    };
    this.addLayersToMap = function (floors, map) {
        for (i = 0; i < floors.length; i++) {
            floors[i].groupLayer.addTo(map);
        }
        return map;
    };
}

function StorylineMap() {

    this.parseStoryline = function (storylineSelectedID) {
        var arrayStoryline = DATA.storyline;
        var storyline;
        for (i = 0; i < arrayStoryline.length; i++) {
            var s = arrayStoryline[i];
            if (storylineSelectedID == s.id) {
                storyline = new Storyline(s.id, s.title[lang].title, s.description[0].description, s.path, s.thumbnail, s.walkingTimeInMinutes, s.floorsCovered);
            }
        }
        return storyline;
    };
    this.parseNodePath = function (storyline) {
        var nodePath = storyline.nodePath;
        for (i = 0; i < nodePath.length; i++) {
            var node;

            //if node == 1---(pot) else if node == 0---(poi)
            if (nodePath[i].charAt(0) == "1") {
                node = ListPOT[nodePath[i]];
            } else if (nodePath[i].charAt(0) == "0") {
                node = ListPOI[nodePath[i]];
            }       
            storyline.nodes[node.id] = node;
        }

        return storyline;
    };
    this.createPolyline = function (floors, storyline) {

        //empty markers array of all floors
        for (i = 0; i < floors.length; i++) {
            floors[i].markers = [];
            floors[i].polylineLatLng = [];
        }
        //loop though nodePath array
        var nodePath = storyline.nodePath;
        for (i = 0; i < nodePath.length; i++) {
            var node = storyline.nodes[nodePath[i]];

            //get marker from floors[floorsID-1].markersById[POT.id] and add marker to floors[floorsID-1].markers
            var marker = floors[node.floorID - 1].markersById[node.id];
            if (i == 0) {
                marker.setIcon(markerIconPOIGreen);
            }
            if (i == nodePath.length - 1) {
                marker.setIcon(markerIconPOIRed);
            }
            floors[node.floorID - 1].markers.push(marker);
            floors[node.floorID - 1].polylineLatLng.push([parseInt(node.y), parseInt(node.x)]);
        }

        return floors;
    };

    this.addPolylines = function (floors) {
        for (i = 0; i < floors.length; i++) {
            floors[i].addPolylineLayer();
        }
        return floors;
    };

}

function Dijkstra(listPOI, listPOT) {
    this.vertices = [];
    var infinity = 1 / 0;
    this.addVertices = function () {
        //combine ids of pot & poi (for each)
        for (var key in listPOI) {
            this.vertices[key] = listPOI[key].edges;
        }
        for (var key in listPOT) {
            this.vertices[key] = listPOT[key].edges;
        }
    }

    this.shortestPath = function (start, finish) {
        this.addVertices();
        var nodes = new PriorityQueue(),
            distances = [],
            previous = [],
            path = [],
            smallest, vertex, neighbor, newDistance;

        //initialize vertex distances
        for (vertex in this.vertices) {
            if (vertex == start) {
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            } else {
                distances[vertex] = infinity;
                nodes.enqueue(infinity, vertex);
            }
            previous[vertex] = null;
        }
        //dijkstras
        while (!nodes.isEmpty()) {
            smallest = nodes.dequeue();

            //make path nodes in increasing order of size(shortest path)
            if (smallest == finish) {
                path;
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            //continue
            if (!smallest || distances[smallest] == infinity) {
                continue;
            }
            for (i = 0; i < this.vertices[smallest].length; i++) {
                var edge = this.vertices[smallest][i];
                if (edge.startNode != smallest) {
                    neighbor = edge.startNode;
                } else {
                    neighbor = edge.endNode;
                }

                newDistance = distances[smallest] + edge.distance;

                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = smallest;

                    nodes.enqueue(newDistance, neighbor);
                }

            }
        }
        return path.concat([start]).reverse();
    }
    
    var PriorityQueue = function () {
        this._nodes = [];

        this.enqueue = function (priority, key) {
            this._nodes.push({key: key, priority: priority });
            this.sort();
        }
        this.dequeue = function () {
            return this._nodes.shift().key;
        }
        this.sort = function () {
            this._nodes.sort(function (a, b) {
                return a.priority - b.priority;
            });
        }
        this.isEmpty = function () {
            return !this._nodes.length;
        }
    }
}

