let MakeQuery = "";
let ModelQuery = "";
let PriceQuery = "";
let FuelQuery = "";
let MetersQuery = "";
let AgeQuery = "";
let TransmissionQuery = "";
let BodyQuery = "";
let ColourQuery = "";
var MakeArr = [];
let CompleteEnq = ``;

GetEnquiry = () => {
  let Enq = window.location.href.split("enquiry=")[1];
  if (Enq) {
    Enq = Enq.split("&")[0];
    Enq = Enq.replace("+", " ");
    document.querySelector("input[name=enquiry]").value = Enq;
    document.querySelector("input[name=enquiry]").innerHTML = Enq;
  }
};

GetEnquiry();

MakeSelector = () => {
  MakeArr = [];
  let MakeAll = document.getElementById("make").getElementsByTagName("input");
  let MakeArrFill = document
    .getElementById("make")
    .querySelectorAll("input[type=checkbox]:checked");

  for (let i = 0; i < MakeArrFill.length; i++) {
    MakeArr.push({ Make: MakeArrFill[i].value, Model: [] });
  }

  for (let i = 0; i < MakeArr.length; i++) {
    for (let j = 0; j < MakeModel.length; j++) {
      if (MakeArr[i].Make == MakeModel[j].Make) {
        MakeArr[i].Model.push(MakeModel[j].Models);
      }
    }
  }

  MakeQuery = "";

  for (let makeCount = 0; makeCount < MakeAll.length; makeCount++) {
    if (MakeAll[makeCount].checked === true) {
      MakeQuery += `Make=${MakeAll[makeCount].value}&`;
    }
  }
  document.getElementsByClassName("foption_encloser")[1].innerHTML = "";
  MakeQuery = MakeQuery.slice(0, -1);
  filterResultHandler();
  MakeModelFilterHandle();
};

ModelSelector = () => {
  let ModelAll = document.getElementById("model").getElementsByTagName("input");

  ModelQuery = "";

  for (let modelCount = 0; modelCount < ModelAll.length; modelCount++) {
    if (ModelAll[modelCount].checked === true) {
      ModelQuery += `Model=${ModelAll[modelCount].value}&`;
    }
  }

  ModelQuery = ModelQuery.slice(0, -1);
  filterResultHandler();
};

FuelSelector = () => {
  let FuelAll = document
    .getElementById("fuel_type")
    .getElementsByTagName("input");

  FuelQuery = "";

  for (let fuelCount = 0; fuelCount < FuelAll.length; fuelCount++) {
    if (FuelAll[fuelCount].checked === true) {
      FuelQuery += `FuelType=${FuelAll[fuelCount].value}&`;
    }
  }

  FuelQuery = FuelQuery.slice(0, -1);
  filterResultHandler();
};

MeterSelector = () => {
  let MeterAll = document.getElementById("kms").getElementsByTagName("input");

  MetersQuery = "";

  for (let meterCount = 0; meterCount < MeterAll.length; meterCount++) {
    if (MeterAll[meterCount].checked === true) {
      MakeQuery += `kMeters=${MeterAll[meterCount].value}&`;
    }
  }

  MetersQuery = MetersQuery.slice(0, -1);
  filterResultHandler();
};

TransmissionSelector = () => {
  let TransmissionAll = document
    .getElementById("transmission")
    .getElementsByTagName("input");

  TransmissionQuery = "";

  for (
    let TransimissionCount = 0;
    TransimissionCount < TransmissionAll.length;
    TransimissionCount++
  ) {
    if (TransmissionAll[TransimissionCount].checked === true) {
      TransmissionQuery += `Transmission=${TransmissionAll[TransimissionCount].value}&`;
    }
  }

  TransmissionQuery = TransmissionQuery.slice(0, -1);
  filterResultHandler();
};

BodySelector = () => {
  let BodyAll = document
    .getElementById("body_type")
    .getElementsByTagName("input");

  BodyQuery = "";

  for (let BodyCount = 0; BodyCount < BodyAll.length; BodyCount++) {
    if (BodyAll[BodyCount].checked === true) {
      BodyQuery += `BodyType=${BodyAll[BodyCount].value}&`;
    }
  }

  BodyQuery = BodyQuery.slice(0, -1);
  filterResultHandler();
};

