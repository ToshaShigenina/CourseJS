let num = 266219;

num = num.toString().split('').reduce((comp, item) => {
  return comp * item;
});

console.log(num);

num = num ** 3;

console.log(num);

console.log(num.toString()[0], num.toString()[1]); // в формате строк
console.log(+num.toString()[0], +num.toString()[1]); // в формате чисел

console.log(num.toString().slice(0, 2));
