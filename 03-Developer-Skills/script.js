// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const x = '23';
// if (x === 23) console.log(23);

// const calcAge = birhtYear => 2037 - birhtYear;
// console.log(x);

const arr1 = [17, 21, 23];
const arr2 = [12, 5, -5, 0, 4];

function printForecast(arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str += `...${arr[i]}℃ in ${i + 1} days`;
    // console.log(`...${arr[i]}℃ in ${i + 1} days`);
  }
  str = str + '...';
  console.log(str);
}

printForecast(arr1);
printForecast(arr2);
