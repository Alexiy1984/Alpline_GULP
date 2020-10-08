window.addEventListener('load', function () {
  var modal_open = document.querySelectorAll('[data-toggle=modal]');
  var modal_close = document.getElementsByClassName('modal-close');
  [].forEach.call(modal_open, function (btn) {
    btn.onclick = function () {
      var modals = document.querySelectorAll('.modal');
      [].forEach.call(modals, function (modal) {
        modal.style.display = "none";
      });
      var modal_target = document.querySelector(btn.getAttribute('data-target'));

      if (typeof modal_target != 'undefined' && modal_target != null) {
        modal_target.style.display = "block";
      }
    };
  });
  [].forEach.call(modal_close, function (btn) {
    btn.onclick = function (event) {
      event.target.closest('.modal').style.display = 'none';
    };
  });

  window.onclick = function (event) {
    var is_modal = event.target.classList.contains('modal');

    if (is_modal) {
      event.target.style.display = "none";
    }
  };
});