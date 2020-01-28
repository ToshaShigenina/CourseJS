let money = 60000,
  income = 'Спекуляции',
  addExpenses = 'Океанариум, Косметика, Котики',
  deposit = true,
  mission = 100000,
  period = 12,
  budgetDay = money / 30,
  expenses1 = '',
  expenses2 = '',
  amount1 = '',
  amount2 = '';


console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log('Расходы за месяц: ' + getExpensessMonth());

console.log(addExpenses.toLowerCase().split(', '));

money = prompt('Ваш месячный доход?', '30000');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');


expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = prompt('Во сколько это обойдется?');

console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев');

let accumulatedMonth = getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Бюджет на день: ' + budgetDay);


if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так!');
}


/* Сумма всех обязательных расходов */
function getExpensessMonth() {
  return Number(amount1) + Number(amount2);
}

/* накопления за месяц (доходы - расходы) */
function getAccumulatedMonth() {
  return money - getExpensessMonth();
}

/* период, за который бедет достигнута цель */
function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

function showTypeOf(item) {
  return typeof item;
}

//Что за функция getStatusIncome?
