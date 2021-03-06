$(function() {
  $('.responsive_small').slick({
    dots: false,
    prevArrow: false,
    nextArrow: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  });

  $('.responsive_big').slick({
    infinite: true,
    dots: false,
    prevArrow: false,
    nextArrow: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  $('.slick-active').prevAll('.slick-cloned').css({opacity: 0});

  $('.rounded-button_controls__prev, .noborder_controls__prev').each(function() {
    $(this).on('click', function(){
      var data_target = $(this).attr('data-target');
      $('#'+ data_target).slick('slickPrev');
      $('.slick-cloned').animate({opacity: 1}, 500, 
        function () {
          $('.slick-cloned').css({opacity: ''});
      });
    });
  });

  $('.rounded-button_controls__next, .noborder_controls__next').each(function() {
    $(this).on('click', function(){
      var data_target = $(this).attr('data-target');
      $('#'+ data_target).slick('slickNext');
      $('.slick-cloned').animate({opacity: 1}, 500, 
        function () {
          $('.slick-cloned').css({opacity: ''});
      });
    });
  });
});


