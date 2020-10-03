$(function() {
  $.fn.toggleFollow = function(t1, t2) {
    if (this.text() == t1) {
      this.text(t2);
    } else {
      this.text(t1);
    }

    return this;
  };

  $('.button_follow').on('click', function() {
    $(this).toggleClass('followed');
    $(this).toggleFollow('Following', 'Follow');
  });

  $('#comment-new').on('keyup input', function() {
    if (!($.trim($(this).val())==="")) {
      $(this).parents('.comments').find('#comment-new-button').removeClass('button_disabled');
    } else {
      $(this).parents('.comments').find('#comment-new-button').addClass('button_disabled');
    }
  });
});
