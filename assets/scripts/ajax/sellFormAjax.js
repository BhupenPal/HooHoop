const uploadForm = document.getElementById("uploadForm");
const videoFile = document.getElementById("ExteriorInp");
const progressBarFill = document.getElementById("progress-bar-fill");
const progressBarText = document.getElementById("progress-bar-text");

uploadForm.addEventListener("submit", uploadData);

function uploadData(e) {
  e.preventDefault();

  if (
    document.getElementsByName("Price")[0].value -
      document.getElementsByName("minPrice")[0].value <
    300
  ) {
    document.getElementById("PriceIndicator").innerHTML =
      "There should be a minimum of $300 price difference";
    return;
  } else {
    document.getElementById("PriceIndicator").innerHTML = "";
  }

  document.getElementById("uploadFormSubmit").disabled = true;
  let PlateCheck = document.getElementById("vinExchange").value;
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/car-submit/submit", true);
  xhr.setRequestHeader("platecheck", `${PlateCheck}`);
  xhr.upload.addEventListener("progress", e => {
    const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
    progressBarFill.style.width = percent.toFixed(2) + "%";
    progressBarText.textContent = percent.toFixed(2) + "%";
    progressBarText.style.left = "60%";
  });

  xhr.addEventListener("load", function() {
    document.body.style.cursor = "progress";
    if (xhr.status == 200) {
      if (xhr.response == "Done") {
        window.location.href = "/my-ads";
        document.body.style.cursor = "normal";
      } else {
        console.log("ERROR");
      }
    }
  });

  xhr.send(new FormData(uploadForm));
}

monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const fillDates = () => {
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getFullYear();

  let dateToAdd = "";

  for (var i = 0; i < 12; i++) {
    dateToAdd += `<option value="${monthNames[currentMonth]} ${currentYear}"> ${monthNames[currentMonth]} ${currentYear} </option>`;
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
    }
  }

  document.getElementById("wofsib").insertAdjacentHTML("afterend", dateToAdd);
  document.getElementById("regsib").insertAdjacentHTML("afterend", dateToAdd);
};
fillDates();
