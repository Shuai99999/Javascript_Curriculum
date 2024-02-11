'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// 在Enhanced Object Literals这一集中把openingHours单独提出来了
const openingHours = {
  // ES6增强特性3/3
  // thu: {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  // 甚至可以用公式
  sat: {
    // [`day-${2 + 4}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },
  // 从外部引入openingHours，ES6以前这样写，变量名和值一样了，不是太好
  // openingHours: openingHours,
  // ES6增强特性1/3，ES6之后增强对象文字写法，直接写上它的名字即可
  openingHours,

  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // ES6增强特性2/3，简化Object内的函数写法，跟上述老式写法相比，去掉了冒号和function
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // orderDelivery: function (obj) {
  //   console.log(obj);
  // },
  // 下列定义函数的方法效果跟上述效果基本一致，除了打印出来的是四个值而不是一个对象，相当于把参数直接解构了，
  // 同时可以给参数设置默认值，如果调用方没有传入这个参数的值，则使用默认值
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  // 第一个输入值自动变成主菜，剩下的是配菜
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// 结构数组
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// console.log(a, b, c);

// const [x, y, z] = arr;

// console.log(x, y, z);

// 只给两个占位符，就只解构出来数组里的前两个值
// const [first, second] = restaurant.categories;

// console.log(first, second);

// 如果需要1和3，就在2处加个空占位符
// let [main, , secondary] = restaurant.categories;

// console.log(main, secondary);

// 如果想互换两个变量的值也没必要设个中间变量捣腾了，直接用解构的方法复制即可
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// 解构函数中的结果
// console.log(restaurant.order(2, 0));
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// 解构数组中的数组，一样的原理
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// 给解构中不存在的变量设置默认值，防止出现undefined
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

// 解构object，应该使用大括号，原因是创建对象也是用的大括号
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// 给解构出来的对象里的属性直接改名
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// 给解构出来的对象属性加默认值
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };

// 如果以大括号开头，js语法会期望在大括号中是一个代码块，因此需要在最外层加一个小括号来避免这个问题
// ({ a, b } = obj);
// console.log(a, b);

// 解构对象中的对象
// const { fri } = openingHours;
// console.log(fri);

// 进一步解构这个对象中的值，注意左侧多一层大括号，同时也可以进一步给这俩值改名
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });

// // The Spread Operator
// const arr = [7, 8, 9];
// // const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// // console.log(badNewArr);

// const newArr = [1, 2, ...arr];
// console.log(newArr);

// // 直接分离数组就得到具体的值了而不是一个个带逗号的数组值
// console.log(...newArr);

// // 不动老数组直接得到一个新数组，而不需要把老数组展开或者使用往老数组加入值的方法了
// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // 拷贝一个数组，这里是浅拷贝
// const mainMenuCopy = [...restaurant.mainMenu];

// // 合并两个数组
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);

// // 循环迭代：数组，字符串，maps，sets，不含object
// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];
// console.log(ingredients);

// // 旧方法
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// // 新方法
// restaurant.orderPasta(...ingredients);

// // 复制一个Object并加入点新属性
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// // 复制一个Object，并尝试改一个属性，可以看到新老属性不同，证明确实复制出了新Object，但这是浅复制，深复制是需要一些额外插件的
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

// // Rest Pattern and Rest Parameters，这是与上面spread相反的操作，将分离的值合并成一个数组，三个点也从右边挪到了左边
// // SPREAD
// const arr = [1, 2, ...[3, 4]];

// // REST，从左侧开始数变量，a和b是一一对应的，剩下的就都放到others里了
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// // 同上，但是跳过了第二个变量，把1和3各放入一个变量，剩下的放入一个数组
// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // REST Object的时候，就不是按顺序了，把要对应的属性名取出来，剩下的放入...
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// // REST function，可变传入参数，自动合并成数组形式的
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// // 如果要给这个函数传入一个数组中的多个值，也不用单独拆开这个数组了，直接用...拆
// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

// // 用||，&&和??做逻辑短路

// // || 有一个是真，那就都为真，所以遇到第一个不是null或undefined就反馈第一个值
// console.log(3 || 'Jonas');

// // 这里第一个为空，所以返回第二个值
// console.log('' || 'Jonas');

// console.log(true || 0);

// // 两个都是假，那也只能返回第二个
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// // restaurant.numGuests = 23;
// // 判断numGuests存在则返回它的值，不存在则返回一个默认值10
// // 老式写法
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);
// // 新式写法
// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// // && 两个都是真才能返回真，只要第一个是假，直接短路返回第一个，第一个是真，返回第二个
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// // null是第一个假，所以返回null
// console.log('Hello' && 23 && null && 'jonas');

// // 通过&&避免下面这种if，先判断这个方法是否存在，再执行这个方法
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// // 新式写法如下，即先判断这个函数存在，再执行它
// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// // The Nullish Coalescing Operator 相当于NVL，如果左侧为空，则返回一个默认值
// // Nullish values只包含null和undefined，不包含0 ''等，如果如果它有一个值是0，那还是返回0
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests ?? 10;
// console.log(guests);

