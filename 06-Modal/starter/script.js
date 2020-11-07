'use strict';

let modalWindow = document.querySelector('.modal');
let closeModelButton = document.querySelector('.close-modal');
let overlay = document.querySelector('.overlay');
let showModalList = document.querySelectorAll('.show-modal');

const openModel = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModel = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < showModalList.length; i++) {
  showModalList[i].addEventListener('click', openModel);
}

closeModelButton.addEventListener('click', closeModel);

overlay.addEventListener('click', closeModel);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModel();
  }
});
