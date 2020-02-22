let filter = document.getElementById("filter");
filter.addEventListener("click", filterResultHandler(event));

function filterResultHandler(event) {
//   event.preventDefault();
//   event.stopPropogation();
  console.log("You have clicked the fetchBtn");

  // Instantiate an xhr object
  const xhr = new XMLHttpRequest();

  // Open the object
  // xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', true);

  // USE THIS FOR POST REQUEST
  xhr.open("POST", "http://dummy.restapiexample.com/api/v1/create", true);
  xhr.getResponseHeader("Content-type", "application/json");

  // What to do on progress (optional)
  xhr.onprogress = function() {
    console.log("On progress");
  };

  // xhr.onreadystatechange = function () {
  //     console.log('ready state is ', xhr.readyState);

  // }

  // What to do when response is ready
  xhr.onload = function() {
    if (this.status === 200) {
      console.log(this.responseText);
    } else {
      console.log("Some error occured");
    }
  };

  // send the request
  params = `{"name":"test34sad545","salary":"123","age":"23"}`;
  xhr.send(params);

  console.log("We are done!");
}
