'use strict';

let container = document.querySelector('.books'),
  books = document.querySelectorAll('.book'),
  body = document.body,
  advertisment = document.querySelector('.adv'),
  title = books[4].querySelector('a'),
  contentsCh2 = books[0].querySelectorAll('li');

books[1].after(books[0]);
books[4].after(books[3]);
container.append(books[2]);

title.textContent = 'Книга 3. this и Прототипы Объектов';

contentsCh2[3].after(contentsCh2[6]);
contentsCh2[6].after(contentsCh2[8]);
contentsCh2[10].before(contentsCh2[2]);


console.log(contentsCh2);

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
advertisment.remove();
