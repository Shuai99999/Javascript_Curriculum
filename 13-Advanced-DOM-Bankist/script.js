'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// 第一个功能，点击learn more即让浏览器跳到指定的页面位置
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // 打印section1的坐标
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // 打印这个事件本身的坐标（也就是learn more的坐标）
  console.log(e.target.getBoundingClientRect());
  // 打印当前窗口的坐标
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // 打印页面的真实尺寸，也就是浏览器的可见尺寸，如果此时把页面最大化或者调整大小等操作，这个地方会变
  console.log(
    'height/width view port',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // 这个scrollto方法是页面到顶+目标（也就是s1coords）距离当前显示器顶端（而不是页面真正的顶端）相对位置的方法，如果不加page补正，有时候就会滚动不准，这里的page就是显示器上面练习中窗口的坐标，他俩一结合就正常了
  // 这是个旧方法
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // 另一种旧方法
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // 新方法
  section1.scrollIntoView({ behavior: 'smooth' });
});

// 第二个功能，点击导航栏可以让页面平滑地移动到指定的标题上
// 笨方法
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     // 加这个就是把默认的跳转给禁了
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 先进方法
// 这个方法是先把querySelector定位到nav__links上，也就是三个nav_link的父节点上，利用bubbling原理监听父节点，再判断类名是nav__link的才触发指定动作
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/*
// Lectures
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// 创建和插入元素
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookie for improved functionality and analytics.';

message.innerHTML =
  'We use cookie for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';

// 将message放在header的开头
header.prepend(message);
// 将message放在header的结尾
// header.append(message);
// 复制message
// header.append(message.cloneNode(true));

// 将message放在header的之前，这个是放在header外面了，上面的pend是放在header里面
// header.before(message);
// 将message放在header的之后
// header.after(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // 这两种方法都能删除这个元素
    // message.remove();
    message.parentElement.removeChild(message);
  });

// 调整style
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// color和height这种都是inline style，这样打印显示不出来
console.log(message.style.color);
console.log(message.style.backgroundColor);

// 通过getComputedStyle就能显示出来了
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// 再通过这样修改message的高度，parseFloat的第二个参数10代表转换为10进制
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// 这里的--color-primary是css中的名字
document.documentElement.style.setProperty('--color-primary', 'orangered');

// 调整Attributes，alt和src都是标准属性，如果自己定义一个比如designer，这样是打印不出来的
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// 可以通过这样设置属性的值，再通过F12看元素已经变成这个值了
logo.alt = 'Beautiful minimalist logo';

// 非标准属性可以用getAttribute获取，setAttribute设置
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

// 第一个方法显示src的绝对路径，第二个显示相对路径
console.log(logo.src);
console.log(logo.getAttribute('src'));

// 公网链接的绝对和相对路径是一样的，本地链接是不一样的
const link = document.querySelector('.twitter-link');
// const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
// 只要在html中的属性是以data开头然后加-，后面的名字如果再有-就转为camelCase写法，就可以得到这个属性的值
console.log(logo.dataset.versionNumber);
console.log(logo.dataset.expName);

// 这个是用来操作一个对象的class的，一个对象可以有多个class
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');


const h1 = document.querySelector('h1');

// addEventListener是更好更先进的方式，1.addEventListener写多个不会出现覆盖的情况，而onmouseenter这种旧方法后面的会覆盖前面的，2.addEventListener是可以被取消的
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  // 加了这个remove以后上面的效果就只生效一次了
  // h1.removeEventListener('mouseenter', alertH1);
};
// 延迟生效的方法，配合setTimeout函数实现
h1.addEventListener('mouseenter', alertH1);
setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);
// h1.onmouseenter = function (e) {
  //   alert('onmouseenter: Great! You are reading the heading :D');
  // };
  
  
  const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());
// 这里的测试说明，即使只点击最底层的nav__link，它的父节点nav__links和nav也会跟着变色，即验证了上节课理论中的DOM元素bubbling原理
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // 注意：e.target是click发生的地方，而不是addEventListener所依附的地方，因此，三个e.target的打印结果是一致的
  // 而e.currentTarget就是addEventListener所依附的地方，即this
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // 停止传递，再点击就不会传导到两个父节点了
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

// 以上主要演示的都是bubbling过程，因为bubbling跟我们关系比较密切，而capturing实际能用到的场景很少，为了验证，可以在addEventListener增加一个true参数，那么它就会追踪capturing过程了，再点击nav__link在console里就会先显示NAV
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // true
);

*/
