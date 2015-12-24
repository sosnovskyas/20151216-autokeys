function removeChildItems(obj) {
  while (obj.firstChild) {
    obj.removeChild(obj.firstChild);
  }
}

var selectorModule = (function () {
  // getting selector items
  var _selector = document.querySelector('.selector');
  var _cars = document.querySelector('.selector__car');
  var _model = document.querySelector('.selector__model');
  var _year = document.querySelector('.selector__year');

  // temporary selector values
  var _selectedCar;
  var _selectedModel;
  var _selectedYear;

  document.addEventListener('dataReady', function (event) {
    var data = event.detail.data;
    // init creation new option item for select
    var carOption = document.createElement('option');
    carOption.setAttribute('disabled', 'disabled');
    carOption.setAttribute('selected', 'selected');
    carOption.innerHTML = 'марка';
    _cars.appendChild(carOption);
    for (var k in data.cars) {
      carOption = document.createElement('option');
      carOption.innerHTML = k;
      _cars.appendChild(carOption);
    }

    // listen cars change
    _cars.addEventListener('change', function (e) {
      _selectedCar = e.target.value;
      removeChildItems(_model);
      removeChildItems(_year);
      _year.setAttribute('disabled', 'disabled');

      var modelOption = document.createElement('option');
      modelOption.setAttribute('disabled', 'disabled');
      modelOption.setAttribute('selected', 'selected');
      modelOption.innerHTML = 'модель';
      _model.appendChild(modelOption);
      _model.removeAttribute('disabled');
      for (var k in data.cars[_selectedCar]) {
        modelOption = document.createElement('option');
        modelOption.innerHTML = k;
        _model.appendChild(modelOption);
      }
    });
    // listen model change
    _model.addEventListener('change', function (e) {
      _selectedModel = e.target.value;
      removeChildItems(_year);
      var yearOption = document.createElement('option');
      yearOption.setAttribute('disabled', 'disabled');
      yearOption.setAttribute('selected', 'selected');
      yearOption.innerHTML = 'год';
      _year.appendChild(yearOption);
      _year.removeAttribute('disabled');
      for (var k in data.cars[_selectedCar][_selectedModel]) {
        yearOption = document.createElement('option');
        yearOption.innerHTML = k;
        _year.appendChild(yearOption);
      }
    });
    // listen year change
    _year.addEventListener('change', function (e) {
      _selectedYear = e.target.value;

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
        // custom event for return selected car
        var carSelectedEvent = new CustomEvent('carSelected', {
          bubbles: false,
          detail: {
            data: data.cars[_selectedCar][_selectedModel][_selectedYear]
          }
        });
        _selector.dispatchEvent(carSelectedEvent);
      })();
    });
  });
}());