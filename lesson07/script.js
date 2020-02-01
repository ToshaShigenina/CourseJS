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
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
      exp,
      amount;

    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      exp = prompt('Введите обязательную статью расходов?');

      do {
        amount = prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));

      appData.expenses[exp] = +amount;
    }
  },
  getExpensessMonth: function () {
    let sum = 0;

    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
  },
  getAccumulatedMonth: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
  },
  getTargetMonth: function () {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);

    if (appData.period > 0) {
      return 'Цель будет достигнута за ' + appData.period + ' месяцев';
    } else {
      return 'Цель не будет достигнута';
    }
  },
  getStatusIncome: function () {
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);

    if (appData.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так!';
    }
  }
};

appData.asking();
appData.getExpensessMonth();
appData.getAccumulatedMonth();

console.log('Расходы за месяц: ' + appData.expensesMonth);

console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('Бюджет на день: ' + appData.budgetDay);
