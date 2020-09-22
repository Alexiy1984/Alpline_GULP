document.addEventListener('DOMContentLoaded', function(){ 
  var menu_main__button = document.getElementById('menu_main__button');
  var menu_main__dropdown = document.getElementById('menu_main__dropdown');

  menu_main__button.addEventListener('click' , function () {
    menu_main__dropdown.classList.toggle('show');
  });

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

}, false);
