function init() {
    for (var i = 1, l = DATA.storyline.length; i <= l; i++) {
        var storylineID = DATA.storyline[i - 1].id + "";
        var content = "<div data-role='collapsible' id='storyline" + i + "'><h3>" + DATA.storyline[(i - 1)].title[0].title + "</h3><p>" + DATA.storyline[(i - 1)].description[0].description + "</p><br><input type='submit' value='Start' onclick='startStoryline(\"" + storylineID + "\")' style='background-color:rgba(61,139,255,1); color:white; border-radius:2px; border-color:rgba(61,139,255,1);'/>&nbsp;&nbsp;<input type='submit' value='Preview' onclick='previewStoryline(\"" + storylineID + "\")' style='background-color:rgba(61,139,255,1); color:white; border-radius:2px; border-color:rgba(61,139,255,1);'/>&nbsp;&nbsp;<input type='submit' id = 'resume" + storylineID + "' value='Resume' onclick='resumeStoryline(" + storylineID + ")' style='background-color:rgba(61,139,255,1); color:white; border-radius:2px; border-color:rgba(61,139,255,1); visibility:hidden;&nbsp;&nbsp;'/></div>";
        $("#storylines").append(content).collapsibleset('refresh');
    }
    if (localStorage.getItem("currentStoryline") != null) {
        var hiddenResume = $("#resume" + localStorage.getItem("currentStoryline"));
        hiddenResume.css("visibility","visible");
    }
}

function previewStoryline(storylineID) {
    localStorage.setItem("currentStoryline", storylineID);
    location.replace("storyline_index.html");
}

function startStoryline(storylineID) {
    if (localStorage.getItem("currentStoryline") != storylineID && localStorage.getItem("currentStoryline") != null)
        jsBridge.confirmPopup(storylineID);
    else {
        localStorage.setItem("currentStoryline", storylineID);
        localStorage.setItem("startIsSelected", "true");
        window.location.replace("storyline_index.html");
    }
}

function resumeStoryline(storylineID) {
    window.location.replace("storyline_index.html");
}
