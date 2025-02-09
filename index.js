// #textData
// #genNow
// #loader
// #genneed
// #showQR
// #qrDownloadBtn
var genbtn = document.querySelector("#genNow");
var textareaData = document.querySelector("#textData");
var loader = document.querySelector("#loader");
var downloadBtn = document.querySelector("#qrDownloadBtn");
//var qrImg = document.querySelector("#showQR");

genbtn.addEventListener("click", () => {
  genbtn.style.display = 'none';
  loader.style.display = 'flex';
  textareaData.disabled = true;
  let textData = textareaData.value;
  if(!textData || textData.trim() === ""){
    displayReset();
    return textareaData.focus();
  }
  fetchQr(textData);
});

function displayReset() {
  genbtn.style.display = 'block';
  loader.style.display = 'none'
  textareaData.disabled = false;
  window.location.href='#genneed';
}
fetchQr("https://tool-sphere.github.io/tools/qr-code-generator/");
function fetchQr(data) {
  document.querySelector(".qr-code-a").innerHTML = "";
var qrcode = new QRCode(document.querySelector(".qr-code-a"), {
        text: data,
        width: 180, //128
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
console.log(qrcode);
setTimeout(() => {
  displayReset();
}, 2000);
}

document.querySelector("#qrDownloadBtn").addEventListener("click", () => {
  try {
  var data = document.querySelector("canvas").toDataURL();
  if(!data) return;
  console.log(data);
downloadBase64Image(data, 'generated-qr-code.png');
  }catch{}
});

function downloadBase64Image(base64Data, filename) {
    // Convert the Base64 string to a Uint8Array
    var binaryImg = atob(base64Data.split(',')[1]);
    var len = binaryImg.length;
    var buffer = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        buffer[i] = binaryImg.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    var blob = new Blob([buffer], { type: 'image/png' }); // Adjust the MIME type as needed (e.g., image/jpeg)

    // Create a temporary anchor element
    var url = window.URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Append the anchor element to the body
    document.body.appendChild(link);

    // Programmatically trigger the download
    link.click();

    // Clean up: remove the anchor element and revoke the URL object
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

