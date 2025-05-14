function setupMessageListener() {
  const runtimeAPI = (function () {
    if (typeof browser !== 'undefined' && browser.runtime) return browser;
    if (typeof chrome !== 'undefined' && chrome.runtime) return chrome;
    return null;
  })();

  if (!runtimeAPI || !runtimeAPI.runtime || !runtimeAPI.runtime.onMessage) {
    console.warn('Extension API nicht verfügbar - Message Listener nicht registriert');
    return;
  }

  runtimeAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const safeSend = (response) => {
      try {
        if (typeof sendResponse === 'function') {
          sendResponse(response);
        }
      } catch (e) {
        console.warn('Response fehlgeschlagen:', e);
      }
    };

    const timeoutId = setTimeout(() => {
      safeSend({ error: 'Timeout: Keine Antwort innerhalb von 8s' });
    }, 8000);

    (async () => {
      try {
        const result = await processRequest(request, sender);
        clearTimeout(timeoutId);
        safeSend({ success: true, data: result });
      } catch (error) {
        clearTimeout(timeoutId);
        safeSend({ success: false, error: error.message });
      }
    })();

    return true;
  });
}

async function processRequest(request, sender) {
  switch (request.action) {
    case 'getData':
      return { items: [1, 2, 3] };
    case 'fetch':
      const res = await fetch(request.url);
      return res.json();
    default:
      throw new Error(`Unbekannte Aktion: ${request.action}`);
  }
}

if (document.readyState === 'complete') {
  setupMessageListener();
} else {
  window.addEventListener('DOMContentLoaded', setupMessageListener);
}
