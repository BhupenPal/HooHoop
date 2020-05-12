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
    document.querySelector("html").removeAttribute("style")
    document.querySelector(".chatbot_encloser").removeAttribute("style")
    document.querySelector(".interior-changer").removeAttribute("style")
    document.querySelector(".exterior-changer").removeAttribute("style")
  }
}