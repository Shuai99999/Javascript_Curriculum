/*
 */

// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing module');

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// 这个add的名字是随便起的，它代表shoppingCart.js中的default变量
import add, { cart } from './shoppingCart.js';

add('pizza', 2);
add('bread', 5);
add('apple', 4);

console.log(cart);

// await新特性，可以工作在async函数之外，但必须得在module下使用
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();

//   return { title: data.at(-1), text: data.at(-1).doby };
// };

// const lastPost = getLastPost();
// console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

// 改写为下面的await写法
// 与上面的lastPost相比，lastPost2可以等待getLastPost执行完并得到其json结果
// 这种写法，被导入的模块是顶级等待，scirpt.js会等待shoppingCart.js全加载完，再执行scirpt.js它自己
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

// 这里先写个IIFE函数，在调用它，利用的是closure原理，具体参考前面的课程，相当于是利用函数的封装功能模拟了import一个module进来
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 237;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);

// CommonJS Modules
// 是一种比较旧的module写法，主要用于NodeJS中，了解即可
// Export 主要是export.关键字
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//   );
// };

// Import
// const { addToCart } = require('./shoppingCart.js');

// npm 是一种方便的js插件安装资源管理器
// 如果不小心遗失已安装的部分文件或目录，由于jason文件还在，可以通过npm i直接通过jason文件把遗失的东西自动安装回来
// 这样安装leaflet和lodash
// npm install leaflet
// npm install lodash
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// 使用bundle parcel后，可以这样简单的引入包
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { Loggin: true },
};
const stateClone = Object.assign({}, state);
// stateClone在栈内存中，即使在打印后定义它也是false
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
state.user.Loggin = false;
// 深度克隆，即使是在定义后打印，也是原来的true的样子
console.log(stateDeepClone);

// Bundling with parcel and NPM scripts
// npm i parcel --save-dev
// 这样操作绑定index.html页面
// npx parcel index.html

// 这个是热更新代码
// 加上这段后，能看到cart每次更新，数量都一直上涨，应该是热更新，老的不变再加入新的
if (module.hot) {
  module.hot.accept();
}

// 另外一种启动parcel的方法是npm run start 其中start是在package.json中手写的start那一行定义的名字
// 后来又加了build，build的时候需要把json里的这一行改为script.js才管用，npm build index.html
// "main": "clean.js", => "main": "script.js"

// 这一课讲babel转译，将新版本的ES6代码部分转为ES5或更久以前的代码，以便适应旧的浏览器
// 视频中说parcel会自动使用parcel，但实际现在已经不再默认支持，需要单独安装babel了
class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));

Promise.resolve('TEST').then(x => console.log(x));

// npm i core-js

import 'core-js/stable';
// 这样是只转译部分内容
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// npm i regenerator-runtime
import 'regenerator-runtime/runtime.js';
