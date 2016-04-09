// The code that handles the short message pop up box in js

var shortMsgIB;
var shortMsgTitle;
var shortMsgContent;
var buttons;
var yesClickFunctionLast;
var noClickFunctionLast;

$('document').ready(function () {
    shortMsgIB = $('#shortMessageBox');
    shortMsgTitle = shortMsgIB.find('#title h1');
    shortMsgContent = shortMsgIB.find('#content #text');

    buttons = shortMsgIB.find('#content #buttons');

    var closeButton = shortMsgIB.find('#close');
    closeButton.click(function () {
        shortMsgIB.css('visibility', 'hidden');
    });

    // Debugging:
    //showShortMessageBox('title', 'short message', function () { }, function () { });
});

// An example of opening a box like this:
// showShortMessageBox('title', 'short message', function(){/*that handles Yes button click*/}, function(){/*that handles No button click*/});
// Also, clicking yes or not automatically closes the box
function showShortMessageBox(title, shortMessage, yesClickFunction, noClickFunction) {
    shortMsgTitle.text(title);
    shortMsgContent.text("<p>" + shortMessage + "</p>");

    yesClickFunctionLast = yesClickFunction;
    noClickFunctionLast = noClickFunction;

    shortMsgIB.css('visibility', 'visible');
}

function yesButtonClick() {
    shortMsgIB.css('visibility', 'hidden');
    yesClickFunctionLast();
}

function noButtonClick() {
    shortMsgIB.css('visibility', 'hidden');
    noClickFunctionLast();
}