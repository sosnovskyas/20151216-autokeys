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

    var imagePath = 'static/img/content/';
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
