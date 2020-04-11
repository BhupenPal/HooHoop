let pageParams = parseInt(window.location.href.split("/")[4].split("?")[0]);
let pageQuery = window.location.href.split("?")[1];

function PaginationHandle(EnqParam, x) {
  if (EnqParam) {
    if(EnqParam.includes("&&")){
      CompleteEnq = EnqParam.split('&&')[0];
    } else {
      CompleteEnq = EnqParam;
    }
  }
  if (x) {
    pageParams = 1;
  }

  const Pivot = parseInt(pageParams / 4) * 4;
  const lastPage = parseInt(document.getElementById("Pagination").dataset.last);

  if (pageParams == 1) {
    document.getElementById("previous").style.display = "none";
  }

  if (pageParams == lastPage) {
    document.getElementById("next").style.display = "none";
  }

  let PaginatorButtons = document.getElementsByClassName("Page_no");

  if (pageParams >= 1 && pageParams <= 4) {
    for (var i = 0; i < lastPage; i++) {
      PaginatorButtons[i].classList.remove("vanish");
      PaginatorButtons[i].innerHTML = i + 1;
      if (PaginatorButtons[i].innerHTML == pageParams) {
        PaginatorButtons[i].classList.add("page_sel");
      }
      PaginatorButtons[i].parentElement.setAttribute(
        "href",
        `/search-car/${i + 1}`
      );
    }
  } else {
    for (var i = 0, inc = -1; Pivot + inc <= lastPage; i++, inc++) {
      PaginatorButtons[i].classList.remove("vanish");
      PaginatorButtons[i].innerHTML = Pivot + inc;
      if (PaginatorButtons[i].innerHTML == pageParams) {
        PaginatorButtons[i].classList.add("page_sel");
      }
      PaginatorButtons[i].parentElement.setAttribute(
        "href",
        `/search-car/${Pivot + inc}`
      );
    }
  }
}

PaginationHandle();

function onPrev() {
  if (typeof pageQuery !== "undefined") {
    window.location.href = `/search-car/${pageParams - 1}?${pageQuery}`;
  } else {
    if (CompleteEnq == "") {
      window.location.href = `/search-car/${pageParams - 1}`;
    } else {
      window.location.href = `/search-car/1/${CompleteEnq}`;
    }
  }
}

function onNext() {
  if (typeof pageQuery !== "undefined") {
    window.location.href = `/search-car/${pageParams + 1}?${pageQuery}`;
  } else {
    if (CompleteEnq == "") {
      window.location.href = `/search-car/${pageParams + 1}`;
    } else {
      window.location.href = `/search-car/2/${CompleteEnq}`;
    }
  }
}

if (window.matchMedia("(max-width: 480px)").matches) {
  document.getElementById("mobile_fil").classList.remove("vanish");
}
