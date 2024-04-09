'use strict';
/*
// 写构造函数不能用箭头函数，只能用常规函数或函数表达式，因为箭头函数没有this关键字，而这里构造函数需要用到this关键字
// 不要在构造函数中创建函数，否则如果以它为原型的对象太多的话，每个函数都会被复制一份，性能会很差
// 如果要定义函数，也是要加this的
// this.hey = function () {
//   console.log('Hey there 🤞');
// };
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// 查看jonas是否是Person类型的
console.log(jonas instanceof Person);

Person.hey = function () {
  console.log('Hey there 🤞');
};

Person.hey();
// 这里会报错因为hey不在jonas的原型中，如果之前hey方法定义在原型中，就可以正常执行了，当然通过Person.prototype.calcAge这样创建也是可以的
// jonas.hey();

// prototype
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// Person.prototype是否是他们仨的原型，最后一个不是
// 因为，jonas的原型是Person.prototype的构造函数的资产（property）
// 构造函数和new出来的对象之间就是通过__proto__相关联的
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// 第二个是false，因为只有明确在构造函数中写明的属性才算true，而species是在prototype中加入的，相当于是隐含的属于他们的一个属性了
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__);
// 这里相当于是prototype的chain，可以看到前面引用过的hasOwnProperty等属性
console.log(jonas.__proto__.__proto__);
// 再来一层结果就是null了，上一层已经到头了
console.log(jonas.__proto__.__proto__.__proto__);

// 这个构造函数属性，当然就是把函数本身打印出来了
console.log(Person.prototype.constructor);
// 这样可以看到更详尽的属性，包括后来隐式定义的species等
console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3];
// 这里数组的所有方法都被打印出来
console.log(arr.__proto__);
// 它俩相等，还是那个原理，数组的prototype属性等于所有被它创造出来的对象（也就是具体的新数组）的原型
console.log(arr.__proto__ === Array.prototype);

// 这里就是prototype的方法了，套娃
console.log(arr.__proto__.__proto__);

// 例如，这里直接改写Array的原型，加个unique方法
Array.prototype.unique = function () {
  // 这里的this即代表后续要调用它的那个函数
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
// 这里展开可以看到HTML元素的各个节点，即DOM的解构，可以往下6-7层，每一层都有自己的prototype，然后继续往下展开
console.dir(h1);

// 随便写个函数，打印它的dir，可以看到与函数有关的各种方法和原型，例如apply bind call
console.dir(x => x + 1);

// Chanllenge #1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  return (this.speed += 10);
};

Car.prototype.brake = function () {
  return (this.speed -= 5);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

console.log(car1);
console.log(car1.accelerate());
console.log(car1.brake());

console.log(car2);
console.log(car2.brake());

// ES6的class写法
// 两种写法都可以，在JS中，class本质上就是一种特殊的function
// const PersonCl = class {};

// 写法2
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // class内的函数应写在constructor以外，以下方法都会被加入到原型中，等价于之前第26行的方法，也不可以继承，称为Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }
  // getter和setter方法有时很有用，这里写了一个检查是否是全名是否包含空格的方法
  set fullName(name) {
    console.log(name);
    // 因为fullName是方法名，_fullName是属性名，如果定义相同的方法和属性名，且还为该属性赋值方法的参数，那么在set方法自动调用时，fullName会一直重复调用直到堆栈溢出
    // 而下划线开头约定俗成是临时变量名，实际上这里换成什么名字都行
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // static方法
  static hey() {
    console.log('Hey there 🤞');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);

console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);
jessica.greet();

// 说明：
// 1. Classes are Not hoisted 意思是 不能在定义前就使用它，不像函数那样，可以先使用而后在代码中定义
// 2. Classes are first-class citizens 这是之前学过的概念，意思是class可以作为函数入参和函数返回值，它本质上也是一种特殊的函数
// 3. Classes are executed in strict mode 即使你不在js文件中写明，所有的class也会自动运行在strict mode下

// getter和setter
// 这里不写White就报错了，验证上面的setter
const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// 调用的时候就像调用一个属性一样，而不是一个方法()
console.log(account.latest);
account.latest = 50;
console.log(account.movements);
*/

// 写法3，Object.create法，用的不多但要理解
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
