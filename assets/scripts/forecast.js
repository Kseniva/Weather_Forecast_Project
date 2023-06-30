////Код для загрузки фото города////
//ищем элементы и записываем их переменные
const inputForecast = document.querySelector(".search__forecast-term");
const search = document.querySelector(".search__forecast-line");
const picture = document.querySelector(".row-2-forecast");

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
          const imgSrc = data.photos[randomIndex].src.medium;

          //загружаем в качестве фонового изображения полученное фото
          picture.style.backgroundImage = `url(${imgSrc})`;
          //присваиваем ему стили
          picture.style.backgroundRepeat = "no-repeat";
          picture.style.backgroundSize = "cover";
          picture.style.backgroundPozition = "center";
          picture.style.backgroundColor = "rgba(255, 255, 255, 0.5)"; //делаем фон полупрозрачным
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
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }
}
