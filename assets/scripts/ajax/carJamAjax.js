let jamForm = document.getElementById('jamFORM');

jamForm.addEventListener('submit', function carJamHandler(){

    event.preventDefault();

    let PlateNo = document.getElementById('vinFigureID').value;
    console.log(PlateNo)
    const xhr = new XMLHttpRequest;
    xhr.open('GET', `/car-submit/data?Plate=${PlateNo}`, true)
    xhr.getResponseHeader("content-type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function() {
        if (this.status === 200) {
          console.log(this.response);
        } else {
          console.log("Some error occured");
        }
      };
    
    xhr.send();
});
