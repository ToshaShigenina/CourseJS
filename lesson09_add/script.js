'use strict';

const p1 = document.createElement('p'),
  p2 = document.createElement('p'),
  week = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ],
  months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ],
  changeHours = (h) => {
    if (h === 1 || h === 21) {
      return 'час';
    } else if ((h >= 2 && h <= 4) || h === 22 || h === 23) {
      return 'часа';
    } else {
      return 'часов';
    }

  },
  addZero = (data) => {
    if (data < 10) {
      return '0' + data;
    }

    return data;
  };

document.body.appendChild(p1);
document.body.appendChild(p2);

setInterval(() => {
  let now = new Date(),
    day = now.getDate(),
    dayOfWeek = now.getDay(),
    month = now.getMonth(),
    year = now.getFullYear(),
    hours = now.getHours(),
    minutes = now.getMinutes(),
    seconds = now.getSeconds();

  p1.textContent = 'Сегодня ' + week[dayOfWeek] + ', ' + day + ' ' + months[month].toLowerCase() + ' ' + year + ' года, ' + hours + ' ' + changeHours(hours) + ' ' + minutes + ' минут ' + seconds + ' секунд';
  p2.textContent = addZero(day) + '.' + addZero(month + 1) + '.' + year + ' - ' + addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
}, 1000);
