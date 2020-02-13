function carinfo() {
  var x = document.getElementById("car_jam");
  x.classList.remove("vanish");
}

var i = 0;

function sld_unsld(j) {
  let x = document.getElementsByClassName("select");
  let y = document.getElementsByClassName("opt_enclose");
  let z = document.getElementsByClassName("select_opener")[j];
  let arr_change = z.getElementsByClassName("arr");

  if (i % 2 == 0) {
    x[j].style.border = "#43b4ff 2px solid";
    y[j].style.display = "block";
    arr_change[0].style.backgroundColor = "#43b4ff";
    arr_change[0].style.transform =
      "rotate(-45deg) translateX(1px) translateY(2px)";
    arr_change[1].style.backgroundColor = "#43b4ff";
    arr_change[1].style.transform =
      "rotate(45deg) translateX(-1.5px) translateY(2.5px)";
    i++;
  } else {
    x[j].removeAttribute("style");
    y[j].removeAttribute("style");
    arr_change[0].removeAttribute("style");
    arr_change[1].removeAttribute("style");
    i--;
  }
}

function opt_select(k, j) {
  let x = document.getElementsByClassName("opt-num-" + j)[k];
  let y = document.getElementsByClassName("placeholder_text")[j];
  let z = document.getElementsByClassName("select-input")[j];

  y.innerHTML = x.innerHTML;
  z.value = x.innerHTML;
}

function activate(j) {
  var x = document.getElementsByClassName("list_item");

  for (i = 0; i < 4; i++) {
    x[i].classList.remove("list_active");
  }
  x[j].classList.add("list_active");
}

function scrolldiv(j) {
  let x = document.getElementsByClassName("cd_content")[0];
  if (j == 0) {
    x.scrollBy(-380, 0);
  } else {
    x.scrollBy(380, 0);
  }
}
