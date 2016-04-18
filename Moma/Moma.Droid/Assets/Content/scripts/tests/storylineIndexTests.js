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
    assert.equal(storylineSelectedID, "S1", "Default storyline selected when none are selected is S1.");
});

QUnit.test("DisplayNonDefaultStoryline", function (assert) {
    localStorage.removeItem("currentStoryline");
    localStorage.setItem("currentStoryline", "S2");
    localStorage.removeItem("startIsSelected");
    displayStoryline();
    assert.equal(storylineSelectedID, "S2", "When local storage is updated new storyline is selected accordingly.");
});

QUnit.test("StartStorylineIsFalse", function (assert) {
    localStorage.removeItem("startIsSelected");
    localStorage.setItem("startIsSelected","false");
    displayStoryline();
    var storylineStarted = (typeof firstNode === 'undefined') ? null : firstNode;
    assert.equal(storylineStarted, null, "Storyline is not started if not defined in local storage.");
});

QUnit.test("StartStorylineIsFalse", function (assert) {
    localStorage.removeItem("startIsSelected");
    localStorage.setItem("startIsSelected","true");
    displayStoryline();
    var storylineStarted = (typeof firstNode === 'undefined') ? null : firstNode;
    assert.notEqual(storylineStarted, null, "Storyline is started as defined in local storage.");
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