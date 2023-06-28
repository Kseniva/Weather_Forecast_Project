document.addEventListener("DOMContentLoaded", function () {
  const carouselItems = document.querySelector(".scroller_container_items"); //определяем элемент карусели
  //console.log(carouselItems);
  const carouselWidth = carouselItems.offsetWidth; //определяем ширину элемента карусели
  //console.log(carouselWidth);
  const itemWidth = carouselWidth / 4; //рассчитываем ширину одного фрагмента

  const nextBtn = document.querySelector(".scroler_btn-right");
  const prevBtn = document.querySelector(".scroler_btn-left");

  let currentPosition = 0; //запоминаем текущую позицию карусели

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
});
