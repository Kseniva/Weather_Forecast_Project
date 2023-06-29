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
