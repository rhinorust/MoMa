function qrCodeScanBtn() {
    jsBridge.ScanQRCode();
}

function qrCodeTextBtn() {

    jsBridge.showQRCodeText();

    //showQRText('Emile Berliner \n Born in Germany May 20, 1851, he first worked as a printer, then as a clerk in a \n fabric store. It was here that his talent as an inventor first surfaced. He invented a\nnew loom for weaving cloth. Emile Berliner immigrated to the United States in 1870, following the example of a friend. He spent much of his time at the library\nof the Cooper Institute where he took a keen interest in electricity and sound."');
}

function showQRText(text) {
    var title = poiIB.find('#title h1');
    var content = poiIB.find('#content');

    var boxTitle = "QR CODE";
    var boxContent = text;

    title.text(boxTitle);
    content.empty();
    content.append(boxContent);

    poiIB.css('visibility', 'visible');

}