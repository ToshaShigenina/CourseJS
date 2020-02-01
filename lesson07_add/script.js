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

week.forEach((item, i) => {
  if (i === day - 1) {
    console.log('%c%s', 'font-weight: 700;', item);
  } else if (i === 5 || i === 6) {
    console.log('%c%s', 'font-style: italic;', item);
  } else {
    console.log(item);
  }
});
