$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel_icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel_icons/right.png"></button>',
        // адаптация карусели
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
      });
  });