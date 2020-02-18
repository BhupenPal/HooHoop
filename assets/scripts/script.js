let i = 0;
let z = 0;

function sld_unsld(j) {
  let x = document.getElementsByClassName("select");
  let y = document.getElementsByClassName("opt_enclose");
  let z = document.getElementsByClassName("select_opener")[j];
  let arr_change = z.getElementsByClassName("arr");

  window.addEventListener("click", function(event) {
    var isclicked = x[j].contains(event.target);

    if (!isclicked) {
      x[j].removeAttribute("style");
      y[j].removeAttribute("style");
      arr_change[0].removeAttribute("style");
      arr_change[1].removeAttribute("style");
      i = 0;
    } else {
      if (i % 2 == 0) {
        x[j].style.border = "#43b4ff 2px solid";
        y[j].style.display = "block";
        arr_change[0].style.backgroundColor = "#43b4ff";
        arr_change[0].style.transform =
          "rotate(-45deg) translate3d(12px,12px,0)";
        arr_change[1].style.backgroundColor = "#43b4ff";
        arr_change[1].style.transform =
          "rotate(45deg) translate3d(1.5px,-1px,0)";
        i = 1;
      } else {
        x[j].removeAttribute("style");
        y[j].removeAttribute("style");
        arr_change[0].removeAttribute("style");
        arr_change[1].removeAttribute("style");
        i = 0;
      }
    }
  });
}

function opt_select(k, j) {
  let x = document
    .getElementsByClassName("select")
    [j].getElementsByClassName("option")[k];
  // let x = document.getElementsByClassName("option")[k];
  let y = document.getElementsByClassName("placeholder_text")[j];
  let z = document.getElementsByClassName("select-input")[j];

  y.innerHTML = x.innerHTML;
  z.value = x.innerHTML;
  i = 0;
}

function activate(j) {
  var x = document.getElementsByClassName("list_item");

  for (i = 0; i < 4; i++) {
    x[i].classList.remove("list_active");
  }
  x[j].classList.add("list_active");

  document.getElementById("BodyTypeSelector").innerHTML = x[j].innerHTML;
}

function scrolldiv(j) {
  let x = document.getElementsByClassName("cd_content")[0];
  if (j == 0) {
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

function userinfo() {
  if (z % 2 == 0) {
    document.getElementsByClassName("user_options")[0].style.display = "block";
    z++;
  } else {
    document.getElementsByClassName("user_options")[0].style.display = "none";
    z--;
  }
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
  console.log(n)
}
