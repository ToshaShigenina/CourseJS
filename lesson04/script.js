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
  amount2 = '',
  accumulatedMonth = 0;


console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

money = prompt('Ваш месячный доход?', '30000');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');


expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = prompt('Во сколько это обойдется?');

console.log('Расходы за месяц: ' + getExpensessMonth(amount1, amount2));

console.log(addExpenses.toLowerCase().split(', '));

accumulatedMonth = getAccumulatedMonth(money, getExpensessMonth(amount1, amount2));
budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');

console.log('Бюджет на день: ' + budgetDay);

console.log(getStatusIncome(budgetDay));



/* Сумма всех обязательных расходов */
function getExpensessMonth(am1, am2) {
  return Number(am1) + Number(am2);
}

/* накопления за месяц (доходы - расходы) */
function getAccumulatedMonth(money, exp) {
  return money - exp;
}

/* период, за который бедет достигнута цель */
function getTargetMonth(mission, accum) {
  return Math.ceil(mission / accum);
}

function showTypeOf(item) {
  return typeof item;
}

function getStatusIncome(budget) {
  if (budget >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budget >= 600 && budget < 1200) {
    return 'У вас средний уровень дохода';
  } else if (budget >= 0 && budget < 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что то пошло не так!';
  }
}
