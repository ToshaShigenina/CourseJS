'use strict';

let newString = prompt('Введите строку:');

let trimString = function (str) {
  if (isFinite(str) && parseFloat(str)) {
    alert('В функцию передано число!');
    return;
  }

  str = str.trim();

  if (str.length > 30) {
    str = str.slice(0, 31) + '...';
  }

  alert(str);
  return;
};

trimString(newString);
