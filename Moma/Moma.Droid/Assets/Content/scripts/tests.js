QUnit.module("Verify all items present");
QUnit.test("AllPOIListed", function (assert) {
    createListView();
    var poiCount = DATA.node[0].poi.length;
    assert.equal($("#listViewUl li").size(), poiCount, "All " + poiCount + " POI listed");
});

QUnit.test("AllBaseMaps", function (assert) {
    init();
    assert.equal(Object.keys(baseMaps).length, 5, "5 base maps");
    var floors = $('input[name=leaflet-base-layers]:radio');
    assert.equal(floors.length, 5, "There are 5 layers in the layer control");
});

QUnit.test("ValidateZoomLevels", function (assert) {
    init();
    assert.equal(map.getMaxZoom(), 5, "Max zoom is 5");
    assert.equal(map.getMinZoom(), 1, "Min zoom is 4");
});