ColourSelector = () => {
  let ColourAll = document
    .getElementById("color")
    .getElementsByTagName("input");

  ColourQuery = "";

  for (let ColourCount = 0; ColourCount < ColourAll.length; ColourCount++) {
    if (ColourAll[ColourCount].checked === true) {
      ColourQuery += `Colour=${ColourAll[ColourCount].value}&`;
    }
  }

  ColourQuery = ColourQuery.slice(0, -1);
  filterResultHandler();
};

PriceSelector = () => {
  let PriceAll = document.getElementById("price").getElementsByTagName("input");

  PriceQuery = "";

  for (let PriceCount = 0; PriceCount < PriceAll.length; PriceCount++) {
    if (PriceAll[PriceCount].checked === true) {
      PriceQuery += `Price=${PriceAll[PriceCount].value}&`;
    }
  }

  PriceQuery = PriceQuery.slice(0, -1);
  filterResultHandler();
};

kMeterSelector = () => {
  let kMetersAll = document.getElementById("kms").getElementsByTagName("input");

  MetersQuery = "";

  for (let MeterCount = 0; MeterCount < kMetersAll.length; MeterCount++) {
    if (kMetersAll[MeterCount].checked === true) {
      MetersQuery += `kMeters=${kMetersAll[MeterCount].value}&`;
    }
  }

  MetersQuery = MetersQuery.slice(0, -1);
  filterResultHandler();
};

AgeSelector = () => {
  let AgeAll = document.getElementById("age").getElementsByTagName("input");

  AgeQuery = "";

  for (let AgeCount = 0; AgeCount < AgeAll.length; AgeCount++) {
    if (AgeAll[AgeCount].checked === true) {
      AgeQuery += `Age=${AgeAll[AgeCount].value}&`;
    }
  }

  MetersQuery = AgeQuery.slice(0, -1);
  filterResultHandler();
};

function filterResultHandler() {
  const pageParams = window.location.href.split("/")[4].split("?")[0];
  document.getElementById("loader").style.display = "block";
  document.getElementById("bc-card-wrap").classList.add("vanish");
  CompleteEnq = `?${MakeQuery}&${ModelQuery}&${FuelQuery}&${TransmissionQuery}&${BodyQuery}&${ColourQuery}&${PriceQuery}&${MetersQuery}`;
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `/search-car/1/${CompleteEnq}`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  xhr.onload = function () {
    if (this.status === 200) {
      document.getElementById("loader").style.display = "none";
      filterContent(this.response);
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };

  xhr.send();
}

filterContent = (record) => {
  json = JSON.parse(record);
  let output = '<div id="loader"></div>';

  if (json.record.length <= 0) {
    output += `<div id="bc-card-wrap" style="display:flex"><div class="no-car">\
              No cars to display right now\
            </div></div>`;
  } else {
    output += `<div id="bc-card-wrap">`;
    for (inc = 0; inc < json.record.length; inc++) {
      output += `  
      <a href="/buy-car/${json.record[inc]._id}" class="cardanchor">
      <div class="bc-card">
        <div class="cb_img"><img src="/assets/Uploads/${json.record[inc].vinNum}/thumbnail/Photo380.jpg">
        <div class="vir_tour"><i class="fas fa-tachometer" style="margin-right: 10px;"></i>360 Virtual Tour</div>
        </div>
        <div class="cb_info">
          <div class="cb_main">
            <span class="cb_name"> ${json.record[inc].Make} </span>
            <span class="cb_price">$ ${json.record[inc].Price}</span>
          </div>
          <div class="cb_add_info">
            <span class="kms_info">${json.record[inc].kMeters}</span>
            <span class="trans_info">${json.record[inc].Transmission}</span>
            <span class="model_info">${json.record[inc].Model}</span>
          </div>
        </div>
      </div>
    </a>`;
    }
    output = output + "</div>";
  }

  output =
    output +
    `<div id="Pagination" data-last="${json.EndPage}">\
  <button id="previous" onclick="onPrev()">Prev</button>\
  <a><span class="Page_no vanish"></span></a>\
  <a><span class="Page_no vanish"></span></a>\
  <a><span class="Page_no vanish"></span></a>\
  <a><span class="Page_no vanish"></span></a>\
  <a><span class="Page_no vanish"></span></a>\
  <a><span class="Page_no vanish"></span></a>\
  <a><span class="Page_no vanish"></span></a>\
  <button id="next" onclick="onNext()">Next</button>\
</div>`;
  document.getElementById("listeer").innerHTML = output;
  PaginationHandle(CompleteEnq, true);
};
