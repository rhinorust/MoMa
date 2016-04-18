QUnit.jUnitReport = function (data) {
    var console = window.console;
    if (console) {
        console.log(data.xml);
    }
};

QUnit.module("Verify all items present");
QUnit.test("AllPOIListed", function (assert) {
    createListView();
    var poiCount = DATA.node.poi.length;
    assert.equal($("#listViewUl li").size(), poiCount, "All " + poiCount + " POI listed");
});

QUnit.test("AllBaseMaps", function (assert) {
    init();
    assert.equal(Object.keys(baseMaps).length, 4, "4 base maps");
    var floors = $('input[name=leaflet-base-layers]:radio');
    assert.equal(floors.length, 4, "There are 4 layers in the layer control");
});

QUnit.test("ShowAllLayers", function (assert) {
    init();
    var floors = $('input[name=leaflet-base-layers]:radio');
    var floorCount = 0;
    jQuery.each(floors, function(index, radio) {
        $(radio).prop("checked", true).trigger("click");
        var floorNumber = $(radio).next()[0].innerHTML.trim();
        var layersObj = map._layers;
        var found = false;
        for (var prop in layersObj) {
            if (typeof layersObj[prop]._url !== 'undefined' && layersObj[prop]._url != null) {
                var url = layersObj[prop]._url;
                assert.ok(url.toLowerCase().indexOf("floor" + floorNumber) > -1, "Able to switch to floor #" + floorNumber);
                found = true;
                break;
            }
        }
        if (found) {
            floorCount++;
        }
    });
    assert.equal(floorCount, 4, "All 4 floors were verified");
});

QUnit.test("ValidateZoomLevels", function (assert) {
    init();
    assert.equal(map.getMaxZoom(), 5, "Max zoom is 5");
    assert.equal(map.getMinZoom(), 2, "Min zoom is 2");
});
