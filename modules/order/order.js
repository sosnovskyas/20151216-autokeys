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