'use strict';

// prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// let map, mapEvent;

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // prettier-ignore
    // 加这个注释的目的是它的下一行不会被prettier给格式化
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

// 以下为应用架构部分
class App {
  // 将前面的let的两个变量改写为class中的私有变量
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // 复习，构造函数是类被实例化后默认会马上被执行的方法，写在这里的方法就可以避免每次都要手动调用了
    this._getPosition();

    //Get data from local storage
    this._getLocalStorage();

    // 这里submit监听的是回车，因此操作的时候鼠标点击一个地方再点回车就会弹出窗口了，之前不小心写成summit了，一直不好使。。。
    form.addEventListener('submit', this._newWorkout.bind(this));

    // 这里就不用绑定this了，因为_toggleElevationField里也没有用到this关键字的地方
    inputType.addEventListener('change', this._toggleElevationField);

    // 由于_moveToPopup是被addEventListener触发调用的，因此_moveToPopup里的this不是我们想要的，因此需要绑定this，上面几个bind也是同理
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        // 这里加bind(this)的目的是为了让loadMap里声明this.#map时的this有效，否则this会是undefined
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    // const latitude = position.coords.latitude;
    // 这样写等价于上面的写法
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(
      `https://www.google.pt/maps/@${latitude},${longitude},7z?entry=ttu`
    );
    // 单引号里的map可以自定义一个字符，但是要与HTML里ID为同样字符的元素对应，例如在这个项目的HTML中也有一个ID叫map的元素，将来地图就会显示在这里
    // L是leaflet基本的namespace（命名空间），在它后面我们可以直接使用map tileLayer marker等方法
    const coords = [latitude, longitude];
    console.log(this);
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // 用on来监听点击地图，类似于addEventListener
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // 需要先将display设置为none，这样立刻隐藏form，否则会有个上滑的小动画
    form.style.display = 'none';
    form.classList.add('hidden');
    // 1秒后将style设置回grid
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    // 后面那俩toggle里的类名前不加点儿.  原因是什么来着
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // 数组的every方法是检验是否所有都符合后面的条件并返回true or false
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    // 不加这句的话一点击页面会立马刷新
    e.preventDefault();

    // Get data from form
    // 变量前带+就是把变量类型强转为Number型
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // Check if data is valid

    // If workout Running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        // 用这个函数代替了上面三行写法，更简洁一些
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout Cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, duration) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);
    // render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();

    // Display marker
    console.log(this);
    // // 这个mapEvent.latlng是通过打印mapEvent观察到的
  }

  _renderWorkoutMarker(workout) {
    console.log(workout);
    // 下面这些方法的说明具体参照leaflet官方文档，简要说明如下，
    // addTo就是把指定marker添加到地图上，点几下就是添加几个标记点，
    // bindPopup是在标记点上加标签，并绑定标签和标记点
    // popup是设置标签格式，可以调用CSS中的className
    // setPopupContent设置标签的文字内容
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;
    // toFixed(1)是对结果保留1位小数，防止除法算出的结果太奇怪
    if (workout.type === 'running')
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
    `;

    if (workout.type === 'cycling')
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
    `;

    form.insertAdjacentHTML('afterend', html);
  }

  // 下一个功能，点击标签，使地图定位到标签对应的坐标处
  _moveToPopup(e) {
    // 先通过标签找到它的ID匹配对应的workout
    const workoutEl = e.target.closest('.workout');
    console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    console.log(workout);

    // 再利用workout的coords，从leaflet的setview方法定位视图
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // Using the public interface
    // 从本地存储恢复出来的数据，仅是一个普通的对象，它与前面类的原型链已断开了，因此click方法会失效
    // 这里老师说到解决它比较麻烦，并没有演示，仅是注释掉了
    // workout.click();
  }

  _setLocalStorage() {
    // localStorage是浏览器提供给我们的简单的本地化存储API
    // 它是一个近似key value格式的workouts, JSON是value
    // stringify是将内容转为string类型
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    console.log(data);

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  // 使用方法是在console里app.reset(); 就把已存在的数据都清空了
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
