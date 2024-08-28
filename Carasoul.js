const images = document.querySelector(".carousel-images");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let index = 0;

function showSlide(i) {
  const totalImages = document.querySelectorAll(".carousel-images img").length;
  if (i >= totalImages) {
    index = 0;
  } else if (i < 0) {
    index = totalImages - 1;
  } else {
    index = i;
  }
  images.style.transform = `translateX(${-index * 600}px)`; // Corrected this line
}

prevButton.addEventListener("click", () => showSlide(index - 1));
nextButton.addEventListener("click", () => showSlide(index + 1));

showSlide(index);
