'use strict';

const calc = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
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
  salaryAmount = document.querySelector('.salary-amount');

let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');



const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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
  },
  checkNum = function () {
    const inputNum = document.querySelectorAll('input[placeholder="Сумма"]');

    inputNum.forEach((item) => {
      item.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/, '');
      });
    });
  },
  checkLetter = function () {
    const inputLetter = document.querySelectorAll('input[placeholder="Наименование"]');

    inputLetter.forEach((item) => {
      item.addEventListener('input', function () {
        this.value = this.value.replace(/[^А-Яа-я\s.,]/, '');
      });
    });
  };


class AppData {
  constructor() {
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
  }

  check() {
    disableElem(calc);

    salaryAmount.addEventListener('input', function () {
      if (this.value.trim() !== '') {
        enableElem(calc);
      } else {
        disableElem(calc);
      }
    });

    checkLetter();
    checkNum();
  }

  start() {
    if (salaryAmount.value.trim() === '') {
      disableElem(calc);
      return;
    }

    this.disableInput();

    calc.style.display = 'none';
    cancel.style.display = 'block';

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensessMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
  }

  reset() {
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

    expensesItems.forEach((item, i) => {
      if (i > 0) {
        item.remove();
      }
    });

    incomeItems.forEach((item, i) => {
      if (i > 0) {
        item.remove();
      }
    });

    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';

    const input = document.querySelectorAll('input[type="text"]');

    input.forEach((item) => {
      item.value = '';

      if (item.classList.value.lastIndexOf('value') === -1) {
        enableElem(item);
      }
    });

    depositCheck.checked = false;
    periodSelect.value = 1;
    periodAmount.textContent = '1';
    calc.style.display = 'block';
    cancel.style.display = 'none';

    disableElem(calc);
  }

  showResult() {
    budgetMonthValue.value = this.budget;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', (event) => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }

  disableInput() {
    const input = document.querySelectorAll('input[type="text"]:not([class$="value"])');

    input.forEach((item) => {
      disableElem(item);
    });
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);

    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }

    checkLetter();
    checkNum();
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);

    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }

    checkLetter();
    checkNum();
  }

  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensessMonth() {
    let sum = 0;

    for (let key in this.expenses) {
      sum += this.expenses[key];
    }

    this.expensesMonth = sum;
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return this.budgetMonth === 0 ? '' : Math.ceil(targetAmount.value / this.budgetMonth);
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так!';
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 5);
      } while (!isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = prompt('Какая сумма заложена', 10000);
      } while (!isNumber(this.moneyDeposit));

    }
  }

  eventsListeners() {
    document.addEventListener('DOMContentLoaded', this.check);
    calc.addEventListener('click', this.start.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', (event) => {
      periodAmount.textContent = periodSelect.value;
    });
    cancel.addEventListener('click', this.reset.bind(this));
  }
}



/*AppData.prototype.checkNum = function () {
  let inputNum = document.querySelectorAll('input[placeholder="Сумма"]');

  inputNum.forEach(function (item) {
    item.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/, '');
    });
  });
};

AppData.prototype.checkLetter = function () {
  let inputLetter = document.querySelectorAll('input[placeholder="Наименование"]');

  inputLetter.forEach(function (item) {
    item.addEventListener('input', function () {
      this.value = this.value.replace(/[^А-Яа-я\s.,]/, '');
    });
  });
};*/





const appData = new AppData();

console.log(appData);

appData.eventsListeners();
