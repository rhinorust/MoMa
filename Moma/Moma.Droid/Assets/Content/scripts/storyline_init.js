function init() {
    for (var i = 1, l = DATA.storyline.length; i <= l; i++) {
        var storylineID = DATA.storyline[i - 1].id + "";
        var content;

        for (var j = 0, m = DATA.storyline[(i - 1)].title.length; j < m; j++){
            if (currentLanguage.toUpperCase() == DATA.storyline[(i - 1)].title[j].language.toUpperCase()) {
                content = "<div data-role='collapsible' id='storyline" + i + "'><h3>" + DATA.storyline[(i - 1)].title[j].title + "</h3><p>" + DATA.storyline[(i - 1)].description[j].description + "</p><br><input id = 'startButton' value=" + tools.getLocalization(translation, ['storyline', 'startButton']) + " type='submit' onclick='startStoryline(\"" + storylineID + "\")' style='background-color:rgba(61,139,255,1); color:white; border-radius:2px; border-color:rgba(61,139,255,1);'/>&nbsp;&nbsp;<input id = 'previewButton' value=" + tools.getLocalization(translation, ['storyline', 'previewButton']) +" type='submit' onclick='previewStoryline(\"" + storylineID + "\")' style='background-color:rgba(61,139,255,1); color:white; border-radius:2px; border-color:rgba(61,139,255,1);'/>&nbsp;&nbsp;<input type='submit' id = 'resume" + storylineID + "' value=" + tools.getLocalization(translation, ['storyline', 'resumeButton']) +"  onclick='resumeStoryline(" + storylineID + ")' style='background-color:rgba(61,139,255,1); color:white; border-radius:2px; border-color:rgba(61,139,255,1); visibility:hidden;&nbsp;&nbsp;'/></div>";
                break;
            }
            else {
                content = "<div data-role='collapsible' id='storyline" + i + "'><h3>" + DATA.storyline[(i - 1)].title[0].title + "</h3><p>" + DATA.storyline[(i - 1)].description[0].description + "</p><br><input id = 'startButton' value=" + tools.getLocalization(translation, ['storyline', 'startButton']) +"  type='submit' onclick='startStoryline(\"" + storylineID + "\")' style='background-color:rgba(61,139,255,1); color:white; border-radius:2px; border-color:rgba(61,139,255,1);'/>&nbsp;&nbsp;<input id = 'previewButton' value=" + tools.getLocalization(translation, ['storyline', 'previewButton']) +" type='submit'  onclick='previewStoryline(\"" + storylineID + "\")' style='background-color:rgba(61,139,255,1); color:white; border-radius:2px; border-color:rgba(61,139,255,1);'/>&nbsp;&nbsp;<input type='submit' id = 'resume" + storylineID + "' value=" + tools.getLocalization(translation, ['storyline', 'resumeButton']) +"  onclick='resumeStoryline(" + storylineID + ")' style='background-color:rgba(61,139,255,1); color:white; border-radius:2px; border-color:rgba(61,139,255,1); visibility:hidden;&nbsp;&nbsp;'/></div>";
            }
        }
        $("#storylines").append(content).collapsibleset('refresh');
    }
    if (localStorage.getItem("currentStoryline") != null) {
        var hiddenResume = $("#resume" + localStorage.getItem("currentStoryline"));
        hiddenResume.css("visibility","visible");
    }
    $("#storylineSelect").text(tools.getLocalization(translation, ['storyline', 'selectStoryline']));

}

function previewStoryline(storylineID) {
    localStorage.setItem("previewStoryline", storylineID);
    location.replace("storyline_index.html");
}

function startStoryline(storylineID) {
    localStorage.removeItem("previewStoryline");
    if (localStorage.getItem("currentStoryline") != storylineID && localStorage.getItem("currentStoryline") != null) {
        jsBridge.confirmPopup(storylineID);
    }
    else {
    localStorage.setItem("currentStoryline", storylineID);
        window.location.replace("storyline_index.html");
    }
}

function resumeStoryline(storylineID) {
    localStorage.removeItem("previewStoryline");
    window.location.replace("storyline_index.html");
}