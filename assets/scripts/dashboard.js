let dashoption = document.getElementsByClassName("fet_det")
let sopt = document.getElementsByClassName("sopt")

console.log(dashoption.length)
console.log(sopt.length)

for(let m=0; m<sopt.length - 1; m++){
  sopt[m].addEventListener("click",function(){
    for(let n=0; n<sopt.length - 1; n++){
    dashoption[n].classList.add('vanish')
      if(sopt[n].classList.contains('selected_sopt')){
        sopt[n].classList.remove('selected_sopt')
        dashoption[n].classList.remove('vanish')
      }
    }
    this.classList.add('selected_sopt')
    this.click()
  })
}

let clienttable = document.getElementsByClassName("client_table")
let clientmopt = document.getElementsByClassName("Paneopt")

for(var s=0; s<clientmopt.length;s++){
  clientmopt[s].addEventListener("click", function(){
    for(let n=0;n<clientmopt.length;n++){
      clienttable[n].classList.add("vanish")
      if(clientmopt[n].classList.contains("selected_paneopt")){
        clientmopt[n].classList.remove("selected_paneopt")
        clienttable[n].classList.remove("vanish")
      }
    }
    this.classList.add("selected_paneopt")
    this.click()
  })
}