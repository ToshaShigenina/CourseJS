let money = 60000,
  income = 'Спекуляции',
  addExpenses = 'Океанариум, Косметика, Котики',
  deposit = true,
  mission = 1000000,
  period = 12,
  budgetDay = money / 30,
  expenses = [],
  amount = [],
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

for (let i = 0; i < 2; i++) {
  expenses[i] = prompt('Введите обязательную статью расходов?');
  amount[i] = prompt('Во сколько это обойдется?');
}

budgetMonth = money - amount[0] - amount[1];

console.log('Бюджет на месяц ' + budgetMonth);

console.log('Цель будет достигнута за: ' + Math.ceil(missin / budgetMonth) + ' месяцев');

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день:', budgetDay);

if (budgetDay < 0) {
  console.log('Что то пошло не так');
} else if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay <= 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay === 0) {
  console.log('Вы не зарабатываете');
}
