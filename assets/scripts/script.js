let z = 0;

function activate(j) {
  var x = document.getElementsByClassName("list_item");

  for (i = 0; i < 4; i++) {
    x[i].classList.remove("list_active");
  }
  x[j].classList.add("list_active");

  document.getElementById("BodyTypeSelector").innerHTML = x[j].innerHTML;
}

function scrolldiv(j,k) {
  let x = document.getElementsByClassName("cd_content")[k];
  if (j == 0 || j==2 || j==4) {
    x.scrollBy(-380, 0);
  } else {
    x.scrollBy(380, 0);
  }
}

function tabselect(j) {
  let x = document.getElementsByClassName("tabs");

  for (r = 0; r < 3; r++) {
    x[r].classList.remove("active-tab");
  }

  x[j].classList.add("active-tab");

  let y = document.getElementsByClassName("p-body");

  for (r = 0; r < 3; r++) {
    y[r].classList.add("vanish");
  }

  y[j].classList.remove("vanish");
}


let filOptions = [0,0,0,0,0,0,0,0,0];
function foption(j){

  if(filOptions[j]==0){
    let x = document.getElementsByClassName("Filter_class")[j].lastChild
    let y = document.getElementsByClassName("filter_option")
    let z = document.getElementsByClassName("foption_encloser")

    x.style.transform = "rotate(90deg)";
    z[j].style.display = "block";
    for(p=0;p<9;p++){
      y[p].classList.remove("opened_filter")
    }
    y[j].classList.add("opened_filter");
    filOptions[j] = 1
  }

  else{
    let x = document.getElementsByClassName("Filter_class")[j].lastChild
    let y = document.getElementsByClassName("filter_option");
    let z = document.getElementsByClassName("foption_encloser");

    x.style.transform = "rotate(0deg)";
    z[j].style.display = "none";
    y[j].classList.remove("opened_filter");
    filOptions[j] = 0
  }
}
// Preview IMages removed
function intext(j){
  if(j==1){
    document.getElementsByClassName("panoviewer-container")[0].style.zIndex = "30"
    document.getElementsByClassName("exterior_slider")[0].style.zIndex = "10"
  }
  if(j==2){
    document.getElementsByClassName("exterior_slider")[0].style.zIndex = "30"
    document.getElementsByClassName("panoviewer-container")[0].style.display = "10"
  }
 
}

function del_lstng(j){
  if(j){
    document.getElementById('adDelete').value = j.value;
    document.getElementsByClassName("Modal")[0].style.display = "block"
  }
  else{
    document.getElementsByClassName("Modal")[0].style.display = "none"
  }
}

function showpop(j){
  if(j==1){
    document.getElementsByClassName("edit_pic")[0].classList.remove("vanish")
  }

  else{
    document.getElementsByClassName("edit_pic")[0].classList.add("vanish")
  }
}

  function sell_listed(j){
  if(j){
    document.getElementById('adSOLD').value = j.value;
    document.getElementsByClassName("Modal")[1].style.display = "block"
  }
  else{
    document.getElementsByClassName("Modal")[1].style.display = "none"
  }
}

let p=0
function Pagination(j){
  let x = document.getElementsByClassName("Page_no")

  if(j==1){
    for(var k=0;k<x.length;k++){
      x[k].classList.remove("page_sel")
    }
    
    if(p<5) p++
    if(p==5) p=0

    x[p].classList.add("page_sel")
    console.log(p)
  }

  if(j==2){
    for(var k=0;k<x.length;k++){
      x[k].classList.remove("page_sel")
    }

    if(p==0||p>0) p--
    if(p<0) p=4

    x[p].classList.add("page_sel")
    console.log(p)
  }
}

function Page_select(j){
  let x = document.getElementsByClassName("Page_no")

  for(var k=0;k<x.length;k++){
    x[k].classList.remove("page_sel")
  }

  j.classList.add("page_sel")
  p = j.innerHTML -1;
}

function previewname(x){

  x.addEventListener("change",function(evt){
    var file = evt.target.files[0];
    console.log(x.name)
    document.getElementById(x.name).innerHTML = file.name
  })
}

function showsl(j){
  if(j==1){
    document.getElementById("INTSELECT").style.display = "block"
    document.getElementById("INTSELECT").style.zIndex = '40'
  }
  else{
    document.getElementById("INTSELECT").style.display = "none"
    document.getElementById("INTSELECT").style.zIndex = '0'
  }
}

const pageParams = parseInt(window.location.href.split('/')[4].split('?')[0]);

if(pageParams == 1){
  document.getElementById("previous").disabled = true;
}

if(pageParams == 10){
  document.getElementById("previous").disabled = true;
} 

function onPrev(){
    window.location.href = `http://localhost:8080/search-car/${pageParams - 1}`
}

function onNext(){
    window.location.href = `http://localhost:8080/search-car/${pageParams + 1}`
}