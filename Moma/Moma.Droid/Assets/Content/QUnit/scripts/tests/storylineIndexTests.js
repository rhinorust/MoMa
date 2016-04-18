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
    localStorage.clear();
    displayStoryline();
    assert.equal(storylineSelectedID, "0", "Default storyline selected when none are selected is 0.");
});

QUnit.test("DisplayNonDefaultStoryline", function (assert) {
    localStorage.clear();
    localStorage.setItem("currentStoryline", "4");
    displayStoryline();
    assert.equal(storylineSelectedID, "4", "When local storage is updated new storyline is selected accordingly.");
});

QUnit.module("POI Tests");
QUnit.test("Navigation path is updated when pathToStart is called.", function (assert) {
    localStorage.clear();
    localStorage.setItem("currentStoryline", "0");
    localStorage.setItem("lastVisitedNodeID", "1");
    displayStoryline();
    var previousNavigationPath = navigationPath;
    pathToStart();
    assert.notEqual(navigationPath, previousNavigationPath, "Starting nodes are not equal when performing path to start.");
});

QUnit.test("Storyline path begins at first node", function (assert) {
    localStorage.clear();
    localStorage.setItem("currentStoryline", "0");
    displayStoryline();
    focusOnStart();
    assert.equal(firstNode, storyline.nodes[firstNodeID], "Starting nodes are equal if path to start is not called.");
});

QUnit.test("Current POI is updated when visited.", function (assert) {
    localStorage.clear();
    localStorage.setItem("currentStoryline", "0");
    localStorage.setItem("lastVisitedNodeID", "0");
    displayStoryline();
    pathToStart();
    currentPOI(372, 26515);
    assert.equal(localStorage.getItem("lastVisitedNodeID"), null, "When a POI is visited it is cleared from local storage.");
});

//QUnit.test("Current POI 2", function (assert) {
//    localStorage.clear();
//    localStorage.setItem("currentStoryline", "0");
//    localStorage.setItem("lastVisitedNodeID", "0"); 
//    displayStoryline();
//    currentPOI(372, 26515);
//    assert.equal(localStorage.getItem("lastVisitedNodeID"), null, "Starting nodes are not equal when performing path to start.");
//});

