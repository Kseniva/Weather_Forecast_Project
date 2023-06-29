const form = document.querySelector('.search');
const input = document.querySelector('.searchTerm');
const searchBtn = document.querySelector('.searchButton');
let city;

////////////// элементы из карточки //////////////
const cityName = document.querySelector('.city');
const cityTemp_c = document.querySelector('.temp_now');
const cityFeelslike_c = document.querySelector('.temp_feel');
const cityConditionText = document.querySelector('.weather');
const cityLocalDay = document.querySelector('.day');
const cityLocalTime = document.querySelector('.time');

//////////////////////////////////////////////////////////


// создаем функцию для получения данных о погоде
function getWeather(city) {
  const weatherApiKey = '45ae069833aa4900af474813232206'; // записываем в переменную ключ Weather API
  // записываем в переменную ссылку на API
  const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&days=5&aqi=yes`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
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

      //////// записываем данные в карточку ////////////
      cityName.textContent = data.location.name;
      cityTemp_c.textContent = data.current.temp_c + " °C";
      cityFeelslike_c.textContent = "Feels like: " + data.current.feelslike_c + " °C";
      cityConditionText.textContent = data.current.condition.text;
      const cityDate = new Date(data.location.localtime);
      cityLocalDay.textContent = cityDate.toDateString().slice(4);
      cityLocalTime.textContent = "Local time: " + cityDate.toTimeString().slice(0, 5);
      ////////////////////////////////////////////////////

    })
    .catch(error => console.log(error));
}
// создаем обработчик отправки формы
form.onsubmit = function (evt) {
  evt.preventDefault();
  city = input.value.trim();
  console.log(city);
  getWeather(city)
}
