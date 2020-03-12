function myListHandle(){

    // const pageParams = window.location.href.split('/')[4].split('?')[0];

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `dashboard/mylistings`, true);
    xhr.getResponseHeader("content-type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.onload = function() {
      if (this.status === 200) {
        myListings(this.response)
      } else {
        console.log("Some error occured");
      }
    };

    xhr.send();
}

myListings = list => {
    json = JSON.parse(list);
    let output = '';

    for(inc = 0; inc < json.list.length; inc++){
        console.log(json.list[inc])
        output += `\               
        <tr>\
        <td>${inc + 1}</td>\
        <td><img src="/assets/Uploads/${json.list[inc].vinNum}/exterior/Photo_1.jpg" style="height:30px;width:30px"></td>\
        <td>${json.list[inc].Make}</td>\
        <td>${json.list[inc].Model}</td>\
        <td>${json.list[inc].adActive}</td>\
        <td><button>Delete</button></td>\
      </tr>`
    }

    document.getElementById("listeer").insertAdjacentHTML("afterend", output);
}

myListHandle();