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
  let y = x.querySelector("a")
  if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10) {
    x.scrollBy(-y.clientWidth-40, 0);
  } else {
    x.scrollBy(y.clientWidth+40, 0);
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

function foption(j) {
  let y = j.parentNode;
  let x = j.lastChild;
  let z = y.children
;
  for(var i = 0; i < 9; i++){
    if(!y.classList.contains("opened_filter")){
      document.getElementsByClassName('filter_option')[i].classList.remove("opened_filter");
      document.getElementsByClassName("foption_encloser")[i].style.display = 'none';
      document.getElementsByClassName('Filter_class')[i].children[1].style.transform = "rotate(0deg)"
    }
  }

    if(y.classList.contains("opened_filter")){
      y.classList.remove("opened_filter")
      x.style.transform = "rotate(0deg)"
      z[1].style.display = "none"
    }

    else{
      y.classList.add("opened_filter")
      x.style.transform = "rotate(90deg)"
      z[1].style.display = "block"
    }
    
  }

// Preview IMages removed
function intext(j) {
  if (j == 1) {
    document.getElementsByClassName("panoviewer-container")[0].style.zIndex =
      "1002";
    document.getElementsByClassName("exterior_slider")[0].style.zIndex = "1000";
  }
  if (j == 2) {
    document.getElementsByClassName("exterior_slider")[0].style.zIndex = "1002";
    document.getElementsByClassName("panoviewer-container")[0].style.display =
      "1000";
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
    let labelc = x.parentNode.children[0]
    labelc.style.backgroundColor = "#f5bf2b"
  });
}

function showsl(j) {
  if (j == 1) {
    document.getElementById("INTSELECT").style.display = "block";
    document.getElementById("INTSELECT").style.zIndex = "1003";
  } else {
    document.getElementById("INTSELECT").style.display = "none";
    document.getElementById("INTSELECT").style.zIndex = "0";
  }
}

function showform(){
  let target = document.getElementById("SELL-FORM-SUB")
  target.classList.remove("vanish")
  window.scrollTo(0,target.offsetTop)
}

function mobilefilview(){
  let x = document.querySelector(".filter")
  let y = document.getElementById("mobile_fil")

  let state = y.getAttribute("data-state")

  if(state == "open"){
    y.setAttribute("data-state","close")
    x.style.display = "none"
    y.style.transform = "rotate(0deg)"
    return
  }
  else{
    y.setAttribute("data-state","open")
    x.style.display = "block"
    y.style.transform = "rotate(90deg)"
    return
  }
}