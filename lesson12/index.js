'use strict';

let calc = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  deposit = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  periodSelect = document.querySelector('input[type="range"]'),
  periodAmount = document.querySelector('.period-amount'),
  targetAmount = document.querySelector('.target-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeItems = document.querySelectorAll('.income-items');

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  checkNum = function (key) {
    return (key >= '0' && key <= '9') || key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
  },
  checkLetter = function (key) {
    return key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace' || key == 'Shift' || (key >= 'а' && key <= 'я') || (key >= 'А' && key <= 'Я') || key == ' ' || key == '.' || key == ',' || key == '-';
  },
  disableElem = function () {
    for (let i = 0; i < arguments.length; i++) {
      arguments[i].disabled = true;
      arguments[i].style.opacity = '.4';
      arguments[i].style.cursor = 'not-allowed';
    }
  },
  enableElem = function () {
    for (let i = 0; i < arguments.length; i++) {
      arguments[i].disabled = false;
      arguments[i].style.opacity = '1';
      arguments[i].style.cursor = 'pointer';
    }
  };

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    /*    do {
          money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));*/


    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensessMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();

    calc.style.display = 'none';
    cancel.style.display = 'block';
    this.disableInput();
  },
  reset: function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    expensesItems.forEach(function (item, i) {
      if (i > 0) {
        item.remove();
      }
    });

    expensesPlus.style.display = 'block';

    incomeItems.forEach(function (item, i) {
      if (i > 0) {
        item.remove();
      }
    });

    incomePlus.style.display = 'block';

    let input = document.querySelectorAll('input[type="text"]');

    input.forEach(function (item) {
      item.value = '';

      if (item.classList.value.lastIndexOf('value') === -1) {
        enableElem(item);
        //        console.log(item);
      }
    });

    deposit.checked = false;

    periodSelect.value = 1;
    periodAmount.textContent = '1';

    calc.style.display = 'block';
    cancel.style.display = 'none';

    disableElem(calc);

  },
  showResult: function () {
    budgetMonthValue.value = this.budget;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', function (event) {
      incomePeriodValue.value = appData.calcPeriod();
    });

  },
  disableInput: function () {
    let input = document.querySelectorAll('input[type="text"]:not([class$="value"])');
    //console.log(input);
    input.forEach(function (item) {
      disableElem(item);
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';

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
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensessMonth: function () {
    let sum = 0;

    for (let key in this.expenses) {
      sum += this.expenses[key];
    }

    this.expensesMonth = sum;
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return this.budgetMonth === 0 ? '' : Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так!';
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 5);
      } while (!isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = prompt('Какая сумма заложена', 10000);
      } while (!isNumber(this.moneyDeposit));

    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  }
};



disableElem(calc);

salaryAmount.addEventListener('input', function () {
  if (this.value.trim() !== '') {
    enableElem(calc);
  } else {
    disableElem(calc);
  }
});

document.body.addEventListener('keydown', (event) => {
  let target = event.target;

  if (target.placeholder == 'Наименование') {
    if (!checkLetter(event.key)) {
      event.preventDefault();
    }
  }

  if (target.placeholder == 'Сумма') {
    if (!checkNum(event.key)) {
      event.preventDefault();
    }
  }

});

calc.addEventListener('click', appData.start.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function (event) {
  periodAmount.textContent = periodSelect.value;
});
cancel.addEventListener('click', appData.reset.bind(appData));
