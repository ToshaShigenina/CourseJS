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

  static checkInput() {
    const inputLetter = document.querySelectorAll('input[placeholder="Наименование"]'),
      inputNum = document.querySelectorAll('input[placeholder="Сумма"]');

    inputLetter.forEach((item) => {
      item.addEventListener('input', function () {
        this.value = this.value.replace(/[^А-Яа-я\s.,]/, '');
      });
    });

    inputNum.forEach((item) => {
      item.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/, '');
      });
    });
  }

  static disableInput() {
    const input = document.querySelectorAll('input[type="text"]:not([class$="value"])');

    input.forEach((item) => {
      disableElem(item);
    });
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

    AppData.checkInput();
  }

  start() {
    if (salaryAmount.value.trim() === '') {
      disableElem(calc);
      return;
    }

    AppData.disableInput();

    calc.style.display = 'none';
    cancel.style.display = 'block';

    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensessMonth();
    this.getAddExpInc();
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

  addExpIncBlock() {
    const classStr = this.classList[1].split('_')[0];
    let items = document.querySelectorAll(`.${classStr}-items`);
    const cloneItem = items[0].cloneNode(true);

    cloneItem.querySelector('[class$="title"]').value = '';
    cloneItem.querySelector('[class$="amount"]').value = '';
    items[0].parentNode.insertBefore(cloneItem, this);
    items = document.querySelectorAll(`.${classStr}-items`);

    if (items.length === 3) {
      this.style.display = 'none';
    }

    AppData.checkInput();
  }

  getExpInc() {
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');

    const calc = (item) => {
      const classStr = item.className.split('-')[0],
        title = item.querySelector('[class$="title"]').value,
        amount = item.querySelector('[class$="amount"]').value;

      if (title !== '' && amount !== '') {
        this[classStr][title] = +amount;
      }
    };

    expensesItems.forEach(calc);
    incomeItems.forEach(calc);

    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  }

  getAddExpInc() {
    const addExpenses = additionalExpensesItem.value.split(',');

    const calc = (item) => {
      if (item.value !== undefined) {
        if (item.value.trim()) {
          this.addIncome.push(item.value.trim());
        }
      } else {
        if (item.trim()) {
          this.addExpenses.push(item.trim());
        }
      }
    }

    addExpenses.forEach(calc);
    additionalIncomeItem.forEach(calc);
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
    expensesPlus.addEventListener('click', this.addExpIncBlock);
    incomePlus.addEventListener('click', this.addExpIncBlock);
    periodSelect.addEventListener('input', (event) => {
      periodAmount.textContent = periodSelect.value;
    });
    cancel.addEventListener('click', this.reset.bind(this));
  }
}

const appData = new AppData();

console.log(appData);

appData.eventsListeners();
