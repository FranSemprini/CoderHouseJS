var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: undefined, aspectRatio:2, focusMode:"continuous",experimentalFeatures:{useBarCodeDetectorIfSupported:true}});
        
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

