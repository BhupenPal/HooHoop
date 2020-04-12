const StarsTotal = 5;

if(window.location.href.includes('/buy-car')){
  document.addEventListener("DOMContentLoaded", getRatings);
}

function getRatings() {
  let Ratings = {
    fuelstar: document.querySelector(".fuelstar").getAttribute("data-fstar") / 2,
    safetystar: document.querySelector(".safetystar").getAttribute("data-sstar") / 2,
  }

  if(window.location.href == "http://localhost:8080/sell-car/data"){
    let Ratings = {
      fuelstar: Fstar / 2,
      safetystar: Sstar / 2
    }
  }

  for (let rating in Ratings) {
    const starPerc = (Ratings[rating] / StarsTotal) * 100;

    const starpercRounded = `${Math.round(starPerc / 10) * 10}%`;

    document.querySelector(`.${rating}
          .stars-inner`).style.width = starpercRounded;
  }
}
