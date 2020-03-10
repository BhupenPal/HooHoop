let x = document.getElementsByClassName("select")
let y = document.getElementsByClassName("opt_enclose");

var i = "closed";
  
  for(p==0;p<x.length;p++){
    x[p].addEventListener("click",function(){
      console.log(this)
    })
  }

window.addEventListener("click",function sld_unsld(){
  for(var k=0;k<x.length;k++){
    let isclicked = x[k].contains(event.target)
    if(!isclicked){
      x[k].removeAttribute("style")
      y[k].removeAttribute("style")
      let z = document.getElementsByClassName("select_opener")[k];
      let arr_change = z.getElementsByClassName("arr");
      arr_change[0].removeAttribute("style");
      arr_change[1].removeAttribute("style");
      i="closed"
    }
    else{
      callselect(k)
    }
  }
})
  
  function callselect(j){

      let z = document.getElementsByClassName("select_opener")[j];
      let arr_change = z.getElementsByClassName("arr");
    console.log(i)
    if(i=="closed"){
      x[j].style.border = "#43b4ff 2px solid";
      y[j].style.display = "block";
      arr_change[0].style.backgroundColor = "#43b4ff";
      arr_change[0].style.transform =
        "rotate(-45deg) translate3d(12px,12px,0)";
      arr_change[1].style.backgroundColor = "#43b4ff";
      arr_change[1].style.transform =
        "rotate(45deg) translate3d(1.5px,-1px,0)";  
        i="opened";
        console.log(i)
      } 
    else{
      x[j].removeAttribute("style");
      y[j].removeAttribute("style");
      arr_change[0].removeAttribute("style");
      arr_change[1].removeAttribute("style");
      i="closed"
    }
  }
  
  function opt_select(k, j) {
    let x = document
      .getElementsByClassName("select")
      [j].getElementsByClassName("option")[k];
    // let x = document.getElementsByClassName("option")[k];
    let y = document.getElementsByClassName("placeholder_text")[j];
    let z = document.getElementsByClassName("select-input")[j];
  
    y.innerHTML = x.innerHTML;
    z.value = x.innerHTML;
    i = 0;
  }
  