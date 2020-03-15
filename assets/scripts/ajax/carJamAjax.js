let jamForm = document.getElementById("jamFORM");
let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

jamForm.addEventListener("submit", function carJamHandler() {
  event.preventDefault();
  document.getElementById("car_jam").classList.add("vanish")
  document.getElementById("SELL-FORM-SUB").classList.add("vanish")
  document.getElementById("loader").style.display = "block";
  let PlateNo = document.getElementById("vinFigureID").value;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/car-submit/data?Plate=${PlateNo}`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function() {
    if (this.status === 200) {
      let data = dataSetter(this.response);
      dataGIST(data);
      dataAdder(data);
      document.getElementById("loader").style.display = "none";
      document.getElementById("car_jam").classList.remove("vanish")
      document.getElementById("SELL-FORM-SUB").classList.remove("vanish")
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };
  xhr.send();
});

function dataGIST(data) {
  let toBeRemoved = document.getElementsByClassName("car_api_data")[0];
  if (document.contains(toBeRemoved)) {
    toBeRemoved.remove();
  }

  let output = `\<div class="car_api_data">\
    <div class="colspan_1">\
       <span class="a_dta">Make: ${data.make} </span> <br>\
       <span class="a_dta">Model: ${data.model} </span> <br>\
       <span class="a_dta">Fuel Type: ${data.fuel_type} </span> <br>\
       <span class="a_dta">Plate No: ${data.plate} </span> <br>\
    </div>\
    <div class="colspan_1">\
        <span class="a_dta">Year: ${data.year_of_manufacture} </span> <br>\
        <span class="a_dta">No Of Owners: ${data.number_of_owners} </span> <br>\
        <span class="a_dta">VIN: ${data.vin} </span> <br>\
        <span class="a_dta">Chassis: ${data.chassis} </span> <br>\
    </div>\
    <div class="colspan_1">\
        <span class="a_dta">Body style: ${data.body_style} </span> <br>\
        <span class="a_dta">Color: ${data.main_colour} </span> <br>\
        <span class="a_dta">Engine No: ${data.engine_no} </span> <br>\
        <span class="a_dta">Seats: ${data.no_of_seats} </span> <br>\
    </div>\
</div>
`;
  document.getElementById("checkDet").insertAdjacentHTML("afterend", output);
}

function dataAdder(data) {
 
  const theDate = (timeStamp, target) => {
      var DateParam = new Date(timeStamp * 1000);
      var Dmonth = monthNames[DateParam.getMonth()];
      var Dyear = DateParam.getFullYear();
      target.value = `${Dmonth} , ${Dyear}`;
      target.innerHTML = `${Dmonth} , ${Dyear}`;
    };
  
    theDate(data.expiry_date_of_last_successful_wof, document.getElementById('wofexchange'));
    theDate(data.plates[0].effective_date, document.getElementById('regexchange'));

    let makeExchange = document.getElementById('makeExchange');
    makeExchange.value = data.make;
    makeExchange.innerHTML = data.make;

    let modelExchange = document.getElementById('modelExchange');
    modelExchange.value = data.model;
    modelExchange.innerHTML = data.model;

    let mYearExchange = document.getElementById('mYearExchange');
    mYearExchange.value = data.year_of_manufacture;
    mYearExchange.innerHTML = data.year_of_manufacture;

    let bodyExchange = document.getElementById('bodyExchange');
    bodyExchange.value = data.body_style;
    bodyExchange.innerHTML = data.body_style;

    let seatExchange = document.getElementById('seatExchange');
    seatExchange.value = data.no_of_seats;

    let ownerExchange = document.getElementById('ownerExchange');
    ownerExchange.value = data.number_of_owners;
    ownerExchange.innerHTML = data.number_of_owners;

    let vinExchange = document.getElementById('vinExchange');
    vinExchange.value = data.plate;
    vinExchange.innerHTML = data.plate;

    let kMeterExchange = document.getElementById('kMeterExchange');
    kMeterExchange.value = data.latest_odometer_reading;
    kMeterExchange.innerHTML = data.latest_odometer_reading;

    let colorExchange = document.getElementById('colorExchange');
    colorExchange.value = data.main_colour;
    colorExchange.innerHTML = data.main_colour;

    let engineExchange = document.getElementById('engineExchange');
    engineExchange.value = data.cc_rating;
    engineExchange.innerHTML = data.cc_rating;

    let transmissionExchange = document.getElementById('transmissionExchange');
    transmissionExchange.value = data.transmission;
    transmissionExchange.innerHTML = data.transmission;

    let fuelExchange = document.getElementById('fuelExchange');
    fuelExchange.value = data.fuel_type;
    fuelExchange.innerHTML = data.fuel_type;

}

function dataSetter(data) {
  data = JSON.parse(data);

  if (data.body_style == "CV") {
    data.body_style = "Convertible";
  } else if (data.body_style == "HA") {
    data.body_style = "Hatchback";
  } else if (data.body_style == "HV") {
    data.body_style = "Heavy Van";
  } else if (data.body_style == "LV") {
    data.body_style = "Light Van";
  } else if (data.body_style == "SW") {
    data.body_style = "Station Wagon";
  } else if (data.body_style == "UT") {
    data.body_style = "Utility";
  } else if (data.body_style == "SL") {
    data.body_style = "Sedan";
  } else if (data.body_style == "SP") {
    data.body_style = "Sports Car";
  } else {
    data.body_style = "Other";
  }

  if (data.fuel_type == 01) {
    data.fuel_type = "Petrol";
  } else if (data.fuel_type == 02) {
    data.fuel_type = "Diesel";
  } else if (data.fuel_type == 03) {
    data.fuel_type = "CNG";
  } else if (data.fuel_type == 04) {
    data.fuel_type = "LPG";
  } else if (data.fuel_type == 05) {
    data.fuel_type = "Electric";
  } else if (
    data.fuel_type == 93 ||
    07 ||
    08 ||
    09 ||
    10 ||
    11 ||
    12 ||
    91 ||
    92 ||
    94 ||
    95 ||
    96
  ) {
    data.fuel_type = "Hybrid";
  } else {
    data.fuel_type = "Other";
  }

  if (data.transmission.includes("automatic")) {
    data.transmission = "Automatic";
  } else if (data.transmission.includes("manual")) {
    data.transmission = "Manual";
  } else if (data.transmission.includes("triptonic")) {
    data.transmission = "Triptonic";
  }

  return data;
}
