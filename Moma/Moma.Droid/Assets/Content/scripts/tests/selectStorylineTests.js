QUnit.jUnitReport = function (data) {
    var console = window.console;
    if (console) {
        console.log(data.xml);
    }
};

QUnit.module("Storyline Tests");
QUnit.test("AllStorylinesDisplayed", function (assert) {
    init();
    assert.equal($("#storylines").children().length, DATA.storyline.length, "All storylines from JSON are being displayed.");
});