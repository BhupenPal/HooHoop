function myListHandle(){
  document.getElementById("loader").style.display = "flex";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/user/dashboard/listings/my`, true);
    xhr.getResponseHeader("content-type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function() {
      if (this.status === 200) {
        myListings(this.response)
        document.getElementById("loader").style.display = "none";
      } else {
        console.log("Some error occured");
        document.getElementById("loader").style.display = "none";
      }
    };
    xhr.send();
}

myListings = list => {
    json = JSON.parse(list);
    let output = '';

    for(inc = 0; inc < json.list.length; inc++){
      if(json.list[inc].adActive == "Active"){
        status = `<td><button class="d_done" style="margin-right:14px" data-host="/user/ads/update" value="${json.list[inc]._id}" onclick="sell_listed(this)"><i class="fal fa-check"></i></button>`;
      } else {
        status = `<td><button class="d_pending" style="margin-right:14px" data-host="/user/ads/update" value="${json.list[inc]._id}" onclick="pending_done(this)"><i class="fas fa-exclamation-triangle"></i></button>`;
      }

        output += `\               
        <tr class="user-mylist">\
        <td>${inc + 1}</td>\
        <td>${json.list[inc].date}</td>\
        <td><a href="/buy-car/${json.list[inc]._id}" target="__blank">\
        <img src="/assets/Uploads/${json.list[inc].vinNum}/thumbnail/Photo30.jpg" style="height:30px;width:30px">\
        <span>${json.list[inc].Make} - ${json.list[inc].Model}</span></a></td>\
        <td>${json.list[inc].vinNum}</td>\
        <td>$${json.list[inc].Price}</td>
        ${status}<a href="/user/edit-car/${json.list[inc]._id}" target="__blank"><button class="d_edit"><i class="fal fa-edit"></i></button></a>\
        <button class="d_delete" data-host="/user/ads/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button></td>\
      </tr>`
    }
    document.getElementById("mylist").insertAdjacentHTML("afterend", output);
}

function completeListHandle(fil){
  if(event){
    event.preventDefault();
  }
  document.getElementById("loader").style.display = "flex";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/user/dashboard/all-listings/complete?filter=${fil}`, true);
    xhr.getResponseHeader("content-type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function() {
      if (this.status === 200) {
        completeListings(this.response)
        document.getElementById("loader").style.display = "none";
      } else {
        console.log("Some error occured");
        document.getElementById("loader").style.display = "none";
      }
    };
    xhr.send();
}

completeListings = list => {
    json = JSON.parse(list);
    let output = '';

    for(inc = 0; inc < json.list.length; inc++){
      if(json.list[inc].adActive == "Active"){
        status = `<td><button class="d_done" style="margin-right:14px" data-host="/user/ads/update" value="${json.list[inc]._id}" onclick="sell_listed(this)"><i class="fal fa-check"></i></button>`;
      } else {
        status = `<td><button class="d_pending" style="margin-right:14px" data-host="/user/ads/update" value="${json.list[inc]._id}" onclick="pending_done(this)"><i class="fas fa-exclamation-triangle"></i></button>`;
      }
        output += `\               
        <tr class="user-completelist">\
        <td>${inc + 1}</td>\
        <td>${json.list[inc].date}</td>\
        <td><a href="/buy-car/${json.list[inc]._id}" target="__blank">\
        <img src="/assets/Uploads/${json.list[inc].vinNum}/thumbnail/Photo30.jpg" style="height:30px;width:30px">\
        <span>${json.list[inc].Make} - ${json.list[inc].Model}</span></a></td>\
        <td>${json.list[inc].vinNum}</td>
        <td>$${json.list[inc].Price}</td>\
        <td>${json.list[inc].authorEmail}</td>\
        ${status}<a href="/user/edit-car/${json.list[inc]._id}" target="__blank"><button class="d_edit"><i class="fal fa-edit"></i></button></a>\
        <button class="d_delete" data-host="/user/ads/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button>\
      </tr>`
    }

    document.getElementById("completeList").insertAdjacentHTML("afterend", output);
}

function completeUserHandle(){
  
  document.getElementById("loader").style.display = "flex";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/user/dashboard/user-management/list`, true);
    xhr.getResponseHeader("content-type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function() {
      if (this.status === 200) {
        completeUsers(this.response)
        document.getElementById("loader").style.display = "none";
      } else {
        console.log("Some error occured");
        document.getElementById("loader").style.display = "none";
      }
    };
    xhr.send();
}

completeUsers = list => {
    json = JSON.parse(list);
    let output = '';
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
        <td>${json.list[inc].phoneNum}</td>\
        <td>${status}</td>\
        <td><button class="d_delete" data-host="/user/dashboard/user/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button></td>\
      </tr>`
    }
    document.getElementById("completeUsers").insertAdjacentHTML("afterend", output);
}

