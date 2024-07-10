// Exporting module
console.log('Exporting module');

// Blocking code
console.log('Start fetching users');
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finish fetching users');

const shippingCost = 10;

// 在最后一个实验中单独要打印cart了，所以这里要在cart前加export
export const cart = [];

// 若想让其他文件能import到这的变量，需要在这个变量前加export
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
