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

// 第二个功能，实现tab框
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// 性能优化知识点：这里虽然能够实现遍历所有的tabs，但是如果此时页面tabs数量较多例如几百个，这种方式会拖慢页面的性能
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// 正确的做法是选择父节点container然后利用bubbling原理，给父节点加个事件，那么操作子节点自然会反馈到父节点身上，而我们的函数只是作用在父节点上的，因此性能比直接循环子节点要好很多
tabsContainer.addEventListener('click', function (e) {
  // 由于2和3被隐藏，直接点击e.target只能返回span元素，所以还要继续获取它们的父节点元素e.target.parentElement
  // 但是1的父元素又跟2 3不一样，所以正确的解决方法应该是closest，因为closest可以找到最近的名字为xxx的父元素
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // 这里加一句Guard clause 保护语句，当鼠标点击在container的其他部分有可能返回结果为空，例如p标签上，后台会报错
  // 为了屏蔽掉这个错误，加这么一句，返回父元素为空的地方立即return结束这个函数
  if (!clicked) return;

  // 在每次点击之前，先确保所有的框框都是inactive的
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // 上面把标签弄好了，接下来调整内容区域
  // 这里利用之前学过的dataset原理，取标签对应的123，即对应内容区域class里的名字里的123
  // console.log(clicked.dataset.tab);
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// 第三个功能，导航栏的渐渐淡出(fade)效果
const nav = document.querySelector('.nav');
// 这里使用mouseover，其与mousenter最大的区别是，mouseover能够利用bubbling特性
// 最初的写法，有大量的重复代码
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

// 改版1，让代码更dry一些
// const handleHover = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = opacity;
//     });
//     logo.style.opacity = opacity;
//   }
// };

// 这里不能直接传入handleHover(e, 0.5)，因为代码不认识e
// nav.addEventListener('mouseover', handleHover(e, 0.5));
// nav.addEventListener('mouseout', handleHover(e, 1));

// 而应该传入一个function
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// 改版2，引入bind，复习：bind，call，apply这仨作用是复制一个函数的功能，但改变其上下文，简而言之就是改变它里面的this的指向
// 此时不需要设置opacity这个入参了，直接让this传进去，这种情况下入参就是这个事件本身
// 这样用bind方法改写后，如果给addEventListener的第二个入参这个函数想传入多个值就可以用数组的形式
// 这对于handleHover只能传入一个值的情况是一种解决思路
const handleHover = function (e) {
  // 这个e就是addEventListener的event，注意只有这种页面操作的函数有event，你自己手写一个函数是没有event的（undefined）
  // e.target是事件触发的元素，而e.currentTarget标识是当事件沿着 DOM 触发时事件的当前目标
  // console.log(this, e.target, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// 这里的0.5和1看似是一个入参，其实不是入参，而是传入的上下文this，这时候handleHover是无法传入参数的
// 这个handleHover它只需要一个入参e，就老老实实用原函数默认写的e
// 而handleHover在上下文已经变成addEventListener的了，所以它的e也就是addEventListener的e
// 因此后续e.target, e.currentTarget就是鼠标悬停的对象
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// 第四个功能，让导航栏始终在页面顶端，不管页面怎么划动，sticky navigation
// 这个事件在window中，而不是document了，只要划动页面，就会触发后面的function
// 这个特性的性能不怎么好，所以尽量避免使用它
// 下面这个是笨方法的部分演示，就不完整的学它的代码了
// window.addEventListener('scroll', function (e) {
// console.log(e);
// scrollY是划动的位置距离页面顶端的距离
//   console.log(window.scrollY);
// });

// 下面是新方法
// 首先是讲解演示observer
// 回调函数有2个传入值，entries就是所触发的临界值threshold的一组内容它是个数组，包括了互动的目标、是否互动、比例等
// observer就是所互动的section1，在这个例子中用不上所以没有具体使用
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   // 这个root是与之前传入的section1要交互的对象，这里传入null就是与viewpoint交互的意思
//   root: null,
//   // 这个临界值的意思是，指定的部分（这个例子中是section1）有多少比例的部分与root部分交互，则触发回调函数
//   // 在这个例子中的意思就是，section1与viewpoint之间交叉10%，则触发打印entry
//   // threshold: 0.1,
//   // 设置一个数组，例如2个临界值，那么在触发这两个临界值的时候都会打印entry
//   threshold: [0, 0.2],
// };

// 交互观察者需要一个回调函数和一组传入值，传入值是对象类型的
// 第一步先new一个observer
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // 第二步使用observe方法，并指定需要监控的对象section1
// observer.observe(section1);

// 下面是具体实现
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  // 这样就是让nav一直锁定在页面顶端
  // nav.classList.add('sticky');
  // 这样是有选择性的锁定，只有viewpoint超过header部分才会锁定
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // 与上面的if有条件锁定对应，加上下面这个，会留白90px提前锁定
  // 与threshold不同的是，这样设置不管从下往上还是从上往下划，都会向上留白90px
  // rootMargin: '-90px',
  // 这样来动态获取nav的高度
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// 第五个功能，各个section随着划动渐渐清晰可见
const allSelections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // 已经被observer过的对象就不再observe，这样再次划动到已经显示出来的section也不会打印日志了
  // 这就用到了之前没用到古的observer这个入参;
  observer.unobserve(entry.target);
};

const sectionOjserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSelections.forEach(function (section) {
  sectionOjserver.observe(section);
  // section.classList.add('section--hidden');
});

// 第六个功能，将原本模糊的图片清晰化显示
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  console.log('load pic');
  // 下面这句直接写性能不好，因为图片还没加载完就触发了remove
  // entry.target.classList.remove('lazy-img');
  // console.log('remove');
  // 因为整个页面全部加载完后会自动放出一个load事件，因此监听这个load事件，当图片在上一步被设置为清晰的src后待图片下载完再触发remove动作，避免不必要的JS动作
  entry.target.addEventListener('load', function () {
    console.log('before');
    entry.target.classList.remove('lazy-img');
    console.log('after');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // 加下面这个是为了提前200像素就把图像清晰化
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// 第七个功能，轮播图

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // 在图片上增加4个点点
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // 按左右键可翻页
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  // 点任意一个点点，可以翻到指定的图片上
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
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


// 遍历DOM对象
const h1 = document.querySelector('h1');

// 向下遍历子节点
// 这种以前就知道的方法，就可以列出h1的子节点中class为highlight的
console.log(h1.querySelectorAll('.highlight'));
// 下面是新方法
// 列出所有类型的子节点
console.log(h1.childNodes);
// 仅列出HTML类型的子节点
console.log(h1.children);
// 选中并修改第一个和最后一个元素的颜色
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// 向上遍历父节点
console.log(h1.parentNode);
console.log(h1.parentElement);

// 选择离h1最近的class名为header的元素，并改背景颜色
// 与querySelector或querySelectorAll不同，closest是向上找父节点
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// 查找同级别元素 sibling元素
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// 这两种方式是直接返回text类型的结果，但不常用，基本还是用上面两个方法
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// 如果想获取同级别所有元素，则先获取父元素的位置，再获取该父元素的所有子元素
console.log(h1.parentElement.children);
// 这个结果是一个数组，遍历这个数组并做处理
[...h1.parentElement.children].forEach(function (el) {
  // scale(0.5)是将该元素缩小50%
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

*/

// DOM生命周期事件
// DOMContentLoaded这个事件仅在HTML和JS加载后就触发，其他的图片之类的不管
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// load事件是所有的资源包括CSS等外部资源都加载完才触发
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// 在用户离开这个页面前触发，例如用户X掉了这个页面
// 可以用于询问是否要退出页面
window.addEventListener('beforeunload', function (e) {
  // 某些浏览器要求需要prevent
  e.preventDefault();
  console.log(e);
  // 由于历史原因还需要给它一个returnvalue，这里可以写弹出框的message
  e.returnValue = '';
});
