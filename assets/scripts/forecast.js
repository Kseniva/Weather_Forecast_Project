////Код для загрузки фото города////
//ищем элементы и записываем их переменные
const inputForecast = document.querySelector(".search__forecast-term");
const search = document.querySelector(".search__forecast-line");
const picture = document.querySelector(".body--forecast");

// получение данных с домашней страницы и вывод данных о погоде на странице города
const urlParams = new URLSearchParams(window.location.search);
const citySearched = urlParams.get('city');

// записываем в переменную ключ к WeatherAPI
const weatherApiKey = "45ae069833aa4900af474813232206";

// записываем в переменные элементы разметки
const cityName = document.querySelector('.city');
const cityTemp_c = document.querySelector('.temp_now');
const cityFeelslike_c = document.querySelector('.temp_feel');
const cityConditionText = document.querySelector('.weather');
const cityLocalDay = document.querySelector('.day');
const cityLocalTime = document.querySelector('.time');
const cityWeatherIcon = document.querySelector('.sun')
const btnSwitchTemp = document.querySelector('.switch__btn-temp')
const fiveDayForecastContainer =document.querySelector(".row-5-forecast");

//записываем в переменную ключ к API Pexels
const API_KEY = "L8wkT6ttA7B00H3oHxpl7CwiA4maBhN5XeLy7vWC3DbT1Ik71RYTVvLf";

//вешаем обработчик события на блок поиска
search.addEventListener("click", searchHandler);
inputForecast.addEventListener("keydown", (event) => {
  //проверяем, является ли событие нажатой клавишей Enter
  if (event.key === "Enter") {
    searchHandler();
  }
});

function searchHandler() {
  //получаем значение инпута
  const city = inputForecast.value.trim(); //убираем пробелы в начале и конце строки
  //формируем URL запроса к API
  if (city !== "") {
    //если строка не пустая
    const url = `https://api.pexels.com/v1/search?query=${city}&per_page=15&page=1`;

    //отправляем запрос с помощью функции fetch
    fetch(url, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //очищаем фон блока
        picture.style.backgroundimage = "";

        //если получено больше одного фото
        if (data.photos.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.photos.length);
          const imgSrc = data.photos[randomIndex].src.large;

          //загружаем в качестве фонового изображения полученное фото
          picture.style.backgroundImage = `url(${imgSrc})`;
          //присваиваем ему стили
          picture.style.backgroundRepeat = "no-repeat";
          picture.style.backgroundSize = "cover";
          picture.style.backgroundPozition = "center";
          picture.style.backgroundColor = "rgba(255, 255, 255, 0.5)"; //делаем фон полупрозрачным

          //очищаем значение строки поиска
          inputForecast.value = "";
        } else {
          //если нет сопадения по названию фото, выдаем случайное фото природы
          const randUrl = `https://api.pexels.com/v1/search?query=nature&per_page=1&page=1`;

          fetch(randUrl, {
            headers: {
              Authorization: API_KEY,
            },
          })
            .then((response) => response.json())
            .then((randData) => {
              const randImgSrc = randData.photos[0].src.medium;

              //загружаем в качестве фонового изображения полученное фото
              picture.style.backgroundImage = `url(${randImgSrc})`;
              //присваиваем ему стили
              picture.style.backgroundRepeat = "no-repeat";
              picture.style.backgroundSize = "cover";
              picture.style.backgroundPozition = "center";
              picture.style.backgroundColor = "rgba(255, 255, 255, 0.5)"; //делаем фон полупрозрачным

              //очищаем значение строки поиска
              inputForecast.value = "";
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }
}

    //////// записываем данные в карточку + добавление иконки ////////////
    function getCurrentWeather (data) {cityName.textContent = data.location.name;
    cityTemp_c.textContent = data.current.temp_c + " °C";
    cityFeelslike_c.textContent =
      "Feels like: " + data.current.feelslike_c + " °C";
    cityConditionText.textContent = data.current.condition.text;
    const cityDate = new Date(data.location.localtime);
    cityLocalDay.textContent = cityDate.toDateString().slice(4);
    cityLocalTime.textContent = "Local time: " + cityDate.toTimeString().slice(0, 5);
    const icon = data.current.condition.icon;
    cityWeatherIcon.innerHTML = `<img src="${icon}" alt="${data.current.condition.text}" />`;
    }

    // функция для выведения на странице дополнительных данных о погоде
function showWeatherDetails (data) {
    let humidity = data.current.humidity;
    let humidityDisplay = document.querySelector(".humidity");
    humidityDisplay.innerHTML = `Humidity ${humidity} %`;

    let wind = data.current.wind_kph;
    let windDisplay = document.querySelector(".wind");
    windDisplay.innerHTML = `Wind ${wind} km/h`;

    let uvIndex = data.current.uv;
    let uvIndexDisplay = document.querySelector(".UV-index");
    uvIndexDisplay.innerHTML = `UV-index ${uvIndex}`;

    let visibility = data.current.vis_km;
    let visibilityDisplay = document.querySelector(".visibility");
    visibilityDisplay.innerHTML = `Visibility ${visibility} km`;

    let pressure = Math.round(data.current.pressure_mb * 0.7506);
    let pressureDisplay = document.querySelector(".pressure");
    pressureDisplay.innerHTML = `Pressure ${pressure} mm Hg`;

    let airCondition = data.current.air_quality.co;
    let airConditionRounded = airCondition.toFixed(2);
    let airConditionDisplay = document.querySelector (".air-quality");
    airConditionDisplay.innerHTML = `${airConditionRounded} PM2.5 (μg/m3)`;
}
// функция для выведения на странице прогноза погоды
function getForecast(data) {const forecastDays = data.forecast.forecastday;
        forecastDays.forEach(day => {
          const date = new Date(day.date);
          const weekday = date.toLocaleString('en-US', { weekday: 'short' });
          const tempC = Math.round(day.day.avgtemp_c);
          const tempF = Math.round(day.day.avgtemp_f);
          const condition = day.day.condition.text;
          const icon = day.day.condition.icon;
          const html = `
            <div class="weekday">
              <div class="temp_now">${tempC}°C/ ${tempF}°F</div>
              <div class="forecast-icon"><img src="${icon}" alt="${condition}"></div>
              <div class="${weekday}">${weekday}</div>
            </div>
          `;
          fiveDayForecastContainer.insertAdjacentHTML('beforeend', html);
        });
      }

// запрос к API и вызов функций
fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${citySearched}&days=5&aqi=yes`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const weatherDetailsContainer = document.querySelector('.row-3-forecast');
        showWeatherDetails (data);
        getForecast(data);
        getCurrentWeather (data);
    })
    .catch(error => console.error(error));