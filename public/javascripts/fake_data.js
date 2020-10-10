$(function () {
  $('.card_medium__category, .card_small__category, .card_big__category').each(function () {
    switch ($(this).text()) {
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
    name: 'Leslie',
    surname: 'Alexander',
    email: 'lesliealexandro@gmail.com'
  }));

  if (localStorage.getItem('user') === null) {
    var fake_user = JSON.parse(localStorage.getItem('user'));
    $('#user_window').find('.user_window__name').text(fake_user.name + ' ' + fake_user.surname);
    $('#user_window').find('.user_window__email').text(fake_user.email);
  }

  ;
  $('#comment-new-button').on('click', function () {
    if (!($.trim($('#comment-new').val()) === "")) {
      var date = new Date();
      var comment_last = $('.comment').last();
      var clone = comment_last.clone();
      var comment_txt = $('#comment-new').val();
      clone.find('.comment__avatar > div').removeClass().addClass('comment__avatar-placeholder_accent_4');
      clone.find('.comment__avatar > div p').text('UD');
      clone.find('.comment__author').text('Undefined user');
      clone.find('.comment__date').text(date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
      clone.find('.comment__content').text(comment_txt);
      clone.insertAfter(comment_last);
      $('#comment-new').val('');
      $(this).addClass('button_disabled');
    }
  });

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function passComparison(pass, confirm) {
    return pass === confirm;
  }

  $('#modal_2 .input_button').on('click', function (e) {
    e.preventDefault();
    var userName = $(e.currentTarget).parents('form').find('input[name=userName]').val();
    var userEmail = $(e.currentTarget).parents('form').find('input[name=userEmail]').val();
    var userPassword = $(e.currentTarget).parents('form').find('input[name=userPassword]').val();
    var userConfirm = $(e.currentTarget).parents('form').find('input[name=userPasswordConfirm]').val();

    if (userName != '' && userEmail != '' && userPassword != '' && userConfirm != '') {
      if (isEmail(userEmail) && passComparison(userPassword, userConfirm)) {
        $('.modal').hide();
        $('#modal_4').toggle();
        var name_array = userName.split();
        localStorage.setItem('user', JSON.stringify({
          name: name_array[0],
          surname: name_array[1],
          email: userEmail
        }));
        var fake_user = JSON.parse(localStorage.getItem('user'));
        console.log(fake_user.name + ' ' + fake_user.email);
        $('#user_window').find('.user_window__name').text(fake_user.name + ' ' + fake_user.surname);
        $('#user_window').find('.user_window__email').text(fake_user.email);
        $('#modal_4').find('.modal__content .modal__greetings-title').text('Welcome, ' + fake_user.name);
      } else {
        if (!isEmail(userEmail)) {
          alert('Please, fill in Email field correctly');
        }

        if (!passComparison(userPassword, userConfirm)) {
          alert('Passwords do not match');
        }
      }
    } else {
      alert('Please, fill in Sign Up form fields');
    }
  });
  $('#modal_4 .input_button, #modal_3 .input_button').on('click', function (e) {
    e.preventDefault();
    $(e.currentTarget).parents('.modal').hide();
  });
});