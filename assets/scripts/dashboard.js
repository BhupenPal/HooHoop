let dashoption = document.getElementsByClassName("fet_det");
let sopt = document.getElementsByClassName("sopt");

for (var m = 0; m < sopt.length - 1; m++) {
  sopt[m].addEventListener("click", function() {
    for (var n = 0; n < sopt.length - 1; n++) {
      dashoption[n].classList.add("vanish");
      if (sopt[n].classList.contains("selected_sopt")) {
        sopt[n].classList.remove("selected_sopt");
        dashoption[n + 1].classList.remove("vanish");
      }
    }
    this.classList.add("selected_sopt");
    console.log(this.classList.item(0));
  });
}
