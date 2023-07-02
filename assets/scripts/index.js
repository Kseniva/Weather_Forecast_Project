const form = document.querySelector(".search");
const input = document.querySelector(".searchTerm");
const searchBtn = document.querySelector(".searchButton");
let city;

////////////// элементы из карточки //////////////
const cityName = document.querySelector(".city");
const cityTemp_c = document.querySelector(".temp_now");
const cityFeelslike_c = document.querySelector(".temp_feel");
const cityConditionText = document.querySelector(".weather");
const cityLocalDay = document.querySelector(".day");
const cityLocalTime = document.querySelector(".time");
const cityWeatherIcon = document.querySelector(".weather_img");
const btnSwitchTempP = document.querySelector(".switch__btn-temp");

//////////////////////////////////////////////////////////

// создаем асинхронную функцию для получения данных о погоде
async function getWeatherData(city) {
  const weatherApiKey = "45ae069833aa4900af474813232206"; // записываем в переменную ключ Weather API
  // записываем в переменную ссылку на API
  const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&days=5&aqi=yes`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    return data; // вывод данных при успешно выполненом запросе
  } else {
    throw new Error(` ${response.statusText}`); // генерируем ошибку при невыполнении запроса
  }
}

// создаем обработчик отправки формы
form.addEventListener("submit", async function (evt) {
  evt.preventDefault();
  city = input.value.trim();
  console.log(city);
  try {
    const data = await getWeatherData(city);
    // проверяем доступность необходимых данных в консоли
    console.log(data.location.name);
    console.log(data.location.localtime);
    console.log(data.current.temp_c);
    console.log(data.current.temp_f);
    console.log(data.current.humidity);
    console.log(data.current.pressure_mb); // указано в мБ, необходимо перевести в мм рт.ст.
    console.log(data.current.uv);
    console.log(data.current.wind_kph);
    console.log(data.current.feelslike_c);
    console.log(data.current.feelslike_f);
    console.log(data.current.wind_kph);
    console.log(data.current.vis_km);
    console.log(data.current.condition);

    //////// записываем данные в карточку + добавление иконки ////////////
    cityName.textContent = data.location.name;
    cityTemp_c.textContent = data.current.temp_c + " °C";
    cityFeelslike_c.textContent =
      "Feels like: " + data.current.feelslike_c + " °C";
    cityConditionText.textContent = data.current.condition.text;
    const cityDate = new Date(data.location.localtime);
    cityLocalDay.textContent = cityDate.toDateString().slice(4);
    cityLocalTime.textContent =
      "Local time: " + cityDate.toTimeString().slice(0, 5);
    const icon = data.current.condition.icon;
    cityWeatherIcon.innerHTML = `<img src="${icon}" alt="${data.current.condition.text}" />`;

    //Переключатель формата температуры
    btnSwitchTemp.addEventListener("click", () => {
      if (btnSwitchTemp.checked === true) {
        cityTemp_c.textContent = data.current.temp_f + " F";
        cityFeelslike_c.textContent =
          "Feels like: " + data.current.feelslike_f + " F";
      } else {
        cityTemp_c.textContent = data.current.temp_c + " °C";
        cityFeelslike_c.textContent =
          "Feels like: " + data.current.feelslike_c + " °C";
      }
    });

    ////////////////////////////////////////////////////
  } catch (error) {
    console.log(error);
    alert(`${error.message}.Try again`);
  }
   // передача данных между страницами
   window.location.href = `forecast.html?city=${city}`;
  // Очищаем поля формы
  evt.target.reset();
});

////Ирина код для карусели начало////
const carouselItems = document.querySelector(".scroller__container_items"); //определяем элемент карусели
//определяем переменные для кнопок прокрутки
const nextBtn = document.querySelector(".scroller__container_btn-right");
const prevBtn = document.querySelector(".scroller__container_btn-left");

//функция для рассчета ширины элемента карусели
const updateItemWidth = function () {
  const carouselWidth = carouselItems.offsetWidth; //определяем ширину элемента карусели
  const itemPerRow = 4; // количество элементов в одном ряду
  return carouselWidth / itemPerRow; //рассчитываем ширину одного фрагмента
};

let itemWidth = updateItemWidth(); //начальное значение ширины фрагмента
let currentPosition = 0; //запоминаем текущую позицию карусели

//вешаем обработчик события на загрузку страницы
document.addEventListener("DOMContentLoaded", function () {
  nextBtn.addEventListener("click", function () {
    currentPosition -= itemWidth;
    //проверяем, чтобы не смещаться за пределы круга
    if (currentPosition < -3 * itemWidth) {
      currentPosition = 0;
    }
    //при клике на кнопку, смещаем элемент влево на ширину одного элемента
    carouselItems.style.transform = "translateX(" + currentPosition + "px)";
  });

  prevBtn.addEventListener("click", function () {
    currentPosition += itemWidth;
    //проверяем, чтобы не смещаться за пределы круга
    if (currentPosition > 0) {
      currentPosition = -3 * itemWidth;
    }
    //при клике на кнопку, смещаем элемент обратно
    carouselItems.style.transform = "translateX(" + currentPosition + "px)";
  });

  // Обновление ширины фрагмента при изменении размера окна
  window.addEventListener("resize", function () {
    itemWidth = updateItemWidth();
    carouselItems.style.transform = "translateX(" + currentPosition + "px)"; // Перемещение карусели на текущую позицию
  });
});
////Ирина код для карусели конец////

// создаем асинхронную функцию для получения данных о погоде для популярных городов
async function getWeatherPopular(city) {
  const weatherApiKey = "45ae069833aa4900af474813232206"; // записываем в переменную ключ Weather API
  // записываем в переменную ссылку на API
  const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&days=5&aqi=yes`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    return data; // вывод данных при успешно выполненом запросе
  } else {
    throw new Error(` ${response.statusText}`); // генерируем ошибку при невыполнении запроса
  }
}

