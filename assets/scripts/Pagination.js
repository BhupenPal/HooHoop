const pageParams = parseInt(window.location.href.split("/")[4].split("?")[0]);
const Pivot = parseInt(pageParams / 4) * 4;
const paramCheck = (pageParams - 1) % 4;
const lastPage = parseInt(document.getElementById("Pagination").dataset.last);

if (pageParams == 1) {
  document.getElementById("previous").disabled = true;
}

if (pageParams == lastPage) {
  document.getElementById("next").disabled = true;
}

let PaginatorButtons = document.getElementsByClassName("Page_no");

if (pageParams >= 1 && pageParams <= 4) {
  for (var i = 0; i < lastPage; i++) {
    PaginatorButtons[i].innerHTML = i + 1;
    if (PaginatorButtons[i].innerHTML == pageParams) {
      PaginatorButtons[i].classList.add("page_sel");
    }
    PaginatorButtons[i].parentElement.setAttribute("href", `/search-car/${i+1}`)
  }
} else {
  for (var i = 0, inc = -1; i < lastPage; i++, inc++) {
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
