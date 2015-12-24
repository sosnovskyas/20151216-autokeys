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





document
  .getElementById('order')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    var params = 'name=' + encodeURIComponent(name) +
      '&id=' + encodeURIComponent(selectedKey);

    xhr.open('GET', '/buy?' + params, true);

    xhr.onreadystatechange = function (e) {
      if (e.target.readyState == 4) {
        console.log(e.target);
      }
    };

    xhr.send();
  });
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
var selectedKey;
var selectKey = function (_obj) {
  var scrollTarget = document.getElementById('order');
  selectedKey = _obj;
  console.log(selectedKey);
  document
    .querySelector('.shower')
    .classList
    .add('disabled');

  document
    .querySelector('.order')
    .classList
    .remove('disabled');
};

var showerModule = (function () {
  var shower = document.querySelector('.shower__list');

  function _createLi(key, id) {
    // if was selected another key we must show back modules
    // BUT feature classList only for -gt IE10
    document.querySelector('.shower').classList.remove('disabled');
    document.querySelector('.order').classList.add('disabled');

    var imagePath = 'images/goods/';
    // generating table
    var availability;
    if (key.availability) {
      availability = 'Есть';
    } else {
      availability = 'Нет';
    }
    var itemTemplate =
        // image
        '<div class="shower__key-image-wrapper">' +
          '<img src="' + imagePath + key.img + '">' +
        '</div>' +
        // description
        '<div class="shower__key-options-wrapper">' +
          '<div class="shower__key-name">' +
            key.name +
          '</div>' +
          '<div class="shower__key-desc">' +
            key.desc +
          '</div>' +
          '<div class="shower__key-price-wrapper">' +
            '<div class="shower__key-price-left">' +
              '<div class="shower__key-price-wrapper">' +
                '<div class="shower__key-label">стоимость чипа</div>' +
                '<div class="shower__key-value">' + key.costChip + ' Р</div>' +
              '</div>' +
              '<div class="shower__key-price-wrapper">' +
                '<div class="shower__key-label">Программирование ключа</div>' +
                '<div class="shower__key-value">' + key.costPatch + ' Р</div>' +
              '</div>' +
              '<div class="shower__key-price-wrapper">' +
                '<div class="shower__key-label">Заточка лезвия</div>' +
                '<div class="shower__key-value">' + key.costSharpening + ' Р</div>' +
              '</div>' +
              '<div class="shower__key-price-wrapper shower__key-total">' +
                '<div class="shower__key-label ">Итого:</div>' +
                '<div class="shower__key-value">' +
                  (parseFloat(key.costChip) + parseFloat(key.costPatch) + parseFloat(key.costSharpening)) +
                ' Р</div>' +
              '</div>' +
            '</div>' +
            '<div class="shower__key-price-right">' +
              '<div class="shower__key-price-wrapper">' +
                '<div class="shower__key-label">В наличии</div>' +
                '<div class="shower__key-value">' + availability + '</div>' +
              '</div>' +
              '<div class="shower__key-price-wrapper">' +
                '<div class="shower__key-label">Самовывоз</div>' +
                '<div class="shower__key-value">' + key.selfDelivery + ' день</div>' +
              '</div>' +
              '<div class="shower__key-price-wrapper">' +
                '<div class="shower__key-label">Курьером</div>' +
                '<div class="shower__key-value">' +  key.expressDelivery + ' день</div>' +
              '</div>' +
              // must have escaping quotes for event emmiter data
              '<div class="shower__key-price-wrapper shower__key-buy" onclick="selectKey(\'' + id + '\')">' +
                'ЗАКАЗАТЬ' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    var newKey = document.createElement('li');
    newKey.innerHTML = itemTemplate;
    newKey.setAttribute('class', 'shower__item');
    shower.appendChild(newKey);
  }
  document.querySelector('.selector').addEventListener('carSelected', function (event) {
    // select shower DOM object
    removeChildItems(shower);
    // creation new LI element of key
    event.detail.data.forEach(function (key) {
      _createLi(data.keys[key], key);
    });
  });
  document.querySelector('.generate').addEventListener('click', function () {
    var test = {
      img: '1.jpg',
      desc: 'Оригинальный выкидной ключ с тремя кнопками',
      name: 'Ключ для Audi A8 2007-2010 г.в.',
      costChip: '510',
      costPatch: '3510',
      costSharpening: '790',
      expressDelivery: '1',
      availability: true,
      selfDelivery: '1'
    };
    removeChildItems(shower);
    _createLi(test);
  });
}());