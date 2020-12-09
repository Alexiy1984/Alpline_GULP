$(function() {
  $.fn.toggleFollow = function(t1, t2, cl) {
    if (this.text() == t1) {
      this.text(t2);
      this.removeClass(cl);
    } else {
      this.text(t1);
      this.addClass(cl);
    }

    return this;
  };

  $('.button_follow').on('click', function() {
    $(this).toggleFollow('Following', 'Follow', 'followed');
  });

  $('#comment-new').on('keyup input', function() {
    if (!($.trim($(this).val())==="")) {
      $(this).parents('.comments').find('#comment-new-button').removeClass('button_disabled');
    } else {
      $(this).parents('.comments').find('#comment-new-button').addClass('button_disabled');
    }
  });

  $('.show-more-trigger').on('click', function () {
    $($(this).attr('data-target')).find('.card_hidden').slideToggle(300);

    if ($(this).text() === 'Show more') {
      $(this).text('Hide last');
    } else {
      $(this).text('Show more');
      $('html, body').animate({
        scrollTop: $($(this).attr('data-target')).offset().top
      }, 300);
    }
  });

  $('.filter').on('click', function () {
    var action_target = $($(this).attr('data-target'));
   
    if($(this).attr('data-dir') === 'flth') {
      $(this).find('svg').css({ 
        'transform-origin': 'center',
        'transform': 'rotateX(180deg) translateY(50%)',
      });
      action_target.children().sort(function(a, b){
        var first = new Date($(a).find('.date').text());
        var second = new Date($(b).find('.date').text());
  
        return second - first;
      }).each(function(){
          $(action_target).prepend(this);
      });
      $(this).attr('data-dir', 'fhtl');
    } else {
      $(this).find('svg').css({
        'transform-origin': 'center',
        'transform': 'rotateX(0deg) translateY(-50%)',
      });
      action_target.children().sort(function(a, b){
        var first = new Date($(a).find('.date').text());
        var second = new Date($(b).find('.date').text());
  
        return first - second;
      }).each(function(){
          $(action_target).prepend(this);
      });
      $(this).attr('data-dir', 'flth');
    }
  });

  var before_elt = document.createElement('div');
  $(before_elt).addClass('before');
  $('.rounded-button_controls').append(before_elt);

  $('.rounded-button_controls__prev, .rounded-button_controls__next').hover(function() {

    if ($(this).hasClass('rounded-button_controls__prev')) {
      $(this).siblings('.before').remove();
      $(this).parent().append(before_elt);
      $(this).siblings('.before')
        .removeClass('before_next')
        .removeClass('before_redraw_prev')
        .removeClass('before_redraw_next')
        .addClass('before_prev');
    }

    if ($(this).hasClass('rounded-button_controls__next')) {
      $(this).siblings('.before').remove();
      $(this).parent().append(before_elt);
      $(this).siblings('.before')
        .removeClass('before_prev')
        .removeClass('before_redraw_prev')
        .removeClass('before_redraw_next')
        .addClass('before_next');
    }

  }, function() {
    if ($(this).siblings('.before').hasClass('before_prev')) {
      $(this).siblings('.before')
        .removeClass('before_prev')
        .addClass('before_redraw_prev');
    }
    if ($(this).siblings('.before').hasClass('before_next')) {
      $(this).siblings('.before')
        .removeClass('before_next')
        .addClass('before_redraw_next');
    }
  });
});
