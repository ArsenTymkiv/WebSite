let slider = document.querySelector(".slider");

let slides = document.querySelector(".slides");

let slidesWidth = slides.firstElementChild.clientWidth;

let dotsContainer = document.querySelector(".dots-container");

let indexContainer = document.querySelector(".dots-numbers-container-index");

let countContainer = document.querySelector(".dots-numbers-container-count");

let intervalId;

let currentSlideIndex;

function createDots() {
    countContainer.textContent = padNumber(slides.children.length);

    for (let i = 0; i < slides.children.length; i++) {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    }
}

function setActive(index) {
    let dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });
    dots[index].classList.add("active");
    indexContainer.textContent = padNumber(index+1);
}

function padNumber(number){
    return number.toString().padStart(2,"0");
}

function goToSlide(index){
    currentSlideIndex = index;
    let slideOffset = (slider.clientWidth - slidesWidth) / 2;
    let slidePosition = index * slidesWidth;
    slides.style.transform = `translateX(-${slidePosition}px)`;
    setActive(index);
}

function startAutoScroll(){
    intervalId = setInterval(function(){
        currentSlideIndex = (currentSlideIndex + 1) % slides.children.length;
        goToSlide(currentSlideIndex);
    },3000)
}

createDots();
goToSlide(0);
startAutoScroll();

let dotElements = dotsContainer.querySelectorAll(".dot");
dotElements.forEach(function(dot){
    dot.addEventListener("click", function(){
        let index = parseInt(this.dataset.index);
        clearInterval(intervalId);
        goToSlide(index);
        startAutoScroll();
    })
})

window.addEventListener("resize", function(){
    slidesWidth = slides.firstElementChild.clientWidth;
    goToSlide(currentSlideIndex);
});