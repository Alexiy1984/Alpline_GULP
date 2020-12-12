document.addEventListener('DOMContentLoaded', function() { 
  function switchAccountAndMenu( $menu_selector = '#menu_main__dropdown.collapsible', $open_button = 'menu_main__button__show', $close_button = 'menu_main__button__close', $account_window = 'user_window') {
    var section = document.querySelector($menu_selector), show_svg = document.getElementById($open_button), close_svg = document.getElementById($close_button), user_window = document.getElementById($account_window);
    
    user_window.classList.toggle('open');

    if(!$($(section)).is(':hidden')) { $(section).slideUp(400, function() { close_svg.style.display = 'none'; show_svg.style.display = 'block';});};
  }

  document.querySelector('#menu_main__button').addEventListener('click', function(e) {
    var section = document.querySelector('#menu_main__dropdown.collapsible');
    var show_svg = document.getElementById('menu_main__button__show');
    var close_svg = document.getElementById('menu_main__button__close');
  
    $(section).slideToggle(function () {
      if($(show_svg).is(':hidden')) { $(show_svg).show(); $(close_svg).hide(); } 
      else { $(close_svg).show(); $(show_svg).hide(); }
    });
  });

  var main_menu_buttons = document.querySelectorAll('.menu_main__main-section .menu_main__list-title');

  [].forEach.call(main_menu_buttons, function(m_btn) {
    m_btn.onclick = function(e) {
      if (window.innerWidth < 992) {
        if (!m_btn.classList.contains('menu_main__mobile-item')) {
        var children = e.currentTarget.parentElement.children;
        var elts = document.getElementsByClassName('menu_main__list');

        [].forEach.call(elts, function(elt) { if (!elt.isSameNode(children[1])) { elt.classList.remove('open'); elt.closest('.col').children[0].classList.remove('open'); }});
          children[1].classList.toggle('open');
          e.currentTarget.classList.toggle('open');
        }
      };
    };
  });

  (function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");
  })();

  window.addEventListener("optimizedResize", function() {
    if (window.innerWidth > 991) {
      var elts = document.getElementsByClassName('menu_main__list');
      [].forEach.call(elts, function(elt) {
          elt.classList.remove('open');
          elt.closest('.col').children[0].classList.remove('open');
          elt.closest('.col').classList.remove('hidden');
      });
    };
  });

  var menu_search = document.getElementById('main_menu__search');
  var menu_search_input = document.getElementById('main_menu__search-input');
  var search_results = document.getElementById('search-results');

  menu_search.addEventListener('click', function(e) {
    e.target.closest('#main_menu__search').classList.add('open');
  });

  menu_search_input.addEventListener('change', function(e) {
    e.target.closest('#main_menu__search').classList.remove('open');
    search_results.classList.add('open');
  });

  var login_button = document.getElementById('main_menu__login');
  var accout_link = document.getElementById('account_link');
  var user_window = document.getElementById('user_window');

  login_button.addEventListener('click', function () { switchAccountAndMenu(); });

  accout_link.addEventListener('click', function () { switchAccountAndMenu(); });

  window.addEventListener('click', function(e) {
    var is_search =  document.getElementById('main_menu__search-input');

    if(!is_search.isSameNode(e.target)) {document.getElementById('main_menu__search').classList.remove('open');}
    if(!e.target.closest('#main_menu__login') && !e.target.closest('#user_window') && !e.target.closest('#account_link')) { user_window.classList.remove('open');}
    if(!e.target.closest('#search-results')) { search_results.classList.remove('open');}
  });
}, false);
