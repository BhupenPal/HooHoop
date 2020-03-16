const pageParams = parseInt(window.location.href.split("/")[4].split("?")[0]);
let Pivot = parseInt(pageParams / 4) * 4;
const paramCheck = (pageParams - 1) % 4;

if (pageParams == 1) {
  document.getElementById("previous").disabled = true;
}

if (
  pageParams == parseInt(document.getElementById("Pagination").dataset.last)
) {
  document.getElementById("previous").disabled = true;
}

let PaginatorButtons = document.getElementsByClassName("Page_no");

if (pageParams >= 1 && pageParams <= 3) {
  for (var i = 0; i < PaginatorButtons.length; i++) {
    PaginatorButtons[i].innerHTML = i + 1;
    if (PaginatorButtons[i].innerHTML == pageParams) {
      PaginatorButtons[i].classList.add("page_sel");
    }
  }
} else {
  for (var i = 0, inc = -1; i < PaginatorButtons.length; i++, inc++) {
    PaginatorButtons[i].innerHTML = Pivot + inc;
    if (PaginatorButtons[i].innerHTML == pageParams) {
      PaginatorButtons[i].classList.add("page_sel");
    }
  }
}

function onPrev() {
  window.location.href = `/search-car/${pageParams - 1}`;
}

function onNext() {
  window.location.href = `/search-car/${pageParams + 1}`;
}
