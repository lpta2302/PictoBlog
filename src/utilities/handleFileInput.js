export default function loadURLToInputFiled(
  url,
  ref
) {
  getImgURL(url, ref, (imgBlob, ref) => {
    // Load img blob to input
    // WIP: UTF8 character error
    let fileName = "hasFilename.jpg";
    let file = new File(
      [imgBlob],
      fileName,
      {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      },
      "utf-8"
    );
    let container = new DataTransfer();
    container.items.add(file);
    ref.files = container.files;
  });
}
// xmlHTTP return blob respond
function getImgURL(url, ref, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(xhr.response, ref);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}
