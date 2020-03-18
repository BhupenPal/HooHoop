function myListHandle(){
  document.getElementById('myListID').onclick = null;
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
      if(json.list[inc].adActive == "Active"){
        status = `<td class="sold"><button data-host="/my-ads/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Active</button></td>`;
      } else {
        status = `<td class="pending"><button data-host="/my-ads/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Sold</button></td>`;
      }

        output += `\               
        <tr class="user-mylist">\
        <td>${inc + 1}</td>\
        <td><img src="/assets/Uploads/${json.list[inc].vinNum}/exterior/Photo_1.jpg" style="height:30px;width:30px"></td>\
        <td>${json.list[inc].Make}</td>\
        <td>${json.list[inc].Model}</td>\
        <td>${json.list[inc].adActive}</td>\
        ${status}\
        <td class="delete"><button data-host="/my-ads/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
      </tr>`
    }
    document.getElementById("mylist").insertAdjacentHTML("afterend", output);
}

function completeListHandle(){
  document.getElementById('clistID').onclick = null;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/dashboard/complete-list`, true);
    xhr.getResponseHeader("content-type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function() {
      if (this.status === 200) {
        completeListings(this.response)
      } else {
        console.log("Some error occured");
      }
    };
    xhr.send();
}

completeListings = list => {
    json = JSON.parse(list);
    let output = '';

    for(inc = 0; inc < json.list.length; inc++){
      if(json.list[inc].adActive == "Active"){
        status = `<td class="sold"><button data-host="/my-ads/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Active</button></td>`;
      } else {
        status = `<td class="pending"><button data-host="/my-ads/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Sold</button></td>`;
      }
        output += `\               
        <tr class="user-completelist">\
        <td>${inc + 1}</td>\
        <td><img src="/assets/Uploads/${json.list[inc].vinNum}/exterior/Photo_1.jpg" style="height:30px;width:30px"></td>\
        <td>${json.list[inc].Make}</td>\
        <td>${json.list[inc].Model}</td>\
        <td>${json.list[inc].adActive}</td>\
        ${status}\
        <td class="delete"><button data-host="/my-ads/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
      </tr>`
    }

    document.getElementById("completeList").insertAdjacentHTML("afterend", output);
}

function completeUserHandle(){
  document.getElementById('cuserID').onclick = null;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/dashboard/complete-users`, true);
    xhr.getResponseHeader("content-type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function() {
      if (this.status === 200) {
        completeUsers(this.response)
      } else {
        console.log("Some error occured");
      }
    };
    xhr.send();
}

completeUsers = list => {
    json = JSON.parse(list);
    let output = '';
  console.log(json)
    for(inc = 0; inc < json.list.length; inc++){
      if(json.list[inc].active){
        status = "Active"
      }else{
        status = "Not Verified"
      }
        output += `\               
        <tr class="complete-userlist">\
        <td>${inc + 1}</td>\
        <td><img src="/assets/images/robot.png" style="height:30px;width:30px"></td>\
        <td>${json.list[inc].firstName} ${json.list[inc].lastName} </td>\
        <td>${json.list[inc].email}</td>\
        <td>${status}</td>\
        <td class="delete"><button data-host="/dashboard/user/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
      </tr>`
    }
    document.getElementById("completeUsers").insertAdjacentHTML("afterend", output);
}

function testDriveHandle(){
  document.getElementById('testDID').onclick = null;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/testdrives`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      testDrive(this.response)
    } else {
      console.log("Some error occured");
    }
  };
  xhr.send();
}

testDrive = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td class="sold"><button data-host="/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\               
      <tr class="check-testdrive">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].firstName} ${json.list[inc].lastName} </td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank">${json.list[inc].car}</a></td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      ${status}\
      <td class="delete"><button data-host="/dashboard/testdrive/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
    </tr>`
  }
  document.getElementById("testdriveEnq").insertAdjacentHTML("afterend", output);
}

function availabilityHandle(){
  document.getElementById('availID').onclick = null;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/availcheck`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      checkAvailability(this.response)
    } else {
      console.log("Some error occured");
    }
  };
  xhr.send();
}

checkAvailability = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td class="sold"><button data-host="/dashboard/availability/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/availability/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\
      <tr class="check-availability">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].fullName}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank"> ${json.list[inc].car}</a></td>\
      ${status}\
      <td class="delete"><button data-host="/dashboard/availability/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
    </tr>`
  }
  document.getElementById("availabilityEnq").insertAdjacentHTML("afterend", output);
}

function shipHandle(){
  document.getElementById('shipID').onclick = null;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/shipenq`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      shipmentEnquiry(this.response)
    } else {
      console.log("Some error occured");
    }
  };
  xhr.send();
}

shipmentEnquiry = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td class="sold"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\
      <tr class="check-ship">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].fullName}</td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank"> ${json.list[inc].car}</a></td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      <td>${json.list[inc].fromLocation}</td>\
      <td>${json.list[inc].toLocation}</td>\
      <td>${json.list[inc].transportDate}</td>\
      ${status}\
      <td class="delete"><button data-host="/dashboard/shipment/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
    </tr>`
  }
  document.getElementById("ShippingEnq").insertAdjacentHTML("afterend", output);
}

function completeTestDriveHandle(){
  document.getElementById('allClientID').onclick = null;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/testdrives-all`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      completeTestDrive(this.response)
    } else {
      console.log("Some error occured");
    }
  };
  xhr.send();
}

completeTestDrive = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td class="sold"><button data-host="/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\               
      <tr class="check-testdrive">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].firstName} ${json.list[inc].lastName} </td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank">${json.list[inc].car}</a></td>\
      <td>${json.list[inc].carAuthor}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      ${status}\
      <td class="delete"><button data-host="/dashboard/testdrive/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
    </tr>`
  }
  document.getElementById("allTestdriveEnq").insertAdjacentHTML("afterend", output);
}

function completeAvailabilityHandle(){
  document.getElementById('allAvailID').onclick = null;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/availcheck-all`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      completeCheckAvailability(this.response)
    } else {
      console.log("Some error occured");
    }
  };
  xhr.send();
}

completeCheckAvailability = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td class="sold"><button data-host="/dashboard/availability/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/availability/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\
      <tr class="check-availability">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].fullName}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank"> ${json.list[inc].car}</a></td>\
      <td>${json.list[inc].carAuthor}</td>\
      ${status}\
      <td class="delete"><button data-host="/dashboard/availability/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
    </tr>`
  }
  document.getElementById("allAvailabilityEnq").insertAdjacentHTML("afterend", output);
}

function completeShipHandle(){
  document.getElementById('allShipID').onclick = null;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/shipenq-all`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      completeShipmentEnquiry(this.response)
    } else {
      console.log("Some error occured");
    }
  };
  xhr.send();
}

completeShipmentEnquiry = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td class="sold"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\
      <tr class="check-ship">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].fullName}</td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank"> ${json.list[inc].car}</a></td>\
      <td>${json.list[inc].carAuthor}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      <td>${json.list[inc].fromLocation}</td>\
      <td>${json.list[inc].toLocation}</td>\
      <td>${json.list[inc].transportDate}</td>\
      ${status}\
      <td class="delete"><button data-host="/dashboard/shipment/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
    </tr>`
  }
  document.getElementById("allShippingEnq").insertAdjacentHTML("afterend", output);
}