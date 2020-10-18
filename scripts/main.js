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

  var previous = null;
  $('.filter').on('click', function () {
    var action_target = $($(this).attr('data-target'));

    action_target.children().sort(function(a,b){
      console.log($(a).find('.date').text());
      console.log($(b).find('.date').text());
      return new Date($(a).find('.date').text()) > new Date($(b).find('.date').text());
    }).each(function(){
        $(action_target).prepend(this);
    });

    // action_target.children().each(function (index) {
    //   if (previous) {
    //     if (Date.parse($(previous).find('.date').text()) > Date.parse($(this).find('.date').text())) {
    //       $(this).insertBefore($(previous));
    //     }
    //   }

    //   previous = this;
    // });

    // console.log(Date.parse(action_target.children().find('.date').text().toString()));

  });
});
