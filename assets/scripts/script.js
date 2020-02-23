let i = 0;
let z = 0;

function activate(j) {
  var x = document.getElementsByClassName("list_item");

  for (i = 0; i < 4; i++) {
    x[i].classList.remove("list_active");
  }
  x[j].classList.add("list_active");

  document.getElementById("BodyTypeSelector").innerHTML = x[j].innerHTML;
}

function scrolldiv(j,k) {
  let x = document.getElementsByClassName("cd_content")[k];
  if (j == 0 || j==2 || j==4) {
    x.scrollBy(-380, 0);
  } else {
    x.scrollBy(380, 0);
  }
}

function scrollext(j){
  let x = document.getElementsByClassName("exterior_slider")[0]
  if(j==1){
    x.scrollBy(-900,0)
  }
  else{
    x.scrollBy(900,0)
  }
}

function tabselect(j) {
  let x = document.getElementsByClassName("tabs");

  for (r = 0; r < 3; r++) {
    x[r].classList.remove("active-tab");
  }

  x[j].classList.add("active-tab");

  let y = document.getElementsByClassName("p-body");

  for (r = 0; r < 3; r++) {
    y[r].classList.add("vanish");
  }

  y[j].classList.remove("vanish");
}

function userinfo() {
  if (z % 2 == 0) {
    document.getElementsByClassName("user_options")[0].style.display = "block";
    z++;
  } else {
    document.getElementsByClassName("user_options")[0].style.display = "none";
    z--;
  }
}

let filOptions = [0,0,0,0,0,0,0,0,0];
function foption(j){

  if(filOptions[j]==0){
    let x = document.getElementsByClassName("Filter_class")[j].lastChild
    let y = document.getElementsByClassName("filter_option")
    let z = document.getElementsByClassName("foption_encloser")

    x.style.transform = "rotate(90deg)";
    z[j].style.display = "block";
    for(p=0;p<9;p++){
      y[p].classList.remove("opened_filter")
    }
    y[j].classList.add("opened_filter");
    filOptions[j] = 1
  }

  else{
    let x = document.getElementsByClassName("Filter_class")[j].lastChild
    let y = document.getElementsByClassName("filter_option");
    let z = document.getElementsByClassName("foption_encloser");

    x.style.transform = "rotate(0deg)";
    z[j].style.display = "none";
    y[j].classList.remove("opened_filter");
    filOptions[j] = 0
  }
  console.log(n)
}


function previewImages() {

  var preview = document.querySelector('#preview');
  
  if (this.files) {
    [].forEach.call(this.files, readAndPreview);
  }

  function readAndPreview(file) {

    // Make sure `file.name` matches our extensions criteria
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
      return alert(file.name + " is not an image");
    } // else...
    
    var reader = new FileReader();
    
    reader.addEventListener("load", function(){
      var image = new Image();
      image.height = 100;
      image.title  = file.name;
      image.src    = this.result;
      image.classList.add('thumbnail-options')
      image.onclick = (() => {
        document.getElementById('up_clickfk').value = image.title;
        var thumbs = document.getElementsByClassName('thumbnail-options');
        var l = 0;
        while(thumbs[l]){
          thumbs[l].classList.remove('thumb-selected')
          l++;
        }
        image.classList.add('thumb-selected');
    })
      preview.appendChild(image);
    });
    reader.readAsDataURL(file);
  }

}

document.querySelector('#Exterior').addEventListener("change", previewImages);

function oncall(){
  console.log(document.getElementsByClassName("foption")[0].innerHTML.split("<")[0])
}