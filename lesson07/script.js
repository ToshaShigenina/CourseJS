'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
  };

start();

let accumulatedMonth = 0;

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensessMonth: function () {
    let sum = 0,
      exp,
      amount;

    for (let i = 0; i < 2; i++) {
      exp = prompt('Введите обязательную статью расходов?');

      do {
        amount = prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));

      appData.expenses[exp] = amount;

      sum += +amount;
    }

    return sum;
  },
  getAccumulatedMonth: function () {
    return appData.budget - appData.getExpensessMonth();
  },
  getTargetMonth: function () {
    let month = Math.ceil(appData.mission / appData.getAccumulatedMonth());

    if (month > 0) {
      return 'Цель будет достигнута за ' + month + ' месяцев';
    } else {
      return 'Цель не будет достигнута';
    }
  },
  getStatusIncome: function () {
    let budgetDay = Math.floor(appData.getAccumulatedMonth() / 30);

    if (budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600 && budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (budgetDay >= 0 && budgetDay < 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так!';
    }
  }
};



/* вывод уровня дохода */
/*let getStatusIncome = function (budget) {
  if (budget >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budget >= 600 && budget < 1200) {
    return 'У вас средний уровень дохода';
  } else if (budget >= 0 && budget < 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что то пошло не так!';
  }
};*/


/* сумма всех обязательных расходов */
/*let getExpensessMonth = function (exp) {
  let sum = 0,
    amount;

  for (let i = 0; i < 2; i++) {
    exp[i] = prompt('Введите обязательную статью расходов?');

    do {
      amount = prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));

    sum += +amount;
  }

  return sum;
};*/

/* накопления за месяц (доходы - расходы) */
/*let getAccumulatedMonth = function (money, exp) {
  return money - exp;
};*/

/* период, за который бедет достигнута цель */
/*let getTargetMonth = function (mission, accum) {
  let month = Math.ceil(mission / accum);

  if (month > 0) {
    return 'Цель будет достигнута за ' + month + ' месяцев';
  } else {
    return 'Цель не будет достигнута';
  }
};*/




let expensesAmount = getExpensessMonth(appData.addExpenses);

console.log('Расходы за месяц: ' + expensesAmount);


accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
budgetDay = Math.floor(getAccumulatedMonth / 30);

console.log(getTargetMonth(appData.mission, accumulatedMonth));
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome(budgetDay));
