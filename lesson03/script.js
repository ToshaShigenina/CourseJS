let money = 60000,
  income = 'Спекуляции',
  addExpenses = 'Океанариум, Косметика, Котики',
  deposit = true,
  mission = 1000000,
  period = 12,
  budgetDay = money / 30;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель - заработать ' + mission + ' рублей!');

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);
