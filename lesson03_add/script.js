/* пункт 1 */
let lang = 'ru',
  monRu = 'Понедельник',
  tueRu = 'Вторник',
  wedRu = 'Среда',
  thuRu = 'Четверг',
  friRu = 'Пятница',
  satRu = 'Суббота',
  sunRu = 'Воскресенье',
  monEn = 'Monday',
  tueEn = 'Tuesday',
  wedEn = 'Wednesday',
  thuEn = 'Thursday',
  friEn = 'Friday',
  satEn = 'Saturday',
  sunEn = 'Sunday';



/* пункт 2 */

let namePerson = prompt('Введите имя: ', 'Артем');

console.log(namePerson === 'Артем' ? 'директор' : (namePerson === 'Максим' ? 'преподаватель' : 'студент'));
