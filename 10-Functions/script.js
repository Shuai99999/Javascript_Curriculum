'use strict';

/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // 以下这种是在ES5中的做法，在ES6中，可以像上方那样在传入参数中直接加默认值，甚至可以做传入参数之间的算式赋值
  // 如果这样做算式的话，numPassengers必须要在price之前，否则无法生效，因为price依赖numPassengers
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
// 在这种情况下，如果想跳过numPassengers直接传入price，则可以给numPassengers传入一个undefined，此时numPassengers的结果就还是1
createBooking('LH123', undefined, 1000);


const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  
  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);
// 上述原理同之前讲过的，原始数据类型是在堆中全新生成的一个变量，而引用数据类型则是在堆内有一个指向栈中的同一个引用地址，
// 因此flighNum是新生成的，flight还是老的不变，而jonas是引用，新老object的name都指向同一个地址，改一个就都变了
// 因此该操作也与如下操作具有同样效果
const flighNum = flight;
const passenger = jonas;

// 因此，这样修改jonas的passport就会提示Wrong passport!
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
console.log(jonas);


const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

// 这里return里的others的三个点，如果不加...返回结果里会多几个逗号，对rest掌握还不牢固，具体待测试
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// 这个例子，入参是函数，调用其它函数的函数就被成为高级别函数
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  // 入参函数可以有多个属性，例如name
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('🐥');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// 改写为箭头函数练习，内容不变
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

const greetHey = greet('Hey');
greetHey('Jonas');
greetHey('Steven');

greet('Hello')('Jonas');

greetArr('Hi')('Jonas');


const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // ES6中在对象内定义函数的新写法，参考上一单元的新特性2/3
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
      );
      this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
  };
  
  lufthansa.book(239, 'Jonas Schmedtmann');
  lufthansa.book(635, 'John Smith');
  console.log(lufthansa);
  
  const euroWings = {
    airline: 'Eurowings',
    iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// 运行失败，因为this关键字仍旧指向lufthansa对象
// book(23, 'Sarah Williams');

// 正确的调用方法有三种，call，apply，bind
// 1.call方法，call的第一个参数传入euroWings，这样this就指向euroWings了
book.call(euroWings, 23, 'Sarah Williams');
console.log(euroWings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// 2. apply方法，传入对象和array形式的参数
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
// 但上述方法在现代编程中已很少使用，更多的是下列方法，仍调用call但以spread方法传入数组的值
book.call(swiss, ...flightData);
console.log(swiss);

// 3.bind方法
const bookEW = book.bind(euroWings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

// 也可以绑定第一个参数，后续调用只需要传入第二个参数即可
// 专业术语叫做partial application，偏函数应用？也就是23被predefined了
const bookEW23 = book.bind(euroWings, 23);
bookEW23('Jonas Schedtmann');
bookEW23('Martha Cooper');

// 例如在下列场景中，partial application就很实用
// 先给lufthansa加了俩元素
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// lufthansa.buyPlane();
// 如果直接这样调用lufthansa.buyPlane，那么只会返回addEventListener相关内容（this），以及NaN（Not a Number）因为this指向的父对象已经不是lufthansa而是addEventListener
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// 因此，正确的调用方法如下
// 不用call而用bind，因为call是直接调用，而bind是先返回一个新的函数，给addEventListener来调用
document
.querySelector('.buy')
.addEventListener('click', lufthansa.buyPlane.bind(lufthansa));


// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// 此时如果想加把0.1改为0.23，那么可以把原本第一个应该传入函数名称的地方设置为null，因为这个例子不涉及this关键字，第一个值设置为什么都行，但是null是一个标准做法
const addVAT = addTax.bind(null, 0.23);
// 效果等同于如下，该方法与给入参设置默认值不同的意义在于，bind是新生成一个函数
// const addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));

// 用return function的方式改写如下
// 我写的
const addTaxReFunction = function (rate, value) {
  return value + value * rate;
};

const addVATReFunction = function (value) {
  return addTaxReFunction(0.23, value);
};

console.log(addVATReFunction(100));
console.log(addVATReFunction(23));

// 老师写的
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));


///////////////////////////////////////
// Coding Challenge #1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(`${this.question}\n${this.options.join('\n')}`)
      );
      
    //   // 这段是我写的
    //   answer === 0 || answer === 1 || answer === 2 || answer === 3
    //   ? this.answers[answer]++
    //   : alert('You type wrong number!');
    //   // console.log(typeof this.answers);
    //   displayResults(this.answers);
      
    //  // 这段是老师写的
     typeof answer === 'number' &&
     answer < this.options.length &&
     this.answers[answer]++;
     this.displayResults();
     this.displayResults('string');
    },
    displayResults(type = 'array') {
      if (type === 'array') {
        console.log(this.answers);
      } else if (type === 'string') {
        console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
.querySelector('.poll')
.addEventListener('click', poll.registerNewAnswer.bind(poll));

// TEST DATA 1
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

// TEST DATA 2
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });


// Immediately Invoked Function Expression，简称IIFE，其实就是匿名函数，一次性调用
// 这种函数的存在另一方面也是为了控制变量的范围，在IIFE中的变量出了函数就没法用了，不过在现代JS中，已经很少用这种方式控制variables scope了，基本还是用它来做一次性调用匿名函数的
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// 这个结果运行不存在
// console.log(isPrivate);

// 箭头匿名函数的写法如下
(() => console.log('This will ALSO never run again'))();


// closure
// 这个特性按照如下例子解释，booker会调用secureBooking中的return这个函数，并且使用passengerCount=0这个变量
// 按照正常的JS引擎顺序，首先加载secureBooking，然后调用booker，但在调用booker的时候，第一步加载的secureBooking上下文已经消失
// 按道理就会找不到secureBooking中的passengerCount = 0，但是由于这个closure特性的存在，passengerCount = 0会被带入到booker中
// 且这个passengerCount = 0的优先级很高，即使此时设置一个外部全局变量const passengerCount = 10，
// 得到的结果仍然是使用secureBooking上下文变量的passengerCount=0，结果仍然是1，2，3，而不是11，12，13
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// 这里测试，不管这个变量等于啥，都会优先使用secureBooking上下文变量的passengerCount=0，结果仍然是1，2，3，而不是11，12，13
// const passengerCount = 10;

const booker = secureBooking();

// 在这三次调用中，同样的道理，后两次调用都使用前一次执行中的passengerCount值，
// 虽然前一次booker的上下文已消失，但其passengerCount仍然存在，且其值也被保留，所以结果才会是1，2，3，而非1，1，1
booker();
booker();
booker();

// 通过这个console.dir方法，可以打印出后台过程中涉及到的一些东西，包括scope->closure->passengerCount的值的变化
console.dir(booker);

*/

// closure的更多例子
// 这里的f必须声明一下，不管让它等于当时都不影响后面结果
// 例子1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
// 这里f被重新分配为777x2了
h();
f();
console.dir(f);

// 例子2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`We will start boarding in ${wait} seconds`);
};
boardPassengers(180, 3);
