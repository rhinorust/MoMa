QUnit.jUnitReport = function (data) {
    var console = window.console;
    if (console) {
        console.log(data.xml);
    }
};

QUnit.module("Scavenger Hunt Score Tests");
QUnit.test("ScoreZero", function (assert) {
    showFoundQRCodes(0);
    assert.equal($("#qrcodes").text(), "You have yet to find one QR Code!", "QR code");
});

QUnit.test("ScoreBetweenZeroAndFive", function (assert) {
    showFoundQRCodes(3);
    assert.equal(text, "You need <b>2</b> more to reach Bronze!", "QR code");
});

QUnit.test("ScoreFive", function (assert) {
    showFoundQRCodes(5);
    assert.equal($("#medalRep").css("visibility"), "visible", "QR code");
});

QUnit.test("ScoreBetweenFiveAndTen", function (assert) {
    showFoundQRCodes(8);
    assert.equal(text, "You need <b>2</b> more to reach Silver!", "QR code");
});

QUnit.test("ScoreTen", function (assert) {
    showFoundQRCodes(10);
    assert.equal($("#medalRep").css("visibility"), "visible", "QR code");
});

QUnit.test("ScoreBetweenTenAndFifteen", function (assert) {
    showFoundQRCodes(11);
    assert.equal(text, "You need <b>4</b> more to reach Gold!", "QR code");
});

QUnit.test("ScoreFifteen", function (assert) {
    showFoundQRCodes(15);
    assert.equal($("#medalRep").css("visibility"), "visible", "QR code");
});

QUnit.test("ScoreBetweenFifteenAndTwenty", function (assert) {
    showFoundQRCodes(19);
    assert.equal(text, "You need <b>1</b> more to reach Platinum!", "QR code");
});

QUnit.test("ScoreTwenty", function (assert) {
    showFoundQRCodes(20);
    assert.equal($("#medalRep").css("visibility"), "visible", "QR code");
});

