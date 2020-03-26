$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 600,
        adaptiveHeight: false,
        draggable: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel_icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel_icons/right.png"></button>',
        // адаптация карусели
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    draggable: true,
                    arrows: false
                }
            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    
    //   неоптемезированный участок с переключением по ссылке
    //   $('.catalog-item__link').each(function(i){
    //       $(this).on('click', function(e){
    //           e.preventDefault();
    //           $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //           $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //       })
    //   });
    //   $('.catalog-item__back').each(function(i){
    //     $(this).on('click', function(e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });
    // оптимизированный участок
    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        }); 
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal window
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    });


    function valideForms(form){
        $(form).validate({
            rules:{
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Please specify your name",
                email: {
                  required: "We need your email address to contact you",
                  email: "Your email address must be in the format of name@domain.com"
                }
              }
        });
    };
    valideForms('#consultation form');
    valideForms('#order form');
    valideForms('#consultation-form');

    $('input[name=phone]').mask("+38 (999) 999-99-99");

    // отправка письма с сайта
    $('form').submit(function(e) {
        e.preventDefault(); //отменяет стандартное поведение браузера
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
  });