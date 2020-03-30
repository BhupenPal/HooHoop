const dashParam = window.location.href.split("/")[4];
let soptclass = document.getElementsByClassName("sopt")

if(soptclass.length === 10){
  if(dashParam == "account"){
    soptclass[1].classList.add("selected_sopt")
  }
  else if(dashParam == "listings"){
    soptclass[2].classList.add("selected_sopt")
  }
  else if(dashParam == "all-listings"){
    soptclass[3].classList.add("selected_sopt")
  }
  else if(dashParam == "client-management"){
    soptclass[5].classList.add("selected_sopt")
  }
  else if(dashParam == "all-client-management"){
    soptclass[6].classList.add("selected_sopt")
  }
  else if(dashParam == "user-management"){
    soptclass[4].classList.add("selected_sopt")
  }
  else if(dashParam == "offers"){
    soptclass[7].classList.add("selected_sopt")
  }
  else if(dashParam == "trade-requests"){
    soptclass[8].classList.add("selected_sopt")
  }
  else if(dashParam == "profile"){
    soptclass[0].classList.add("selected_sopt")
  }  
}
else{
  if(dashParam == "account"){
    soptclass[1].classList.add("selected_sopt")
  }
  else if(dashParam == "listings"){
    soptclass[2].classList.add("selected_sopt")
  }
  else if(dashParam == "client-management"){
    soptclass[3].classList.add("selected_sopt")
  }
  else if(dashParam == "offers"){
    soptclass[4].classList.add("selected_sopt")
  }
  else if(dashParam == "profile"){
    soptclass[0].classList.add("selected_sopt")
  }  
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

let clienttable2 = document.getElementsByClassName("client_table-2")
let clientmopt2 = document.getElementsByClassName("Paneopt-2")

for(var s=0; s<clientmopt2.length;s++){
  clientmopt2[s].addEventListener("click", function(){
    for(let n=0;n<clientmopt2.length;n++){
      clienttable2[n].classList.add("vanish")
      if(clientmopt2[n].classList.contains("selected_paneopt-2")){
        clientmopt2[n].classList.remove("selected_paneopt-2")
        clienttable2[n].classList.remove("vanish")
      }
    }
    this.classList.add("selected_paneopt-2")
    this.click()
  })
}