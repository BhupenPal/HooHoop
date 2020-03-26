let z = 0;

function activate(j) {
  var x = document.getElementsByClassName("list_item");

  for (i = 0; i < 4; i++) {
    x[i].classList.remove("list_active");
  }
  x[j].classList.add("list_active");

  document.getElementById("BodyTypeSelector").innerHTML = x[j].innerHTML;
}

function scrolldiv(j, k) {
  let x = document.getElementsByClassName("cd_content")[k];
  if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10) {
    x.scrollBy(-380, 0);
  } else {
    x.scrollBy(380, 0);
  }
}

function tabselect(j) {
  let x = document.getElementsByClassName("tabs");

  for (r = 0; r < 3; r++) {
    x[r].classList.remove("active-tab");;
  }

  x[j].classList.add("active-tab");

  let y = document.getElementsByClassName("p-body");

  for (r = 0; r < 3; r++) {
    y[r].classList.add("vanish");
  }

  y[j].classList.remove("vanish");
}

let filOptions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
function foption(j) {
  if (filOptions[j] == 0) {
    let x = document.getElementsByClassName("Filter_class")[j].lastChild;
    let y = document.getElementsByClassName("filter_option");
    let z = document.getElementsByClassName("foption_encloser");

    x.style.transform = "rotate(90deg)";
    z[j].style.display = "block";
    for (p = 0; p < 9; p++) {
      y[p].classList.remove("opened_filter");
    }
    y[j].classList.add("opened_filter");
    filOptions[j] = 1;
  } else {
    let x = document.getElementsByClassName("Filter_class")[j].lastChild;
    let y = document.getElementsByClassName("filter_option");
    let z = document.getElementsByClassName("foption_encloser");

    x.style.transform = "rotate(0deg)";
    z[j].style.display = "none";
    y[j].classList.remove("opened_filter");
    filOptions[j] = 0;
  }
}
// Preview IMages removed
function intext(j) {
  if (j == 1) {
    document.getElementsByClassName("panoviewer-container")[0].style.zIndex =
      "30";
    document.getElementsByClassName("exterior_slider")[0].style.zIndex = "10";
  }
  if (j == 2) {
    document.getElementsByClassName("exterior_slider")[0].style.zIndex = "30";
    document.getElementsByClassName("panoviewer-container")[0].style.display =
      "10";
  }
}

function onESC(){
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        del_lstng(false)
        sell_listed(false)
        pending_done(false)
    }
};
}

function del_lstng(j){
  if(j){
    document.getElementById('adDelete').value = j.value;
    document.getElementById('modalchange_1').setAttribute('formaction' , j.dataset.host)
    document.getElementsByClassName("Modal")[0].style.display = "block"
    document.getElementsByTagName("html")[0].style.overflow = "hidden"
  }
  else{
    document.getElementsByClassName("Modal")[0].style.display = "none"
    document.getElementsByTagName("html")[0].removeAttribute("style")
  }
  onESC()
}

  function sell_listed(j){
  if(j){
    document.getElementById('adSOLD').value = j.value;
    document.getElementById('modalchange_2').setAttribute('formaction' , j.dataset.host)
    document.getElementsByClassName("Modal")[1].style.display = "block"
    document.getElementsByTagName("html")[0].style.overflow = "hidden"
  }
  else{
    document.getElementsByClassName("Modal")[1].style.display = "none"
    document.getElementsByTagName("html")[0].removeAttribute("style")
  }
  onESC()
}

function pending_done(j){
  if(j){
    document.getElementById('Pending_done').value = j.value;
    document.getElementById('modalchange_3').setAttribute('formaction' , j.dataset.host)
    document.getElementsByClassName("Modal")[2].style.display = "block"
    document.getElementsByTagName("html")[0].style.overflow = "hidden"
  }
  else{
    document.getElementsByClassName("Modal")[2].style.display = "none"
    document.getElementsByTagName("html")[0].removeAttribute("style")
  }
  onESC()
}

function previewname(x) {
  x.addEventListener("change", async function(evt) {
    var file = await evt.target.files[0];
    document.getElementById(x.name).innerHTML = file.name;
  });
}

function showsl(j) {
  if (j == 1) {
    document.getElementById("INTSELECT").style.display = "block";
    document.getElementById("INTSELECT").style.zIndex = "40";
  } else {
    document.getElementById("INTSELECT").style.display = "none";
    document.getElementById("INTSELECT").style.zIndex = "0";
  }
}

function showform(){
  document.getElementById("SELL-FORM-SUB").classList.remove("vanish")
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

