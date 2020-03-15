let MakeQuery = ''; //DONE
let ModelQuery = ''; //DONE
let PriceQuery = '';
let FuelQuery = ''; //Done
let MetersQuery = ''; 
let AgeQuery = '';
let TransmissionQuery = '';  //DONE
let BodyQuery = ''; //DONE
let ColourQuery = ''; //DONE

MakeSelector = () => {
  let MakeAll = document.getElementById('make').getElementsByTagName('input');

  MakeQuery = '';
  
  for(let makeCount = 0; makeCount < MakeAll.length; makeCount++){
      if(MakeAll[makeCount].checked === true){
          MakeQuery += `Make=${MakeAll[makeCount].value}&`;
      }
  }

  MakeQuery = MakeQuery.slice(0, -1)
  filterResultHandler()
}

ModelSelector = () => {
  let ModelAll = document.getElementById('model').getElementsByTagName('input');

  ModelQuery = '';
  
  for(let modelCount = 0; modelCount < ModelAll.length; modelCount++){
      if(ModelAll[modelCount].checked === true){
          ModelQuery += `Model=${ModelAll[modelCount].value}&`;
      }
  }
  
  ModelQuery = ModelQuery.slice(0, -1)
  filterResultHandler()
}

FuelSelector = () => {
  let FuelAll = document.getElementById('fuel_type').getElementsByTagName('input');

  FuelQuery = '';
  
  for(let fuelCount = 0; fuelCount < FuelAll.length; fuelCount++){
      if(FuelAll[fuelCount].checked === true){
          FuelQuery += `fuelType=${FuelAll[fuelCount].value}&`;
      }
  }

  FuelQuery = FuelQuery.slice(0, -1)
  filterResultHandler()
}

MeterSelector = () => {
  let MeterAll = document.getElementById('kms').getElementsByTagName('input');

  MetersQuery = '';
  
  for(let meterCount = 0; meterCount < MeterAll.length; meterCount++){
      if(MeterAll[meterCount].checked === true){
          MakeQuery += `kMeters=${MeterAll[meterCount].value}&`;
      }
  }

  MetersQuery = MetersQuery.slice(0, -1)
  filterResultHandler()
}

TransmissionSelector = () => {
  let TransmissionAll = document.getElementById('transmission').getElementsByTagName('input');

  TransmissionQuery = '';
  
  for(let TransimissionCount = 0; TransimissionCount < TransmissionAll.length; TransimissionCount++){
      if(TransmissionAll[TransimissionCount].checked === true){
          TransmissionQuery += `Transmission=${TransmissionAll[TransimissionCount].value}&`;
      }
  }

  TransmissionQuery = TransmissionQuery.slice(0, -1)
  filterResultHandler()
}

BodySelector = () => {
  let BodyAll = document.getElementById('body_type').getElementsByTagName('input');

  BodyQuery = '';
  
  for(let BodyCount = 0; BodyCount < BodyAll.length; BodyCount++){
      if(BodyAll[BodyCount].checked === true){
          BodyQuery += `BodyType=${BodyAll[BodyCount].value}&`;
      }
  }

  BodyQuery = BodyQuery.slice(0, -1)
  filterResultHandler()
}

ColourSelector = () => {
  let ColourAll = document.getElementById('color').getElementsByTagName('input');

  ColourQuery = '';
  
  for(let ColourCount = 0; ColourCount < ColourAll.length; ColourCount++){
      if(ColourAll[ColourCount].checked === true){
          ColourQuery += `Colour=${ColourAll[ColourCount].value}&`;
      }
  }

  ColourQuery = ColourQuery.slice(0, -1)
  filterResultHandler()
}

PriceSelector = () => {
  let PriceAll = document.getElementById('price').getElementsByTagName('input');

  PriceQuery = '';
  
  for(let PriceCount = 0; PriceCount < PriceAll.length; PriceCount++){
      if(PriceAll[PriceCount].checked === true){
          PriceQuery += `Price=${PriceAll[PriceCount].value}&`;
      }
  }

  PriceQuery = PriceQuery.slice(0, -1)
  filterResultHandler()
}

kMeterSelector = () => {
  let kMetersAll = document.getElementById('kms').getElementsByTagName('input');

  MetersQuery = '';
  
  for(let MeterCount = 0; MeterCount < kMetersAll.length; MeterCount++){
      if(kMetersAll[MeterCount].checked === true){
          MetersQuery += `kMeters=${kMetersAll[MeterCount].value}&`;
      }
  }

  MetersQuery = MetersQuery.slice(0, -1)
  filterResultHandler()
}

AgeSelector = () => {
  let AgeAll = document.getElementById('age').getElementsByTagName('input');

  AgeQuery = '';
  
  for(let AgeCount = 0; AgeCount < AgeAll.length; AgeCount++){
      if(AgeAll[AgeCount].checked === true){
          AgeQuery += `Age=${AgeAll[AgeCount].value}&`;
      }
  }

  MetersQuery = AgeQuery.slice(0, -1)
  filterResultHandler()
}

function filterResultHandler(){

  const pageParams = window.location.href.split('/')[4].split('?')[0];
  document.getElementById('bc-card-wrap').classList.add('vanish')

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `/filter-content/${pageParams}?${MakeQuery}&${ModelQuery}&${FuelQuery}&${TransmissionQuery}&${BodyQuery}&${ColourQuery}&${PriceQuery}&${MetersQuery}`, true);
  xhr.getResponseHeader("content-type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  xhr.onload = function() {
    if (this.status === 200) {
      document.getElementById("loader").style.display = "none";
      filterContent(this.response)
    } else {
      console.log("Some error occured");
      document.getElementById("loader").style.display = "none";
    }
  };

  xhr.send();
}

filterContent = record => {
  json = JSON.parse(record);

let output='<div id="loader"></div>    <div id="bc-card-wrap">';
  for(inc = 0; inc<json.record.length; inc++){
    output += `  
    <a href="/buy-car/${json.record[inc]._id}" class="cardanchor">
    <div class="bc-card">
      <div class="cb_img"><img src="/assets/Uploads/${json.record[inc].vinNum}/exterior/Photo_1.jpg"></div>
      <div class="cb_info">
        <div class="cb_main">
          <span class="cb_name"> ${json.record[inc].Make } </span>
          <span class="cb_price">$ ${json.record[inc].Price}</span>
        </div>
        <div class="cb_add_info">
          <span class="kms_info">${json.record[inc].kMeters}</span>
          <span class="trans_info">${json.record[inc].Transmission}</span>
          <span class="model_info">${json.record[inc].Model}</span>
        </div>
      </div>
    </div>
  </a>`
  }
  output = output + '</div>';
  document.getElementById("listeer").innerHTML = output;
}