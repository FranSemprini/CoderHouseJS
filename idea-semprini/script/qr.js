var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: undefined, aspectRatio:1, focusMode:"continuous",formatsToSupport:exchange_scannerFormats,advanced:[{zoom:isMobile.Android ? 1.5 : 2.0}],experimentalFeatures:{useBarCodeDetectorIfSupported:true}});
        
onScanSuccess = (decodedText, decodedResult) => {
    let barcode = ``
    barcode = document.querySelector(`.barcodeToBeScanned`)
    barcode.value = decodedText
    barcode.dispatchEvent(new Event("change"))
    html5QrcodeScanner.clear();
    cerrarCamara()
}

closeQr = document.querySelector(`#closeQr`)
closeQr.addEventListener(`click`, () => {
    cerrarCamara()
})

