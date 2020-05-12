if (typeof navigator.getVRDisplays !== "function") {
  new WebXRPolyfill({
    allowCardboardOnDesktop: true,
  });
}

document.addEventListener("fullscreenchange", exitHandler);
document.addEventListener("webkitfullscreenchange", exitHandler);
document.addEventListener("mozfullscreenchange", exitHandler);
document.addEventListener("MSFullscreenChange", exitHandler);

function exitHandler() {
  if (
    !document.fullscreenElement &&
    !document.webkitIsFullScreen &&
    !document.mozFullScreen &&
    !document.msFullscreenElement
  ) {
    document.getElementsByClassName("interior-changer")[0].style.display =
      "flex";
    document.getElementsByClassName("exterior-changer")[0].style.display =
      "flex";
    document.getElementsByTagName("html")[0].removeAttribute("style");
  }
}