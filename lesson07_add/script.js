'use strict';

let week = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
],
  day = new Date().getDay();

if (day === 0) {
  day = 7;
}

week.forEach((item, i) => {
  let p = document.createElement('p');

  p.innerHTML = item;

  if ((i === 5 || i === 6) && (i === day - 1)) {
    p.style.fontStyle = 'italic';
    p.style.fontWeight = '700';
  } else if (i === day - 1) {
    p.style.fontWeight = '700';
  }
  if (i === 5 || i === 6) {
    p.style.fontStyle = 'italic';
  }

  document.body.append(p);
});
