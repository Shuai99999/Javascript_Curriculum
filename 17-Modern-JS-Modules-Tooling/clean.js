const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Object.freeze 是让这个对象的值不可变，类似于const
// 这样即使后续对spendingLimits里面再加新对象也加不进去了
// 但编辑旧元素是可以的，只是不能加入新元素
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limit, user) => spendingLimits?.[user] ?? 0;

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? // budget.push({ value: -value, description, user: cleanUser });
      // 因为budget被freeze了，所以需要用下面这种方法解构产生一个新数组，再往里加个值的方式
      [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// const checkExpenses2 = function (state, limits) {
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//   //   for (const entry of newBudget3)
//   //     if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
//   // };
// };

// 以下将checkExpenses改为箭头函数写法
const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );
//   for (const entry of newBudget3)
//     if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // 也可以使用reduce来实现
  //   .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');
  // console.log(bigExpenses);

  // let output = '';
  // for (const entry of budget) {
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''; // Emojis are 2 chars
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 500);
