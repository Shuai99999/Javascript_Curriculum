'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
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
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      // 用on来监听点击地图，类似于addEventListener
      map.on('click', function (mapEvent) {
        console.log(mapEvent);
        // 这个mapEvent.latlng是通过打印mapEvent观察到的
        const { lat, lng } = mapEvent.latlng;

        // 下面这些方法的说明具体参照leaflet官方文档，简要说明如下，
        // addTo就是把指定marker添加到地图上，点几下就是添加几个标记点，
        // bindPopup是在标记点上加标签，并绑定标签和标记点
        // popup是设置标签格式，可以调用CSS中的className
        // setPopupContent设置标签的文字内容
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
