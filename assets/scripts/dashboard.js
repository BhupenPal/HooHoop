let dashParam = window.location.href.split("/")[5];
if(dashParam.includes('?')){
  dashParam = dashParam.split('?')[0];
}
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
  else if(dashParam == "No-deal-requests"){
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
  else if(dashParam == "No-deal-requests"){
    soptclass[5].classList.add("selected_sopt")
  }
  else if(dashParam == "profile"){
    soptclass[0].classList.add("selected_sopt")
  }  
}