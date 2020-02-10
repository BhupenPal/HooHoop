function carinfo(){
    var x = document.getElementById("car_jam")
    x.classList.remove("vanish") 
}

var i=0

function sld_unsld(j){
    let x = document.getElementsByClassName("select")
    let y = document.getElementsByClassName("opt_enclose")
    let z = document.getElementsByClassName("arr_1")

    if(i%2==0){
        x[j].style.border = "#43b4ff 2px solid"
        y[j].style.display = "block"
        for(p=0;p<2;p++){
            z[p].style.backgroundColor = "#43b4ff"
        }
        i++
    }

    else{
        x[j].removeAttribute("style")
        y[j].removeAttribute("style")
        for(p=0;p<2;p++){
            z[p].removeAttribute("style")
        }
        i--
    }
}

function opt_select(k,j){
    let x = document.getElementsByClassName("option")
    let y = document.getElementsByClassName("placeholder_text")

        y[j].style.color = "black"
        y[j].innerHTML = x[k].innerHTML
    
}