function testDriveHandle(){
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/user/dashboard/client-management/testdrives`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      testDrive(this.response)
      document.getElementById("loader").style.display = "none";
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
}

testDrive = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td><button class="d_done" data-host="/user/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="pending_done(this)"><i class="fal fa-check"></i></button>`;
    } else {
      status = `<td><button class="d_pending" data-host="/user/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="sell_listed(this)"><i class="fas fa-exclamation-triangle"></i></button>`;
    }
      output += `\               
      <tr class="check-testdrive">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].date}</td>\
      <td>${json.list[inc].firstName} ${json.list[inc].lastName} </td>\
      <td><a href="/buy-car/${json.list[inc]._id}" target="__blank">\
      <img src="/assets/Uploads/${json.list[inc].vinNum}/thumbnail/Photo30.jpg" style="height:30px;width:30px">\
      <span>${json.list[inc].car}</span></a></td>\
      <td>${json.list[inc].vinNum}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      ${status}\
      <button class="d_delete" data-host="/user/dashboard/testdrive/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button></td>\
    </tr>`
  }
  document.getElementById("testdriveEnq").insertAdjacentHTML("afterend", output);
}

function availabilityHandle(){
  document.getElementById('availID').onclick = null;
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/user/dashboard/client-management/availcheck`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      checkAvailability(this.response)
      document.getElementById("loader").style.display = "none";
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
}

checkAvailability = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td><button class="d_done" data-host="/user/dashboard/availability/update" value="${json.list[inc]._id}" onclick="pending_done(this)"><i class="fal fa-check"></i></button>`;
    } else {
      status = `<td><button class="d_pending" data-host="/user/dashboard/availability/update" value="${json.list[inc]._id}" onclick="sell_listed(this)"><i class="fas fa-exclamation-triangle"></i></button>`;
    }
      output += `\
      <tr class="check-availability">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].date}</td>\
      <td>${json.list[inc].fullName}</td>\
      <td><a href="/buy-car/${json.list[inc]._id}" target="__blank">\
      <img src="/assets/Uploads/${json.list[inc].vinNum}/thumbnail/Photo30.jpg" style="height:30px;width:30px">\
      <span>${json.list[inc].car}</span></a></td>\
      <td>${json.list[inc].vinNum}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      ${status}\
      <button class="d_delete" data-host="/user/dashboard/availability/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button></td>\
    </tr>`
  }
  document.getElementById("availabilityEnq").insertAdjacentHTML("afterend", output);
}

function shipHandle(){
  document.getElementById('shipID').onclick = null;
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/user/dashboard/client-management/shipenq`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      shipmentEnquiry(this.response)
      document.getElementById("loader").style.display = "none";
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
}

shipmentEnquiry = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td><button class="d_done" data-host="/user/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="pending_done(this)"><i class="fal fa-check"></i></button>`;
    } else {
      status = `<td><button class="d_pending" data-host="/user/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="sell_listed(this)"><i class="fas fa-exclamation-triangle"></i></button>`;
    }
      output += `\
      <tr class="check-ship">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].date}</td>\
      <td>${json.list[inc].fullName}</td>\
      <td><a href="/buy-car/${json.list[inc]._id}" target="__blank">\
      <img src="/assets/Uploads/${json.list[inc].vinNum}/thumbnail/Photo30.jpg" style="height:30px;width:30px">\
      <span>${json.list[inc].car}</span></a></td>\
      <td>${json.list[inc].vinNum}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      <td>${json.list[inc].fromLocation}</td>\
      <td>${json.list[inc].toLocation}</td>\
      <td>${json.list[inc].transportDate}</td>\
      ${status}\
      <button class="d_delete" data-host="/user/dashboard/shipment/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button></td>\
    </tr>`
  }
  document.getElementById("ShippingEnq").insertAdjacentHTML("afterend", output);
}

function completeTestDriveHandle(){
  
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/user/dashboard/all-client-management/testdrives-all`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      completeTestDrive(this.response)
      document.getElementById("loader").style.display = "none";
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
}

completeTestDrive = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td><button class="d_done" data-host="/user/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="pending_done(this)"><i class="fal fa-check"></i></button>`;
    } else {
      status = `<td><button class="d_pending" data-host="/user/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="sell_listed(this)"><i class="fas fa-exclamation-triangle"></i></button>`;
    }
      output += `\               
      <tr class="check-testdrive">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].date}</td>\
      <td>${json.list[inc].firstName} ${json.list[inc].lastName} </td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank">${json.list[inc].car}</a></td>\
      <td>${json.list[inc].vinNum}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      <td>${json.list[inc].carAuthor}</td>\
      ${status}\
      <button class="d_delete" data-host="/user/dashboard/testdrive/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button></td>\
    </tr>`
  }
  document.getElementById("allTestdriveEnq").insertAdjacentHTML("afterend", output);
}

