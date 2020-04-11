const uploadForm = document.getElementById("uploadForm");
const videoFile = document.getElementById("ExteriorInp");
const progressBarFill = document.getElementById("progress-bar-fill");
const progressBarText = document.getElementById("progress-bar-text");
let errorFromEnd = null;

uploadForm.addEventListener("submit", uploadData);

function uploadData() {
  event.preventDefault();

  if (
    document.getElementsByName("Price")[0].value -
      document.getElementsByName("minPrice")[0].value <
    300
  ) {
    document.getElementById("PriceIndicator").innerHTML =
      "There should be a minimum of $300 price difference";
      window.scrollTo(0,document.getElementById("PriceIndicator").offsetTop)
    return;
  }

  document.getElementById("uploadFormSubmit").disabled = true;
  let PlateCheck = document.getElementById("vinExchange").value;

  const xhr = new XMLHttpRequest();

  xhr.open("POST", "/sell-car/submit", true);
  xhr.setRequestHeader("platecheck", `${PlateCheck}`);

  xhr.upload.addEventListener("progress", (e) => {
    const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
    progressBarFill.style.width = percent.toFixed(2) + "%";
    progressBarText.textContent = percent.toFixed(2) + "%";
    progressBarText.style.left = "60%";
  });

  xhr.addEventListener("load", function () {
    document.body.style.cursor = "progress";
    if (xhr.status == 200) {
      if (xhr.response == "CAR UPLOADED SUCCESSFULLY") {
        window.location.replace("/user/ads/");
        document.body.style.cursor = "normal";
      } else if(xhr.response == "CAR ALREADY EXISTS"){
        document.getElementById("PriceIndicator").innerHTML = "The car you are trying to upload, already exists";
        window.scrollTo(0,document.getElementById("PriceIndicator").offsetTop)
      } else {
        errorFromEnd = xhr.response;
        console.log("CAR UPLOAD FAILED " + errorFromEnd);
      }
    }
  });

  xhr.send(new FormData(uploadForm));
}
