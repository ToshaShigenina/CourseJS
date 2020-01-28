/* пункт 1 */
let lang = prompt('Введите язык:', 'ru'),
  weekRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  weekEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/* if */

/*if (lang === 'ru') {
  console.log(weekRu.reduce((week, day) => {
    return week + ', ' + day;
  }));
} else if (lang === 'en') {
  console.log(weekEn.reduce((week, day) => {
    return week + ', ' + day;
  }));
} else console.log('Что-то пошло не так!');*/

if (lang === 'ru') {
  console.log(weekRu.join(', '));
} else if (lang === 'en') {
  console.log(weekEn.join(', '));
} else console.log('Что-то пошло не так!');

/* switch */

/*switch (lang) {
  case 'ru':
    console.log(weekRu.reduce((week, day) => {
      return week + ', ' + day;
    }));
    break;
  case 'en':
    console.log(weekEn.reduce((week, day) => {
      return week + ', ' + day;
    }));
    break;
  default:
    console.log('Что-то пошло не так!');
    break;
}*/

switch (lang) {
  case 'ru':
    console.log(weekRu.join(', '));
    break;
  case 'en':
    console.log(weekEn.join(', '));
    break;
  default:
    console.log('Что-то пошло не так!');
    break;
}

/* массив */

let weeks = [
  'ru',
  ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
];

console.log(weeks[0] === lang ? weeks[1].join(', ') : weeks[2].join(', '));

/* объект */

let weeks2 = {
  ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};

console.log(weeks2[lang].join(', '));


/* пункт 2 */

let namePerson = prompt('Введите имя: ', 'Артем');

console.log(namePerson === 'Артем' ? 'директор' : (namePerson === 'Максим' ? 'преподаватель' : 'студент'));
