let newString = prompt('Введите строку:');

trimString(newString);

function trimString(str) {

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
}