//вешаем обработчик событий на загрузку страницы, чтобы при загрузке города попадали в карусель
document.addEventListener("DOMContentLoaded", async function () {
  try {
    //записываем в массив список популярных городов
    const cities = ["London", "New York", "Moscow", "Saint Petersburg"];
    //проходимся циклом по массиву
    for (let i = 0; i < cities.length; i++) {
      const data = await getWeatherPopular(cities[i]);

      // Отображаем данные в соотвествующих блоках карусели//
      const cityNameP = document.querySelector(
        `.scroller__content-${i + 1} .city`
      );
      const cityTempP_c = document.querySelector(
        `.scroller__content-${i + 1} .temp_now`
      );
      const cityFeelslikeP_c = document.querySelector(
        `.scroller__content-${i + 1} .temp_feel`
      );
      const cityConditionTextP = document.querySelector(
        `.scroller__content-${i + 1} .weather`
      );
      const cityLocalDayP = document.querySelector(
        `.scroller__content-${i + 1} .day`
      );
      const cityLocalTimeP = document.querySelector(
        `.scroller__content-${i + 1} .time`
      );
      const cityWeatherIconP = document.querySelector(
        `.scroller__content-${i + 1} .weather_img`
      );
      const btnSwitchTempP = document.querySelector(
        `.scroller__content-${i + 1} .switch__btn-temp`
      );

      //////// записываем данные в карточку + добавление иконки ////////////
      cityNameP.textContent = data.location.name;
      cityTempP_c.textContent = data.current.temp_c + " °C";
      cityFeelslikeP_c.textContent =
        "Feels like: " + data.current.feelslike_c + " °C";
      cityConditionTextP.textContent = data.current.condition.text;
      const cityDate = new Date(data.location.localtime);
      cityLocalDayP.textContent = cityDate.toDateString().slice(4);
      cityLocalTimeP.textContent =
        "Local time: " + cityDate.toTimeString().slice(0, 5);
      const icon = data.current.condition.icon;
      cityWeatherIconP.innerHTML = `<img src="${icon}" alt="${data.current.condition.text}" />`;

      //Переключатель формата температуры
      btnSwitchTempP.addEventListener("click", () => {
        if (btnSwitchTempP.checked === true) {
          cityTempP_c.textContent = data.current.temp_f + " F";
          cityFeelslikeP_c.textContent =
            "Feels like: " + data.current.feelslike_f + " F";
        } else {
          cityTempP_c.textContent = data.current.temp_c + " °C";
          cityFeelslikeP_c.textContent =
            "Feels like: " + data.current.feelslike_c + " °C";
        }
      });
    }
    ////////////////////////////////////////////////////
  } catch (error) {
    console.log(error);
    alert(`${error.message}.Try again`);
  }
});