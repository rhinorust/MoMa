var poiIB;

$('document').ready(function() {
	poiIB = $('#POI_InformationBox');

	$('#closeButton').click(function() {
		poiIB.css('visibility', 'hidden');
	})
});

function iBeaconDiscovered(major, minor) {
	var title    = poiIB.find('#title h1');
	var content  = poiIB.find('#content');

	var titleText = "";
	var contentImg = "";
	var contentText = "";

	// CocaCola iBeacon
	if (major === 9377 && minor === 54177) {
		titleText = "COCACOLA IBEACON FOUND";
		contentText = "<p>Major: "+major+", Minor: "+minor+"</p>";
		contentImg = '<img src="images/CocaColaBeacon.png">';
	}

	title.text(titleText);
	content.empty();
	content.append(contentText + contentImg);

	poiIB.css('visibility', 'visible');
}

