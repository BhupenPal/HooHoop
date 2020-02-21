if (navigator.userAgent.indexOf("Mobi") === -1) {
    document.querySelector(".message").style.display = "block";
}

// create PanoViewer with option
var PanoViewer = eg.view360.PanoViewer;
var container = document.getElementById("myPanoViewer");
var panoViewer = new PanoViewer(container, {
    image: "https://naver.github.io/egjs-view360/examples/panoviewer/controls/equi-car-inside.jpg",
    projectionType: "equirectangular"
});

var panoviewerSet = document.getElementById("panoSet");
PanoControls.init(panoviewerSet, panoViewer, {enableGyroOption: true, enableTouchOption: true});
PanoControls.showLoading();
    