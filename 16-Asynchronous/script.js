'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags['png']}" />
    <div class="country__data">
      <h3 class="country__name">${data.name['common']}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${Object.values(
          data.languages
        )}</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0]['name']
      }</p>
      </div>
      </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // 这句放在捕获异常的finally里了
  // 后来在做challeng1的时候又comment out出来了
  countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    
    // render country 1
    renderCountry(data);
    
    // get neighbour country (2)
    const [neighbour] = data.borders;
    console.log(neighbour);

    if (!neighbour) return;
    
    // Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');


// const getCountryData = function (country) {
  //   fetch(`https://restcountries.com/v3.1/name/${country}`)
  //     .then(function (response) {
    //       console.log(response);
    //       // 上面的response打印出来就是我们需要的数据，它的数据类型是response
    //       // 下面这个response.json还是一个promise，老师也不知道为什么这样设计，总之就是这样
    //       // 由于它是promise类型，因此再往下还可以继续then
//       return response.json();
//     })
//     .then(function (data) {
  //       // 到这里，data就是array类型了
  //       console.log(data);
  //       renderCountry(data[0]);
  //     });
  // };
  
  */

// 以下为简洁写法，去掉了打印日志并使用箭头函数
// AJAX的promise的写法总体更简洁，取代了之前的XMLHpptRequest的open send和后面的addEventListener等大量代码

