let money = 60000,
  income = 'Спекуляции',
  addExpenses = 'Океанариум, Косметика, Котики',
  deposit = true,
  mission = 1000000,
  period = 12,
  budgetDay = money / 30,
  expenses1 = '',
  expenses2 = '',
  amount1 = '',
  amount2 = '',
  budgetMonth = 0;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель - заработать ' + mission + ' рублей!');

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);

money = prompt('Ваш месячный доход?', '30000');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');


expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = prompt('Во сколько это обойдется?');


budgetMonth = money - amount1 - amount2;

console.log('Бюджет на месяц ' + budgetMonth);

console.log('Цель будет достигнута за: ' + Math.ceil(mission / budgetMonth) + ' месяцев');

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay < 0) {
  console.log('Что то пошло не так');
} else if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay === 1200) {
  console.log('Ваш уровень дохода между средним и высоким');
} else if (budgetDay === 600) {
  console.log('Ваш уровень дохода между низким и средним');
} else if (budgetDay === 0) {
  console.log('Вы не зарабатываете');
}
