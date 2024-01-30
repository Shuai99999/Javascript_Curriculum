'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');
// console.log(btnOpenModal);

for (let i = 0; i < btnOpenModal.length; i++)
  // console.log(
  btnOpenModal[i].addEventListener('click', function () {
    // console.log('Button Clicked');
    // 这里已经是选择好的class了，hidden是这个class的一个类，hidden前不要加点了，不像在在selector中
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
// );

// 关闭modal分开的写法，分别写点击x和overlay关闭的方法
// btnCloseModal.addEventListener('click', function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// });

// overlay.addEventListener('click', function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// });

// 合并写法
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  console.log(e.key);

  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closeModal();
    }
  }
});
