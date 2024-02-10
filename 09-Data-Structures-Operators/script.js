'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
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
const { name, openingHours, categories } = restaurant;
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
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

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
