/* Installation is offered by the browser; calculator layout stays unchanged. */
if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js', {scope: './'})
      .catch(function (error) { console.warn('Offline setup failed:', error); });
  });
}
