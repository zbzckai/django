$(document).ready(function () {
    setTimeout(function () {
        swiper1()
    }, 100)
})
function swiper1() {
    var mySwiper1 = new Swiper('#topSwiper', {
        direction: 'horizontal',
        loop: true,
        speed: 500,
        autoplay: 2000,
        pagination: '.swiper-pagination',

    });
};