const getJSON = function (url, errorMsg = 'Something went wrong') {
  // 注意下面这个return，必须加上它，这个函数才相当于是返回一个promise，否则后续调用它的时候会无返回值而报错
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

/*
// const getCountryData = function (country) {
  //   // Country 1
  //   fetch(`https://restcountries.com/v3.1/name/${country}`)
  //     .then(response => {
    //       // console.log(response);
    //       // 这里的throw error仅是针对这一步抛出自动以的错误信息，避免直接抛出后台错误，显得不安全，其中response.status就是404等响应状态码
//       // 这个错误最终是被传递到catch部分被抛出的
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
  //       renderCountry(data[0]);
  //       const neighbour = data[0].borders[0];
  //       if (!neighbour) return;
  
  //       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     // 注意，下面的then不要写在上面的return后面，而是要写在外面一层大括号圆括号外，否则又变成callback hell了
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     // 这里的catch是可以捕获上面所有的错误的，相当于一个全局的catch
//     .catch(err => {
  //       console.error(`${err} 🧨🧨🧨`);
//       renderError(`Something went wrong 🧨🧨 ${err.message}. Try again!`);
//     })
//     // finally是不管上面的promise执行正确还是错误都会被执行的部分
//     .finally(() => {
  //       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
  .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    // 注意，下面的then不要写在上面的return后面，而是要写在外面一层大括号圆括号外，否则又变成callback hell了
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    // 这里的catch是可以捕获上面所有的错误的，相当于一个全局的catch
    .catch(err => {
      console.error(`${err} 🧨🧨🧨`);
      console.log(err);
      renderError(`Something went wrong 🧨🧨 ${err.message}. Try again!`);
    })
    // finally是不管上面的promise执行正确还是错误都会被执行的部分
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
  };

  btn.addEventListener('click', function () {
    getCountryData('portugal');
  });

///////////////////////////////////////
// Coding Challenge #1


// In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

// Here are your tasks:

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
// The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

// GOOD LUCK 😀


const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  .then(function (response) {
    // console.log(response);
      if (!response.ok)
      throw new Error(`Problem with geocoding ${response.status}`);
    // if (!response.redirected)
    //   throw new Error(`You are calling too fast! ${response.status}`);
      return response.json();
    })
    .then(function (data) {
      if (data.city.includes('Throttled'))
      throw new Error('You are calling too fast!');
    console.log(`You are in ${data.city}, ${data.country}`);
    return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(function (response) {
      if (!response.ok)
      throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.log(err.message);
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);


// Event Loop in Practice
// JS只有单进程没有并发，所有事件会按一定顺序扔到Event Loop里顺序执行
// 其中像AJAX的Promise是Mirco event loop，它具有更高的优先级，只要不断有新的Mirco event loop插进来，理论上它就会一直阻塞排在它后面的正常的Event Loop事件
// 以下是Mirco event loop的例子

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i++; i < 100000000000000000) {}
  console.log(res);
});

console.log('Test end');


// new Promise是个标准的方法，它有通过resolve和拒绝reject两个输入
// 也可以像下面两行这样单独使用
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening! ✨');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🧧');
    } else {
      reject(new Error('You lost your money 🎃'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisfying setTimeout
// 将原本这样写的timeout函数，用primise改写，这样可读性更强一点，不用套一层一层的了
// setTimeout(() => {
//   console.log('I waited for 1 seconds');
//   setTimeout(() => {
//     console.log('I waited for 2 seconds');
//     setTimeout(() => {
//       console.log('I waited for 3 seconds');
//       setTimeout(() => {
//         console.log('I waited for 4 seconds');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('I waited for 1 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 3 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 4 seconds');
    return wait(1);
  });

  
  // 将geolocation改写为promise的写法;
  // promise存在的意义就是为了把复杂的异步给写成同步的样子，可读性更强
  // navigator.geolocation.getCurrentPosition(
    //   position => console.log(position),
//   err => console.error(err)
// );
// 因为上一步里的获取位置是被异步调用的，因此会先打印下面的Getting position
// console.log('Getting position');

// promisfy改写后
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    // 上面三行可以进一步简化为下面这一行
    // 因为打印的东西可以在后面的then中体现，而getCurrentPosition的第二个入参默认就是个报错，所以直接传err即可
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

// 把上一个测试题也改写promisfy
const whereAmI = function () {
  getPosition()
  .then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  })
  .then(function (response) {
    // console.log(response);
    if (!response.ok)
    throw new Error(`Problem with geocoding ${response.status}`);
  // if (!response.redirected)
  //   throw new Error(`You are calling too fast! ${response.status}`);
  return response.json();
})
.then(function (data) {
  if (data.city.includes('Throttled'))
  throw new Error('You are calling too fast!');
console.log(`You are in ${data.city}, ${data.country}`);
return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
})
.then(function (response) {
  if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.log(err.message);
    });
};

btn.addEventListener('click', whereAmI);


///////////////////////////////////////
// Coding Challenge #2


// Build the image loading functionality that I just showed you on the screen.

// Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

// If this part is too tricky for you, just watch the first part of the solution.

// PART 2
// 2. Comsume the promise using .then and also add an error handler;
// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
// 5. After the second image has loaded, pause execution for 2 seconds again;
// 6. After the 2 seconds have passed, hide the current image.

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

// GOOD LUCK 😀


// const getPicture = function (picUrl) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = picUrl;
//     resolve(fetch(picUrl)).then(images.appendChild(img));
//   });
// };

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

let currentImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

createImage('img/img-1.jpg')
.then(img => {
  currentImg = img;
  console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

  
  // 使用异步await来消费promise
  // 重写whereAmI
  
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
    //   console.log(res)
    // );
    // 将上面的写法改写为下面这样，是等价的
    
    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    // 实际在我练习的时候，不管成功失败，ok都是true了，只是会在返回值里有一个throttled
    if (!resGeo.ok) throw new Error('Problem getting location data');
    
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    
    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
      );
      if (!res.ok) throw new Error('Problem getting country data');
      
      const data = await res.json();
      console.log(data);
      renderCountry(data[0]);
      return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (err) {
      console.error(err);
      renderError(`Something went wrong 🧨🧨 ${err.message}. Try again!`);
      
      // Reject promise returned from async function
      throw err;
    }
};

console.log('1: Will get location');
// await里的return，直接这样是打印不出来的，因为await也是返回一个promise
// const city = whereAmI();
// console.log(city);

// 正确的方法还是利用then
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 🧨`))
//   .finally(() => console.log('3: Finished getting location'));

// 直接这样打印步骤3总是会跑到步骤2前面，因此正确做法应该是把步骤3打到上一步的finally里
// console.log('3: Finished getting location');

// async的IIFE写法
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 🧨`);
  }
  console.log('3: Finished getting location');
})();

// FIRST会被先于上面那一堆东西被打印出来，因为上面的东西是异步的
// console.log('FIRST');

// 捕获异常try catch基本的小例子
// try {
  //   let y = 1;
  //   const x = 2;
  //   x = 3;
  // } catch (err) {
    //   alert(err.message);
    // }
    
    
    // promise的并行写法

const getJSON = function (url, errorMsg = 'Something went wrong') {
  // 注意下面这个return，必须加上它，这个函数才相当于是返回一个promise，否则后续调用它的时候会无返回值而报错
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // 先来个普通串行的
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    // 以下为并行写法
    // 使用Promise.all这个方法，在这个方法中多个动作同时进行，但如果有一个报错，那么就会返回失败
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');


// 除all外，Promise的另外三个方法
// 方法1 race
// 只显示race里执行最快的一个结果
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec);
  });
};
// 设置一个超时函数
// 如果请求时长超过超时函数，则返回请求太慢的提示
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(30),
])
.then(res => console.log(res[0]))
.catch(err => console.error(err));

// 方法2 allSettled
// 与all类似，但是即使遇到错误也不会终止整个方法，而是报出错误后继续执行后面的代码
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// 与all方法对比效果
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// 方法3 any，返回第一个fullfilled结果
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

  */

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

let currentImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
