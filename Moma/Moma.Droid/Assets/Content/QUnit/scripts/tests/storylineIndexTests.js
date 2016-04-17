blanket.customReporter = function (coverage_results) {
    console.log(coverage_results);
};


QUnit.jUnitReport = function (data) {
    var console = window.console;
    if (console) {
        console.log(data.xml);
    }
};

QUnit.module("Storyline Tests");
QUnit.test("DisplayDefaultStoryline", function (assert) {
    localStorage.removeItem("currentStoryline");
    displayStoryline();
    assert.equal(storylineSelectedID, "0", "Default storyline selected when none are selected is 0.");
});

QUnit.test("DisplayNonDefaultStoryline", function (assert) {
    localStorage.removeItem("currentStoryline");
    localStorage.setItem("currentStoryline", "4");
    displayStoryline();
    assert.equal(storylineSelectedID, "4", "When local storage is updated new storyline is selected accordingly.");
});


//Need to information in json
QUnit.module("iBeacon Tests");
//QUnit.test("iBeaconExists", function (assert) {
//    localStorage.removeItem("startIsSelected");
//    localStorage.setItem("startIsSelected", "true");
//    displayStoryline();
//    iBeaconDiscovered(9377, 54177);
//    var desc = (typeof boxContent === 'undefined') ? null : boxContent;
//    assert.notEqual(desc, "", "iBeacon found, boxContent attribute has been filled.");
//});

//QUnit.test("iBeaconDoesNotExist", function (assert) {
//    localStorage.removeItem("startIsSelected");
//    localStorage.setItem("startIsSelected", "true");
//    displayStoryline();
//    iBeaconDiscovered(01234, 05678156);
//    var desc = (typeof boxContent === 'undefined') ? null : boxContent;
//    assert.equal(desc, "", "iBeacon not found, boxContent attribute is null.");
//});