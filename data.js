let slideIndex = 1;
displaySlides(slideIndex);

function addSlides(n) {
    displaySlides(slideIndex += n);
}

function currentSlide(n) {
    displaySlides(slideIndex = n);
}
// Logic source w3schools.com
function displaySlides(n) {
    let slides = document.getElementsByClassName('slide');
    let dots = document.getElementsByClassName('dot');

    if(n > slides.length) {
        slideIndex = 1;
    }
    if(n < 1) {
        slideIndex = slides.length;
    }

    for(let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    for(let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[slideIndex-1].style.display = 'block';
    dots[slideIndex-1].className += ' active';
}