 
let hamburger = document.querySelector(".hamburger")
let hamstatus = "before"

hamburger.addEventListener("click",function ham(){
  
  let sidebar = document.querySelector(".sidebar")

  if(hamstatus == "before"){
    sidebar.style.width = "300px";
    hamburger.children.item(0).style.transform = "rotate(-45deg) translateX(-10px) translateY(5px)"
    hamburger.children.item(1).style.transform = "scale(0)"
    hamburger.children.item(2).style.transform = "rotate(45deg) translateX(-10px) translateY(-5px)"
    hamstatus = "after"
  }
  else{
    sidebar.style.width = "50px"
    hamburger.children.item(0).style.transform = "rotate(0) translateX(0) translateY(0)"
    hamburger.children.item(1).style.transform = "scale(1)"
    hamburger.children.item(2).style.transform = "rotate(0) translateX(0) translateY(0)"
    hamstatus = "before"
  }
})