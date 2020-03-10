let usericon = document.querySelector(".userico")
       
window.addEventListener("click",function(){
    
    let clickeduser = usericon.contains(event.target)
    

    if(!clickeduser){
        document.getElementsByClassName("user_options")[0].style.display = "none";
        z=0;
    }
    else{
        
        if (z % 2 == 0) {
            document.getElementsByClassName("user_options")[0].style.display = "block";
            z++;
            
        } else {
            document.getElementsByClassName("user_options")[0].style.display = "none";
            z--;
            
        }
    }
})
