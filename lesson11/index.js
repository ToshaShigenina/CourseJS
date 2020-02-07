'use strict';

let calc = document.getElementById('start'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  deposit = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  income = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  periodIncome = document.getElementsByClassName('income_period-value')[0],
  targetMonth = document.getElementsByClassName('target_month-value')[0],
  period = document.querySelector('input[type="range"]'),
  targetAmount = document.querySelector('.target-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  expensesTitle = document.querySelector('.expenses-items .expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  incomeTitle = document.querySelector('.income-items .income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  salaryAmount = document.querySelector('.salary-amount');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
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
  start: function () {
    /*    do {
          money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));*/

    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getExpensessMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budget;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });

    //additionalExpensesValue
  },
  getAddIncome: function () {

  },
  asking: function () {
    let itemIncome,
      cashIncome,
      addExpenses,
      exp,
      amount;

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?');
      } while (isNumber(itemIncome) || itemIncome.trim() === '' || itemIncome.search(/\d/) !== -1);

      do {
        cashIncome = prompt('Сколько в месяц вы зарабатываете на этом');
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    } while (isNumber(addExpenses) || addExpenses.trim() === '' || addExpenses.search(/\d/) !== -1);


    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
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

calc.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