// // 继续练习逻辑赋值运算，Logical Assignment Operator
// const rest1 = {
//   name: 'Capri',
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// // rest1.numGuests = rest1.numGuests || 10;
// // rest2.numGuests = rest2.numGuests || 10;
// // 上述的||的更简洁写法
// // rest1.numGuests ||= 10;
// // rest2.numGuests ||= 10;

// // 同理，NVL写法简洁版，此时rest1里的值是0，就不会被改
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// // &&的用法，如果owner存在，则修改之，否则不动
// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

// // 循环数组的方法，The for-of Loop
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) {
//   console.log(item);
// }

// // 带index的循环一个数组，每个值都边生成为一个数组[index,value]
// for (const item of menu.entries()) {
//   console.log(item);
// }

// // 改变写法，循环两个变量，分别输出index和value
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }

// 把7个值合并成一个二维数组，注意多加了个中括号，否则它就不是一个大的二维数组，而是7个小数组
// console.log([...menu.entries()]);

// Optional Chaining，可选链
// 老式写法，分别判断mon和mon.open都存在，才打印，因为不判断直接打印会报错
// if (restaurant.openingHours.mon && restaurant.openingHours.mon.open)
//   console.log(restaurant.openingHours.mon.open);

// 新式写法，用?. 这就是opentional chaining
// console.log(restaurant.openingHours?.mon?.open);

// ?.小练习
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}`);
// }

// // 测试Object中的Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // 测试Arrays
// // const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];
// console.log(users[0]?.name ?? 'User array empty');

// Looping Objects, Object keys, values, entries
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;

// for (const day of properties) {
//   openStr += `${day}, `;
// }

// console.log(openStr);

// // 循环values
// const values = Object.values(openingHours);
// console.log(values);

// // entries对象
// const entries = Object.entries(openingHours);
// console.log(entries);

// 循环entries，然后这里是把value又进一步结构成open和close了，好灵活...
// for (const [key, { open, close }] of entries) {
//   // console.log(x);
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// // Set类型
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);

// console.log(ordersSet);

// // set一个字符串得到几个字母的单独拆开的set
// console.log(new Set('Jonas'));

// console.log(ordersSet.size);

// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// ordersSet.delete('Risotto');
// // ordersSet.clear();
// // set没有单独取出值到set之外的方法，因为set是唯一的且无顺序，即无index，想取出值正确的方法是使用数组
// console.log(ordersSet);

// for (const order of ordersSet) console.log(order);

// // set和数组互转
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// // 数组转Set
// // const staffUnique = new Set(staff);

// // 转set后再转回数组，相当于新生成了一个去重过的数组
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

// // 也可以直接算这个数组的size
// console.log(
//   new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
// );

// // 计算一个字符串的唯一字母数
// console.log(new Set('jonasschmedtmann').size);

// // Map类型
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portual'));

// // 也可以一次set多个值给map
// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');

// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// console.log(rest.has('categories'));
// rest.delete(2);
// // rest.clear();

// // 不能把数组直接写入在key处，不好使，因为这种对象都是放在栈中的，只是一个堆中的指针指向栈的，因此两处的[1,2]代表不同的对象
// // rest.set([1, 2], 'Test');
// // 正确做法是设置一个数组变量名
// const arr = [1, 2];
// rest.set(arr, 'Test');

// // 同样，可以将一个HTML元素设置为key，此时在console中，将鼠标悬停在key: h1上时，h1元素在html上会高亮
// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest);
// console.log(rest.size);

// // 可以用数组甚至更复杂的对象类型做key
// console.log(rest.get(arr));

// 数组转map，相当于不用set也可以往数组中插入值
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]);

// console.log(question);

// // Object转Map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // 这里与Object不同之处在于，Object的循环是需要.entries()的，因为Object本质上是不可循环的，而Map就不需要加entries了
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }

// // const answer = Number(prompt('Your answer'));

// // console.log(question.get(question.get('correct') === answer));

// // Map转Array
// console.log([...question]);
// console.log(question.entries());
// console.log([...question.keys()]);
// console.log(question.keys());
// console.log([...question.values()]);
// console.log(question.values());

// // 字符串string的一些操作技巧
// const airline = 'TAP Air Portugal';
// const plane = 'A320';

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('B737'[0]);

// console.log(airline.length);
// console.log('B737'.length);

// // 给出对应字母在字符串中的第一个位置，从0开始，类似instr
// console.log(airline.indexOf('r'));

// // 从后往前数
// console.log(airline.lastIndexOf('r'));

// // 不存在则返回——1
// console.log(airline.indexOf('portugal'));

// // 将字符串从4取到最后，类似substr
// console.log(airline.slice(4));
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//   const s = seat.slice(-1);
//   if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
//   else console.log('You got lucky 😎');
// };

// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

// // 字符串最初也像对象一样，它只是有字符串对应的方法，但在被创建之后，就变成了primitive的字符串类型
// console.log(new String('jonas'));
// console.log(typeof new String('jonas'));
// console.log(typeof new String('jonas').slice(1));

// // 大小写转换
// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // 首字母转大写
// const passenger = 'jONAS';
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// // 对比邮件地址
// const email = 'hello@jonas.io';
// const loginEmail = ' Hello@Jonas.IO \n';

// // const lowerEmail = loginEmail.toLowerCase();
// // const trimmedEmail = lowerEmail.trim();

// const normailizedEmail = loginEmail.toLowerCase().trim();
// console.log(normailizedEmail);

// console.log(email === normailizedEmail);

// // replace方法
// const priceGB = '288,97￡';
// const priceUS = priceGB.replace('￡', '$').replace(',', '.');
// console.log(priceUS);

// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';

// // 只替换第一个
// console.log(announcement.replace('door', 'gate'));
// // 全局替换方法1
// console.log(announcement.replaceAll('door', 'gate'));
// // 全局替换方法2
// console.log(announcement.replace(/door/g, 'gate'));

// const plane = 'Airbus A320neo';
// console.log(plane.includes('A320'));
// console.log(plane.includes('Boeing'));
// console.log(plane.startsWith('Airb'));

// if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
//   console.log('Part of the NEW Airbus family');
// }

// // 检查行李小练习
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();

//   if (baggage.includes('knife') || baggage.includes('gun')) {
//     console.log('You are NOT allowed on board');
//   } else {
//     console.log('Welcome aboard!');
//   }
// };

// checkBaggage('I have laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');

// // split和join
// console.log('a+very+nice+string'.split('+'));
// console.log('Jonas Schedtmann'.split(' '));
// const [firstName, lastName] = 'Jonas Schedtmann'.split(' ');

// const newName = ['Mr.' + firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// const capitalizeName = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];

//   for (const n of names) {
//     // 方法1
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     // 方法2
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(' '));
// };

// capitalizeName('jessica ann smith davis');
// capitalizeName('jonas schedtmann');

// // Padding
// const message = 'Go to gate 23!';
// console.log(message.padStart(20, '+').padEnd(30, '+'));
// console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// const maskCreditCard = function (number) {
//   // 数字转字符，效果同string()
//   const str = number + '';
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };

// console.log(maskCreditCard(324534556456));
// console.log(maskCreditCard(69804385693745));

// // Repeat
// const message2 = 'Bad weather... All departures Delayed...';
// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
// };

// planesInLine(5);
// planesInLine(3);
// planesInLine(12);

// MDN上有所有的string方法

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// challenge #1
// const [players1, players2] = game.players;

// console.log(players1);
// console.log(players2);

// const [gk, ...fieldPlayers] = players1;
// console.log(gk);
// console.log(fieldPlayers);

// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length} goals were scored`);
// };

