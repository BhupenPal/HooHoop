let filter = document.getElementById('former');
filter.addEventListener('submit',function filterResultHandler(event){

  event.preventDefault();

  const pageParams = window.location.href.split('/')[4].split('?')[0];

  let urlQuery = ['Audi', 'BMW'];

  const xhr = new XMLHttpRequest();

  // Pass header with content-type: application/json

  xhr.open("GET", `http://localhost:8080/search-car/${pageParams}?Make=TOYOTA`, true);
  xhr.getResponseHeader("content-type", "application/json")

  xhr.onprogress = function() {
    console.log("On progress");
  };

  xhr.onload = function() {
    if (this.status === 200) {
      filterContent(this.response)
    } else {
      console.log("Some error occured");
    }
  };

  xhr.send();

})

filterContent = record => {
  json = JSON.parse(record);

let output='';
  for(inc = 0; inc<json.record.length; inc++){
    output += `  <a href="http://localhost:8080/buy-car/${json.record[inc]._id}" class="cardanchor">
    <div class="bc-card">
      <div class="cb_img"><img src="/assets/Uploads/${json.record[inc].vinNum}/exterior/${json.record[inc].thumbnail}"></div>
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

  document.getElementById("listeer").innerHTML = output;
}