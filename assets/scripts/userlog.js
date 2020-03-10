let usericon = document.querySelector(".userico")
       
window.addEventListener("click",function(){
    
    let clickeduser = usericon.contains(event.target)
    

    if(!clickeduser){
        document.getElementsByClassName("user_options")[0].style.visibility = "hidden";
        document.getElementsByClassName("user_options")[0].style.opacity = 0;
        z=0;
    }
    else{
        
        if (z % 2 == 0) {
            document.getElementsByClassName("user_options")[0].style.visibility = "visible";
            document.getElementsByClassName("user_options")[0].style.opacity = 1;
            z++;
            
        } else {
            document.getElementsByClassName("user_options")[0].style.visibility = "hidden";
            document.getElementsByClassName("user_options")[0].style.opacity = 0;
            z--;
            
        }
    }
})
