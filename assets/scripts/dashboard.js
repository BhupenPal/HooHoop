let dashoption = document.getElementsByClassName("fet_det")
let sopt = document.getElementsByClassName("sopt")

for(var m=0;m<sopt.length-1;m++){
  sopt[m].addEventListener("click",function(){
    for(var n=0;n<sopt.length-1;n++){
      sopt[n].classList.remove("selected_sopt")
    }
    this.classList.add("selected_sopt")
    console.log(this.classList.item(0))
  })
}