document.addEventListener('DOMContentLoaded', function(){ 
  function collapseSection(element) {
    var sectionHeight = element.scrollHeight;
    var elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });

    element.setAttribute('data-collapsed', 'true');
  }

  function expandSection(element) {
    var sectionHeight = element.scrollHeight;
    element.style.height = sectionHeight + 'px';

    element.addEventListener('transitionend', function(e) {
      element.removeEventListener('transitionend', arguments.callee);

      element.style.height = null;
    });

    element.setAttribute('data-collapsed', 'false');
  }

  document.querySelector('#menu_main__button').addEventListener('click', function(e) {
    var section = document.querySelector('#menu_main__dropdown.collapsible');
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';

    if(isCollapsed) {
      expandSection(section);
      section.setAttribute('data-collapsed', 'false');
    } else {
      collapseSection(section);
    }
  });

  var main_menu_buttons = document.querySelectorAll('.menu_main__main-section .menu_main__list-title');

  [].forEach.call(main_menu_buttons, function(m_btn) {
    m_btn.onclick = function(e) {
      if (window.innerWidth < 992) {
        var children = e.currentTarget.parentElement.children;
        var elts = document.getElementsByClassName('menu_main__list');
        [].forEach.call(elts, function(elt) {
          if (!elt.isSameNode(children[1])) {
            elt.classList.remove('open');
            elt.closest('.col').classList.remove('order-1');
            elt.closest('.col').classList.add('order-2');
            elt.closest('.col').classList.toggle('hidden');
          }
        });
        children[1].classList.toggle('open');
        e.currentTarget.closest('.col').classList.toggle('order-1');
        e.currentTarget.closest('.col').classList.toggle('order-2');
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
          elt.closest('.col').classList.remove('order-1');
          elt.closest('.col').classList.remove('hidden');
          elt.closest('.col').classList.add('order-2');
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
  var user_window = document.getElementById('user_window');

  login_button.addEventListener('click', function () {
    user_window.classList.toggle('open');
  });

  window.addEventListener('click', function(e) {
    var is_search =  document.getElementById('main_menu__search-input');
    var section = document.querySelector('#menu_main__dropdown.collapsible');
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';
  
    if(!e.target.closest('#menu_main__dropdown') && !e.target.closest('#menu_main__button')) {
      if (!isCollapsed) {
        collapseSection(section);
        section.setAttribute('data-collapsed', 'false');
      }
    }

    if(!is_search.isSameNode(e.target)) {
      document.getElementById('main_menu__search').classList.remove('open');
    }

    if(!e.target.closest('#main_menu__login') && !e.target.closest('#user_window')) {
      user_window.classList.remove('open');
    }

    if(!e.target.closest('#search-results')) {
      search_results.classList.remove('open');
    }
    
  });

  window.addEventListener('scroll', function(e) {
    user_window.classList.remove('open');
    search_results.classList.remove('open');
  });

}, false);
