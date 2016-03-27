function qrCodeScanBtn() {
    jsBridge.ScanQRCode();
}

function showQRText(text) {
    if (text != "") {
        var title = poiIB.find('#title h1');
        var content = poiIB.find('#content');

        var boxTitle = "QR CODE";
        var boxContent = text;

        title.text(boxTitle);
        content.empty();
        content.append(boxContent);
        poiIB.css('visibility', 'visible');
    }
}

function showFoundQRCodes() {
   
    var num = jsBridge.getQRNumber();
    //var num = 26;

    var text;

    if (num == 0) {
        $("#qrcodes").text("You have yet to find one QR Code!");
    }
    else {
        $("#qrcodes").html("You have found: " + (num + " QR Codes !").bold());
    }

    if (num > 0 && num < 5) {
        var result = 5 - num;
        text = "You need <b>" + result + "</b> more to reach Bronze!";
    }
    else if (num == 5) {
        text = "Congrats! You have reached the Bronze Level!";
        src=  "images/bronze-medal2.png";
    }
    else if (num > 5 && num < 10) {
        var result = 10 - num;
        text = "You need <b>" + result + "</b> more to reach Silver!";
    }
    else if (num == 10) {
        text = "Congrats! You have reached the Silver Level!";
        src = "images/silver-medal2.png";
    }
    else if (num > 10 && num < 15) {
        var result = 10 - num;
        text = "You need <b>" + result + "</b> more to reach Gold!";
    }
    else if (num == 15) {
        text = "Congrats! You have reached the Gold Level!";
        src = "images/gold-medal2.png";
    }
    else if (num > 15 && num < 20) {
        var result = 20 - num;
        text = "You need <b>" + result + "</b> more to reach Platinum!";
    }
    else  {
        text = "Congrats! You have reached the Platinum Level!";
        src = "images/platinum-medal2.png";
    };

    $("#currentRanking").html(text);
    $("#medalRep").attr('src', src);


}
