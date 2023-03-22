(() => {
  window.addEventListener("FromPage", function (evt) {
    chrome.runtime.sendMessage(evt.detail);
  }, false);

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log('content.js', request);

      switch (request.type) {
        case 'set-variables':
          setVariables(request.variables)
          break;
        case 'remove-variables':
          removeVariables();
          break;
        default:
          window.dispatchEvent(new CustomEvent('FromContent', { detail: request }));
      }

      sendResponse({ msg: "OK" });
    }
  );

  function setVariables(variables) {
    const root = document.querySelector(':root');

    variables.forEach(variable => {
      if (typeof variable === 'object') {
        root.style.setProperty(variable.key, variable.value);
      } else {
        const tmpVariable = variable.split(':');
        root.style.setProperty(tmpVariable[0].trim(), tmpVariable[1].replace(';', '').trim());
      }
    });
  }

  function removeVariables() {
    const root = document.querySelector(':root');
    const tmpNames = [];

    for (let i = 0; i < root.style.length; i++) {
      tmpNames.push(root.style.item(i))
    }

    tmpNames.forEach(name => root.style.removeProperty(name));
  }
})()
