var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
        
function onScanSuccess(decodedText, decodedResult) {
    let barcode = ``
    // Handle on success condition with the decoded text or result. 
    barcode = document.querySelector(`.barcodeToBeScanned`)
    barcode.value = decodedText
    barcode.dispatchEvent(new Event("change"))
    html5QrcodeScanner.clear();
}




