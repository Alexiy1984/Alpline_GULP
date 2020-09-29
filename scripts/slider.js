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

  $('.rounded-button_controls__prev').each(function() {
    $(this).on('click', function(){
      console.log('clicked');
      var data_target = $(this).attr('data-target');
      $('#'+ data_target).slick('slickPrev');
    });
  });

  $('.rounded-button_controls__next').each(function() {
    $(this).on('click', function(){
      console.log('clicked');
      var data_target = $(this).attr('data-target');
      $('#'+ data_target).slick('slickNext');
    });
  });
});


