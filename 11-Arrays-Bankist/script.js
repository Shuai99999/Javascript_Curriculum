'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// 这里讲到一个好的编程习惯，不要让全局变量满天飞，尽可能把同一逻辑中的变量放在一个函数中，做到作用域隔离
const displayMovements = function (movements) {
  // 这里是去掉原有的2行实例html代码
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    // 这里的方法就是在指定元素的后面开始，每个for循环一个个插入输入的数组的数字
    // 如果这里改为beforeend，那么数字效果就会倒置
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// 将用户名转换为首字母并小写
const createUsernames = function (acs) {
  accounts.forEach(function (acc) {
    // 等于直接在acc里新增了一个属性username
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // 如果button在form中，点击button会自动刷新页面，页次下面打印的LOGIN会一闪而过，因此需要用这个prevent方法，取消掉这个事件本身的默认属性
  e.preventDefault();
  // console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log(currentAccount);
    // 打印欢迎信息
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // 清空右上角账号密码和取消聚焦
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount.movements);
    calcDisplaySummary(currentAccount);
  }
});
// console.log(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice，都是新生成一个array，而非改变原array
// 从2开始截到最后，也就是cde，这个是生成一个新array而不是修改老array
console.log(arr.slice(2));
// 截取2和3，左闭右开
console.log(arr.slice(2, 4));
// 可以定义一个negative begin index，从后往前截
console.log(arr.slice(-2));
console.log(arr.slice(-1));
// 从第1位截到倒数第2位
console.log(arr.slice(1, -2));
// 直接拷贝一个array，和用spread效果是一样的
console.log(arr.slice());
console.log([...arr]);

// splice，都是修改原array了，与slice不同
// // 从第2位开始截到最后
// console.log(arr.splice(2));
// // 原array只剩下前2位了
// console.log(arr);
// // 同理，切掉最后一位
// console.log(arr.splice(-1));
// console.log(arr);

// // 这里切掉第2和第3个元素，注意左右都是闭区间
// arr.splice(1, 2);
// console.log(arr);

// REVERSE 这个也是在原array基础上修改了
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// concat
// 下面的concat合并与两个...是同样效果
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// join
console.log(letters.join(' - '));


// at
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// 取最后一个元素
console.log(arr[arr.length - 1]);
// 如果不加[0]返回的就是一个数组
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('jonas'.at(0));
console.log('jonas'.at(-1));


// foreach with array
// 普通的for循环数组
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
  // 此时改写为需要带序号的方法
  for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
      console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    }
  }
  
  // foreach方法版本
  // foreach需要一个回调函数跟在它后面，foreach循环出来的每个数组值都作为回调函数的入参，回调函数告诉foreach每次循环具体做什么
  // 从概念上讲，foreach是high order function
  // foreach的回调函数可以有三个入参，不管这些入参叫什么名字都无所谓，它们的顺序是固定的，第一个总是循环的具体元素，第二个是序号从0开始，第三个是它的entry形式，可以只设置一个或两个入参都没问题，注意顺序即可
  // 与for of loop的区别，主要在于，foreach的步骤是无法被进一步拆分的，而for of loop是可以支持continue和break这样的操作
  console.log('----FOREACH----');
  movements.forEach(function (mov, i, arr) {
    if (mov > 0) {
      console.log(`Movement ${i + 1}: You deposited ${mov}`);
    } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    }
  });
  
  
  // for each with maps and sets
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
  });
  
  const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
  console.log(currenciesUnique);
  // 对于map类型来说，它并没有key和index这一说，因此打印出它的key和value是一致的，其实key就相当于是个废的参数
  // 因此在JS中，可以用下划线_来代替这个key的位置，在JS中，下划线代表没有用的参数，throwaway variable，相当于一个入参的占位符
  currenciesUnique.forEach(function (value, _, map) {
    console.log(`${value}: ${value}`);
  });
  
  
  ///////////////////////////////////////
  // Coding Challenge #1
  
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀

const checkDogs = function (dogsJuliaCats, dogsKate) {
  const dogsJulia = dogsJuliaCats.slice(1, -2);

  // const dogs = [...dogsJulia, ...dogsKate];
  const dogs = dogsJulia.concat(dogsKate);

  dogs.forEach(function (dog, i) {
    const res =
      dog >= 3
        ? `Dog number ${i + 1} is an adult, and is ${dog} years old`
        : `Dog number ${i + 1} is still a puppy 🐶`;
    console.log(res);
  });
};

// TEST DATA 1
// const dogsJuliaCats = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// TEST DATA 2
const dogsJuliaCats = [9, 16, 6, 8, 3];
const dogsKate = [10, 5, 6, 1, 4];

checkDogs(dogsJuliaCats, dogsKate);


//  map filter reduce
// map方法
// 相比for再push，MAP是一种更现代的方式
// map也是有 mov i arr三个入参
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// 箭头函数的map
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

// 将之前的逻辑改为map写法，其在原理上的区别是，for each是一个个分别输出到页面的，map是生成一个新数组，最后一把输出到页面的
const movementsDescriptions = movements.map((mov, i, arr) => {
  console.log(
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
      )}`
  );
});

// filter 方法
// 也是有3个入参mov, i, arr
const deposits = movements.filter(function (mov, i, arr) {
  // 这里小技巧，是true则返回，那么就只返回>0的了
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// 箭头函数写法
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// reduce 方法
// reduce像滚雪球一样把一个array里的数据一个个滚到一起
// 它比其他方法多一个入参，第一位acc就是那个被累计的雪球
// acc是每一步加起来的，但是到了最后一步acc和最后一个值cur还没相加，所以return应该是acc+cur而不是acc
// 最后在函数外还有一个起始值需要设置，一般情况下都为0就可以，但是后面也有例子不为0的，需要注意场景
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

// 箭头函数写法
const balanceArror = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balanceArror);

// for写法
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// 用reduce查找最大值的函数练习，起始值不要写0，而要用数组的第一个值，因为起始值有可能是负数
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

// Chaining Method 方法链，叫PIPELINE也挺形象
// 在chaining method中DEBUG是有点麻烦的，可以在每一步中打印cur和i来观察
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
  
  console.log(totalDepositsUSD);
  
  
  // find 方法
  // 与filter的区别，1.find只返回符合条件的第一个值，而filter返回一个符合条件的数组中的全部值，2.find是返回一个元素，而filter是返回一个数组
  // 所以find通常是用于查找一个数组中的唯一值
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

// 查找符合条件的owner
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

*/
