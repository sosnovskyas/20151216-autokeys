// XHR getiing JSON data file

var data;

document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'data.json', false);
  xhr.send();
  if (xhr.status != 200) {
    // error handling
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    // get JSON data from file
    data = JSON.parse(xhr.responseText);

    // polyfill implementation custom events
    (function () {
      function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: { data: data } };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }

      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent;
      var dataReady = new CustomEvent('dataReady', {
        bubbles: false,
        detail: {
          data: data
        }
      });
      document.dispatchEvent(dataReady);
    })();
  }
});
