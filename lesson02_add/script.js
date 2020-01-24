let num = 266219;

console.log(num.toString().split('').reduce((comp, item) => {
  return comp * item;
}));