// printGoals(...game.scored);

// team1 < team2 && console.log('team1 is more likely to win');
// team1 > team2 && console.log('team2 is more likely to win');

// challenge #2

// for (const [i, Player] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${Player}`);
// }

// const odds = Object.values(game.odds);

// let average = 0;

// for (const odd of odds) {
//   average += odd;
// }

// average /= odds.length;

// console.log(average);

// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `${game[team]}`;
//   console.log(`Odd of victory ${teamStr}: ${odd}`);
// }

// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1.
// // 我自己写的循环的太麻烦
// // const gameEventsSets = new Set();
// // for (const [gameEventsKey, gameEventsValue] of gameEvents)
// //   gameEventsSets.add(gameEventsValue);

// // const events = [...new Set(gameEventsSets)];
// // console.log(events);

// // 老师写的，直接用set.values()就把所有的value放到一个setIterator里了，然后三个点原地转array
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// // 2.
// gameEvents.delete(64);

// // 3.
// // array的pop方法取最后一个值
// const time = [...gameEvents.keys()].pop();
// const eventAvg = time / gameEvents.size;

// console.log(`An event happened, on average, every ${eventAvg} minutes`);

// // 4.
// for (const [min, event] of gameEvents) {
//   // 这种包含代码块{}的IF只能把输出写在代码块中，不容易复用代码
//   // if (gameEventsKey <= 45) {
//   //   const half = '[FIRST HALF]';
//   // } else {
//   //   const half = '[SECOND HALF]';
//   // }
//   // 老师写的这种简洁的IF可以直接复用half变量，省事
//   const half = min <= 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${half} HALF] ${min}: ${event}`);
// }

// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const button = document.querySelector('button');
button.addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  // console.log(rows);
  for (let [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    let output = first + second.replace(second[0], second[0].toUpperCase());
    // console.log(output);
    output = output.padEnd(20, ' ') + '✅'.repeat(i + 1);
    console.log(output);
  }
});
