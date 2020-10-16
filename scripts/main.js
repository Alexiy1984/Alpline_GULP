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
  });
});
