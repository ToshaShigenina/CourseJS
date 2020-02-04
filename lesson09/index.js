'use strict';

let calc = document.getElementById('start'),
  addIncome = document.getElementsByTagName('button')[0],
  addExpenses = document.getElementsByTagName('button')[1],
  deposit = document.querySelector('#deposit-check'),
  addIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonth = document.getElementsByClassName('budget_month-value')[0],
  budgetDay = document.getElementsByClassName('budget_day-value')[0],
  expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
  income = document.getElementsByClassName('additional_income-value')[0],
  expenses = document.getElementsByClassName('additional_expenses-value')[0],
  periodIncome = document.getElementsByClassName('income_period-value')[0],
  targetMonth = document.getElementsByClassName('target_month-value')[0],
  period = document.querySelector('input[type="range"]'),
  targetAmount = document.querySelector('.target-amount'),
  addExpensesItem = document.querySelector('.additional_expenses-item'),
  expensesTitle = document.querySelector('.expenses-items .expenses-title'),
  expensesAmount = document.querySelector('.expenses-amount'),
  incomeTitle = document.querySelector('.income-items .income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  money = document.querySelector('.salary-amount');

//console.log(calc, addIncome, addExpenses, deposit, addIncomeItem, budgetMonth, budgetDay, expensesMonth, income, expenses, periodIncome, targetMonth, period, targetAmount, addExpensesItem, expensesTitle, expensesAmount, incomeTitle, incomeAmount, money);
