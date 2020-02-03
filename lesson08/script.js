'use strict';

let money,
  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  asking: function () {
    let itemIncome,
      cashIncome,
      addExpenses,
      exp,
      amount;

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?');
      } while (isNumber(itemIncome) || itemIncome.trim() === '');

      do {
        cashIncome = prompt('Сколько в месяц вы зарабатываете на этом');
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    } while (isNumber(addExpenses) || addExpenses.trim() === '');


    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      do {
        exp = prompt('Введите обязательную статью расходов?');
      } while (isNumber(exp) || exp.trim() === '');

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
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
    if (appData.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так!';
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 5);
      } while (!isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена', 10000);
      } while (!isNumber(appData.moneyDeposit));

    }
  },
  calcSaveMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensessMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('За ' + appData.period + ' месяцев накопится ' + appData.calcSaveMoney());


console.log(appData.addExpenses.map((item) => {
  let arr = [];

  arr = item.split('');
  arr[0] = arr[0].toUpperCase();
  return arr.join('');
}).join(', '));

console.log('Наша программа включает в себя данные:');

for (let key in appData) {
  console.log(key + ' : ' + appData[key]);
}
