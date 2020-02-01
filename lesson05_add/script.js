'use strict';

let arr = [2458, 45896, 526, 58963, 45871, 5873, 457319];


for (let i = 0; i < arr.length; i++) {
  let a = arr[i].toString().split('');

  if (a[0] === '2' || a[0] === '4') {
    console.log(arr[i]);
  }
}


let num = [];

for (let i = 0; i < 100; i++) {
  num[i] = true;
}

let p = 2;
do {

  for (let i = 2 * p; i < num.length; i += p) {
    num[i] = false;
  }

  for (let i = p + 1; i < num.length; i++) {
    if (num[i]) {
      p = i;
      break;
    }
  }

} while (p * p < 100); // шаг 5

for (let i = 1; i < num.length; i++) {
  if (num[i]) {
    console.log(i + ' - делители этого числа: 1 и  ' + i);
  }
}


console.log(num);
