'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = 'Спекуляции',
  addExpenses = 'Океанариум, Косметика, Котики',
  deposit = true,
  mission = 100000,
  period = 12,
  budgetDay,
  expenses = [],
  accumulatedMonth = 0;

let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

/* показывает тип переменной */
let showTypeOf = function (item) {
  return typeof item;
};

/* вывод уровня дохода */
let getStatusIncome = function (budget) {
  if (budget >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budget >= 600 && budget < 1200) {
    return 'У вас средний уровень дохода';
  } else if (budget >= 0 && budget < 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что то пошло не так!';
  }
};

/* сумма всех обязательных расходов */
let getExpensessMonth = function () {
  let sum = 0;
  let amount;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');

    do {
      amount = prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));

    sum += +amount;
  }

  return sum;
};

/* накопления за месяц (доходы - расходы) */
let getAccumulatedMonth = function (money, exp) {
  return money - exp;
};

/* период, за который бедет достигнута цель */
let getTargetMonth = function (mission, accum) {
  let month = Math.ceil(mission / accum);

  if (month > 0) {
    return 'Цель будет достигнута за ' + month + ' месяцев';
  } else {
    return 'Цель не будет достигнута';
  }
};

start();

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expensesAmount = getExpensessMonth();

console.log('Расходы за месяц: ' + expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));

accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
budgetDay = Math.floor(accumulatedMonth / 30);

console.log(getTargetMonth(mission, accumulatedMonth));
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome(budgetDay));
