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
const entries = Object.entries(openingHours);
console.log(entries);

// 循环entries，然后这里是把value又进一步结构成open和close了，好灵活...
for (const [key, { open, close }] of entries) {
  // console.log(x);
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
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
