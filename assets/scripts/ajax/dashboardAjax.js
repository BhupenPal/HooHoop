function myListHandle(){
  
  document.getElementById("loader").style.display = "flex";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/dashboard/listings/my`, true);
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
        status = `<td class="sold"><button data-host="/my-ads/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Active</button></td>`;
      } else {
        status = `<td class="pending"><button data-host="/my-ads/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Sold</button></td>`;
      }

        output += `\               
        <tr class="user-mylist">\
        <td>${inc + 1}</td>\
        <td><a href="/buy-car/${json.list[inc]._id}" target="__blank"><img src="/assets/Uploads/${json.list[inc].vinNum}/exterior/Photo_1.jpg" style="height:30px;width:30px"></a></td>\
        <td>${json.list[inc].vinNum}</td>\
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
  
  document.getElementById("loader").style.display = "flex";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/dashboard/all-listings/complete`, true);
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
        status = `<td class="sold"><button data-host="/my-ads/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Active</button></td>`;
      } else {
        status = `<td class="pending"><button data-host="/my-ads/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Sold</button></td>`;
      }
        output += `\               
        <tr class="user-completelist">\
        <td>${inc + 1}</td>\
        <td><a href="/buy-car/${json.list[inc]._id}" target="__blank"><img src="/assets/Uploads/${json.list[inc].vinNum}/exterior/Photo_1.jpg" style="height:30px;width:30px"></a></td>\
        <td>${json.list[inc].vinNum}</td>
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
  
  document.getElementById("loader").style.display = "flex";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/dashboard/user-management/list`, true);
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
        <td>${status}</td>\
        <td class="delete"><button data-host="/dashboard/user/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
      </tr>`
    }
    document.getElementById("completeUsers").insertAdjacentHTML("afterend", output);
}

function testDriveHandle(){
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/client-management/testdrives`, true);
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
      status = `<td class="sold"><button data-host="/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\               
      <tr class="check-testdrive">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].firstName} ${json.list[inc].lastName} </td>\
      <td>${json.list[inc].vinNum}</td>\
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
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/client-management/availcheck`, true);
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
      <td>${json.list[inc].vinNum}</td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank"> ${json.list[inc].car}</a></td>\
      ${status}\
      <td class="delete"><button data-host="/dashboard/availability/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
    </tr>`
  }
  document.getElementById("availabilityEnq").insertAdjacentHTML("afterend", output);
}

function shipHandle(){
  document.getElementById('shipID').onclick = null;
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/client-management/shipenq`, true);
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
      status = `<td class="sold"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\
      <tr class="check-ship">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].fullName}</td>\
      <td>${json.list[inc].vinNum}</td>\
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
  
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/all-client-management/testdrives-all`, true);
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
      status = `<td class="sold"><button data-host="/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/testdrive/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\               
      <tr class="check-testdrive">\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].firstName} ${json.list[inc].lastName} </td>\
      <td>${json.list[inc].vinNum}</td>\
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
  
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/all-client-management/availcheck-all`, true);
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
      <td>${json.list[inc].vinNum}</td>\
      <td><a href="/buy-car/${json.list[inc].vehicleID}" target="__blank"> ${json.list[inc].car}</a></td>\
      <td>${json.list[inc].carAuthor}</td>\
      ${status}\
      <td class="delete"><button data-host="/dashboard/availability/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
    </tr>`
  }
  document.getElementById("allAvailabilityEnq").insertAdjacentHTML("afterend", output);
}

function completeShipHandle(){
  
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/all-client-management/shipenq-all`, true);
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
      status = `<td class="sold"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }
      output += `\
      <tr class="check-ship">\
      <td>${inc + 1}</td>\
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
      <td class="delete"><button data-host="/dashboard/shipment/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
    </tr>`
  }
  document.getElementById("allShippingEnq").insertAdjacentHTML("afterend", output);
}

function myCouponHandle(){
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/offers/coupon`, true);
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
          <div class="carinfotme"><span>${json.list[inc].vehicleName}</span><span>${json.list[inc].validFrom}</span></div>\
          <div class="carinfotme"><span>Valid Thru</span><span>${json.list[inc].validTo}</span></div>\
          <div class="carinfotme"><span>Validation Time</span><span>72 Hrs</span></div>\
          <div class="carinfotme"><span>Car Pricing</span><span>$${json.list[inc].carPrice}</span></div>\
          <div class="carinfotme"><span>Coupon Discount</span><span>$${json.list[inc].couponAmount}</span></div>\
          <h1><span>Offer Code</span><span>${json.list[inc].couponCode}</span></h1>\
        </div>\
    </div>
    `
  }
  document.getElementById("my_offer").insertAdjacentHTML("afterend", output);
}

function tradeHandle(){
  document.getElementById("loader").style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/dashboard/trade-requests/list`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      trade(this.response)
      document.getElementById("loader").style.display = "none";
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
}

trade = list => {
  json = JSON.parse(list);
  let output = '';

  for(inc = 0; inc < json.list.length; inc++){

    if(json.list[inc].status == "Done"){
      status = `<td class="sold"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="pending_done(this)">Done</button></td>`;
    } else {
      status = `<td class="pending"><button data-host="/dashboard/shipment/update" value="${json.list[inc]._id}" onclick="sell_listed(this)">Pending</button></td>`;
    }

    output = `\
      <tr>\
      <td>${inc + 1}</td>\
      <td>${json.list[inc].custEmail}</td>\
      <td>${json.list[inc].custPhone}</td>\
      <td>${json.list[inc].custVIN}</td>\
      <td>${json.list[inc].discountFor}</td>\
      <td>${json.list[inc].couponCode}</td>\
      <td>$${json.list[inc].custDiscount}</td>\
      <td>${json.list[inc].custDiscDate}</td>\
      ${status}\
      <td class="delete"><button data-host="/dashboard/shipment/delete" value="${json.list[inc]._id}" onclick="del_lstng(this)">Delete</button></td>\
      </tr>
      `
  }

  document.getElementById("tradeinfo").insertAdjacentHTML("afterend", output);
}