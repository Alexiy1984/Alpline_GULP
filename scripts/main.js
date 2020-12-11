$(function() {
  $.fn.toggleFollow = function(t1, t2, cl) {
    if (this.text() == t1) { this.text(t2); this.removeClass(cl);
    } else { this.text(t1); this.addClass(cl); }
    return this;
  };

  $('.button_follow').on('click', function() { $(this).toggleFollow('Following', 'Follow', 'followed'); });

  $('#comment-new').on('keyup input', function() {
    if (!($.trim($(this).val())==="")) {
      $(this).parents('.comments').find('#comment-new-button').removeClass('button_disabled');
    } else {
      $(this).parents('.comments').find('#comment-new-button').addClass('button_disabled');
    }
  });

  $('.show-more-trigger').on('click', function () {
    var hidden_cards = $($(this).attr('data-target')).find('.card_hidden').slice(0, 3);
    if (hidden_cards.length) {
      hidden_cards.slideDown(300);
      hidden_cards.removeClass('card_hidden');
      if (!$($(this).attr('data-target')).find('.card_hidden').slice(0, 1).length) {
        $(this).hide();
      }
    } else {
      $(this).hide();
    };
  });

  $('.filter').on('click', function (e) {
    $(this).find('.filter__dropdown').fadeToggle(300);
    $(this).find('.filter__trigger').toggleClass('open');

    if ($(e.target).hasClass('filter__item')) {
      $(this).find('.filter__trigger span').text($(e.target).text());
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
