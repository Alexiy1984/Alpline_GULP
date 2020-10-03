$(function() {
  $('.card_medium__category, .card_small__category, .card_big__category').each(function(){
    switch($(this).text()) {
      case 'Food':
        $(this).addClass('notify_success');
        break;
      case 'Technology':
        $(this).addClass('notify_warning');
        break;
      case 'Book':
        $(this).addClass('notify_error');
        break;
      default:
    }
  });

  localStorage.setItem('user', JSON.stringify({
    name: 'Alex',
    surname: 'Valiev',
    email: 'alevaliev@yandex.ru'
  }));

  var fake_user = JSON.parse(localStorage.getItem('user'));
  console.log(fake_user.name + ' ' + fake_user.surname + ' ' + fake_user.email);

  $('#comment-new-button').on('click', function () {
    if (!($.trim($('#comment-new').val())==="")) {
      var date = new Date;
      var comment_last = $('.comment').last();
      var clone = comment_last.clone();
      var comment_txt = $('#comment-new').val();

      clone.find('.comment__avatar > div').removeClass().addClass('comment__avatar-placeholder_accent_4');
      clone.find('.comment__avatar > div p').text('UD');
      clone.find('.comment__author').text('Undefined user');
      clone.find('.comment__date').text(date.toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric',}));
      clone.find('.comment__content').text(comment_txt);
      clone.insertAfter(comment_last);
      
      $('#comment-new').val('');
      $(this).addClass('button_disabled');
    } 
  });
});
