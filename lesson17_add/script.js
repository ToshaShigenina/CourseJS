'use strict';

const startBtn = document.getElementById('start'),
  resetBtn = document.getElementById('reset');

let deg = 0,
  size = 1,
  percent = 0;

let id = 0;

const square = document.createElement('div');
square.classList.add('square');
document.body.append(square);


const start = () => {
  if (id === 0) {
    id = requestAnimationFrame(animateSquare);
    console.log('start: ', id);
  }
};

const stop = () => {
  if (id !== 0) {
    cancelAnimationFrame(id);
    console.log('stop: ', id);
    square.removeAttribute('style');
    deg = 0;
    size = 1;
    percent = 0;
    id = 0;
  }
};


const animateSquare = () => {
  id = 0;

  square.style.transform = `translate(${percent}%) rotateZ(${deg}deg) scale(${size})`;

  if (deg < 60) {
    deg += 2;
    percent += 10;
    size += 0.05;
  } else {
    deg = 0;
    percent = 0;
    size = 1;
  }

  start();
};


startBtn.addEventListener('click', () => {
  start();
});

resetBtn.addEventListener('click', () => {
  stop();
});
