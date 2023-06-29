const form = document.querySelector('.search');
const input = document.querySelector('.searchTerm');
const searchBtn = document.querySelector('.searchButton');
let city;

// создаем асинхронную функцию для получения данных о погоде
async function getWeatherData(city) {
  const weatherApiKey = '45ae069833aa4900af474813232206'; // записываем в переменную ключ Weather API
  // записываем в переменную ссылку на API
  const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&days=5&aqi=yes`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
  return data; // вывод данных при успешно выполненом запросе
  } else {
    throw new Error (`${response.statusText}`) // генерируем ошибку при невыполнении запроса
  }
}

// создаем обработчик отправки формы
form.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    city = input.value.trim();
    console.log(city);
    try {
        const data = await getWeatherData(city)
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
    } catch(error) { 
          console.log (error);
          alert(`${error.message}.Try again`)
    }
    // Очищаем поля формы 
    evt.target.reset(); 
  });
