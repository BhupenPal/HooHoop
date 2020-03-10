let flash_close = document.getElementsByClassName("close")

for(var r=0;r<flash_close.length;r++){
    flash_close[r].addEventListener("click",function(){
        this.parentElement.style.display = "none"
    })
}