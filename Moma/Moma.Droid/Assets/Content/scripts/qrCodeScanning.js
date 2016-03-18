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
