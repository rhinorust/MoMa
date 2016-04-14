var qrCodeNum = 1;

function qrCodeScanBtn() {
    jsBridge.ScanQRCode();
}
function showQRText(text) {
    if (text != "") {

        var boxTitle = "QR CODE " +qrCodeNum;
        var boxContent = text;

        poiIBoxTitle.text(boxTitle);
        poiIBoxContent.empty();
        poiIBoxContent.append(boxContent);

        addToMessages({ type: 'QRCode', title: boxTitle, data: boxContent });
       // jsBridge.messageWasRead(boxTitle);
        poiIB.css('visibility', 'visible');
        messageBox.css('visibility', 'hidden');

        qrCodeNum++;
    }
}

/**
function showQRText(text) {
    if (text != "") {
        var title = poiIB.find('#title h1');
        var content = poiIB.find('#content');
        var boxTitle = "QR CODE";
        var boxContent = text;
        poiIBoxTitle.text(boxTitle);
        poiIBoxContent.empty();
        poiIBoxContent.append(boxContent);
        $('#messages').css('visibility', 'hidden');
        poiIB.css('visibility', 'visible');
    }
}
**/
function showFoundQRCodes() {
   
   var num = jsBridge.getQRNumber();
   // var num = 5;
    var src = "";
    var text;

    $("#rank").text(tools.getLocalization(translation, ['scanvengerHunt', 'ranking']));
    $("#numRank").text(tools.getLocalization(translation, ['scanvengerHunt', 'numRank']));
    $("#tableRank").text(tools.getLocalization(translation, ['scanvengerHunt', 'rank']));
    $("#bronze").text(tools.getLocalization(translation, ['scanvengerHunt', 'bronze']));
    $("#silver").text(tools.getLocalization(translation, ['scanvengerHunt', 'silver']));
    $("#gold").text(tools.getLocalization(translation, ['scanvengerHunt', 'gold']));
    $("#platinum").text(tools.getLocalization(translation, ['scanvengerHunt', 'platinum']));




    if (num == 0) {
        $("#qrcodes").text(tools.getLocalization(translation, ['scanvengerHunt', 'noneFound']));
    }
    else {
        $("#qrcodes").html(tools.getLocalization(translation, ['scanvengerHunt', 'found']) + " " + (num + " QR Codes !").bold());
    }

    if (num > 0 && num < 5) {
        var result = 5 - num;
        text = tools.getLocalization(translation, ['scanvengerHunt', 'need']) + result + tools.getLocalization(translation, ['scanvengerHunt', 'reach']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'bronze']) + "!";
    }
    else if (num == 5) {
        text = tools.getLocalization(translation, ['scanvengerHunt', 'congrats']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'bronze']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'level']);
        $("#medalRep").css('visibility', 'visible');
        src=  "images/bronze-medal2.png";
    }
    else if (num > 5 && num < 10) {
        var result = 10 - num;
        text = tools.getLocalization(translation, ['scanvengerHunt', 'need']) + result + tools.getLocalization(translation, ['scanvengerHunt', 'reach']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'silver']) + "!";
    }
    else if (num == 10) {
        text = tools.getLocalization(translation, ['scanvengerHunt', 'congrats']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'silver']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'level']);
        $("#medalRep").css('visibility', 'visible');
        src = "images/silver-medal2.png";
    }
    else if (num > 10 && num < 15) {
        var result = 10 - num;
        text = tools.getLocalization(translation, ['scanvengerHunt', 'need']) + result + tools.getLocalization(translation, ['scanvengerHunt', 'reach']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'gold']) + "!";
    }
    else if (num == 15) {
        text = tools.getLocalization(translation, ['scanvengerHunt', 'congrats']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'gold']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'level']);
        $("#medalRep").css('visibility', 'visible');
        src = "images/gold-medal2.png";
    }
    else if (num > 15 && num < 20) {
        var result = 20 - num;
        text = tools.getLocalization(translation, ['scanvengerHunt', 'need']) + result + tools.getLocalization(translation, ['scanvengerHunt', 'reach']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'platinum']) + "!";
    }
    else if (num >=25)  {
        text = tools.getLocalization(translation, ['scanvengerHunt', 'congrats']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'platinum']) + " " + tools.getLocalization(translation, ['scanvengerHunt', 'level']);
        $("#medalRep").css('visibility', 'visible');
        src = "images/platinum-medal2.png";
    };

    $("#currentRanking").html(text);
    $("#medalRep").attr('src', src);


}