function completeAvailabilityHandle(){
  document.getElementById('allAvailID').onclick = null;
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/user/dashboard/all-client-management/availcheck-all`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      completeCheckAvailability(this.response)
      document.getElementById("loader").style.display = "none";
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
}

completeCheckAvailability = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td><button class="d_done" data-host="/user/dashboard/availability/update" value="${json.list[inc]._id}" onclick="pending_done(this)"><i class="fal fa-check"></i></button>`;
    } else {
      status = `<td><button class="d_pending" data-host="/user/dashboard/availability/update" value="${json.list[inc]._id}" onclick="sell_listed(this)"><i class="fas fa-exclamation-triangle"></i></button>`;
    }
      output += `\
      <tr class="check-availability">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].date}</td>\
      <td>${json.list[inc].fullName}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      <td>${json.list[inc].vinNum}</td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank"> ${json.list[inc].car}</a></td>\
      <td>${json.list[inc].carAuthor}</td>\
      ${status}\
      <button class="d_delete" data-host="/user/dashboard/availability/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button></td>\
    </tr>`
  }
  document.getElementById("allAvailabilityEnq").insertAdjacentHTML("afterend", output);
}

function completeShipHandle(){
  document.getElementById('allShipID').onclick = null;
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/user/dashboard/all-client-management/shipenq-all`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      completeShipmentEnquiry(this.response)
      document.getElementById("loader").style.display = "none";
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
}

completeShipmentEnquiry = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td><button class="d_done" data-host="/user/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="pending_done(this)"><i class="fal fa-check"></i></button>`;
    } else {
      status = `<td><button class="d_pending" data-host="/user/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="sell_listed(this)"><i class="fas fa-exclamation-triangle"></i></button>`;
    }
      output += `\
      <tr class="check-ship">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].date}</td>\
      <td>${json.list[inc].fullName}</td>\
      <td>${json.list[inc].vinNum}</td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank"> ${json.list[inc].car}</a></td>\
      <td>${json.list[inc].carAuthor}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNum}</td>\
      <td>${json.list[inc].fromLocation}</td>\
      <td>${json.list[inc].toLocation}</td>\
      <td>${json.list[inc].transportDate}</td>\
      ${status}\
      <button class="d_delete" data-host="/user/dashboard/shipment/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button></td>\
    </tr>`
  }
  document.getElementById("allShippingEnq").insertAdjacentHTML("afterend", output);
}

function myCouponHandle(){
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/user/dashboard/offers/coupon`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      myCoupon(this.response)
      document.getElementById("loader").style.display = "none";
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
}

myCoupon = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){

    output = `\
    <div class="offwall">\
    <div class="offer">\
      <div class="offslipbod"></div>\
        <div class="offslipinfo">\
          <div class="carinfotme"><span>${json.list[inc].vehicleName}</span><span>${json.list[inc].tod}</span></div>\
          <div class="carinfotme"><span>Valid Thru</span><span>${json.list[inc].tom}</span></div>\
          <div class="carinfotme"><span>Validation Time</span><span>72 Hrs</span></div>\
          <div class="carinfotme"><span>Car Pricing</span><span>$${json.list[inc].carPrice}</span></div>\
          <div class="carinfotme"><span>Coupon Discount</span><span>$${json.list[inc].discount}</span></div>\
          <div class="carinfotme"><span>Trade Vehicle</span><span>$${json.list[inc].trade}</span></div>\
          <div class="carinfotme"><span>Traded Vehicle Plate</span><span>$${json.list[inc].tradeVehicle}</span></div>\
          <h1><span>Offer Code</span><span>${json.list[inc].CouponCode}</span></h1>\
        </div>\
    </div>
    `
  }
  document.getElementById("my_offer").insertAdjacentHTML("afterend", output);
}

function NoDealHandle(){
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/user/dashboard/no-deal-requests/deals`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      NoDeals(this.response)
      document.getElementById("loader").style.display = "none";
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
}

NoDeals = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){
    if(json.list[inc].status){
      status = `<td><button class="d_done" data-host="/user/dashboard/no-deal-requests/update" value="${json.list[inc]._id}" onclick="pending_done(this)"><i class="fal fa-check"></i></button>`;
    } else {
      status = `<td><button class="d_pending" data-host="/user/dashboard/no-deal-requests/update" value="${json.list[inc]._id}" onclick="sell_listed(this)"><i class="fas fa-exclamation-triangle"></i></button>`;
    }
      output += `\
      <tr>\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].date}</td>\
      <td>${json.list[inc].email}</td>\
      <td>${json.list[inc].phoneNo}</td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank"> ${json.list[inc].car}</a></td>\
      <td>${json.list[inc].vinNum}</td>\
      <td>${json.list[inc].uLastOffer}</td>\
      ${status}\
      <button class="d_delete" data-host="/user/dashboard/no-deal-requests/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)"><i class="fal fa-trash"></i></button></td>\
    </tr>`
  }

  document.getElementById("tradeinfo").insertAdjacentHTML("afterend", output);
}