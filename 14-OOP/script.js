'use strict';

// 写构造函数不能用箭头函数，只能用常规函数或函数表达式，因为箭头函数没有this关键字，而这里构造函数需要用到this关键字
// 不要在构造函数中创建函数，否则如果以它为原型的对象太多的话，每个函数都会被复制一份，性能会很差
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

// prototype
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
