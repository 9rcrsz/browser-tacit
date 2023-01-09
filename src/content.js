(() => {
  window.addEventListener("FromPage", function (evt) {
    chrome.runtime.sendMessage(evt.detail);
  }, false);

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      window.dispatchEvent(new CustomEvent('FromContent', {detail: request}));
      sendResponse({msg: "OK"});
    }
  );
})()
