QUnit.jUnitReport = function (data) {
    var console = window.console;
    if (console) {
        console.log(data.xml);
    }
};

QUnit.module("Storyline Tests");
QUnit.test("AllStorylinesDisplayed", function (assert) {
    $("#storylines").collapsibleset().trigger('create');
    currentLanguage = "en";
    init();
    assert.equal($("#storylines").children().length, DATA.storyline.length, "All storylines from JSON are being displayed.");
});

QUnit.test("LanguageNotEnglish", function (assert) {
    $("#storylines").collapsibleset().trigger('create');
    currentLanguage = "fr";
    init();
    assert.equal($("#storylines").children().length, DATA.storyline.length, "All storylines from JSON are being displayed.");
});