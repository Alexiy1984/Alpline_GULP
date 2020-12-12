// (function() {
//   var lastTime = 0;
//   var vendors = ['ms', 'moz', 'webkit', 'o'];
//   for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//       window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
//       window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
//                                  || window[vendors[x]+'CancelRequestAnimationFrame'];
//   }

//   if (!window.requestAnimationFrame)
//       window.requestAnimationFrame = function(callback, element) {
//           var currTime = new Date().getTime();
//           var timeToCall = Math.max(0, 16 - (currTime - lastTime));
//           var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
//             timeToCall);
//           lastTime = currTime + timeToCall;
//           return id;
//       };

//   if (!window.cancelAnimationFrame)
//       window.cancelAnimationFrame = function(id) {
//           clearTimeout(id);
//       };
// }());

Velocity.patch(window, true);
Velocity.patch(Element && Element.prototype);
Velocity.patch(NodeList && NodeList.prototype);
Velocity.patch(HTMLCollection && HTMLCollection.prototype);

Velocity.patch($, true);
Velocity.patch($ && jQuery.fn);

document.addEventListener('DOMContentLoaded', function(){ 
  // function collapseSection(element) {
  //   var sectionHeight = element.scrollHeight;
  //   var elementTransition = element.style.transition;
  //   element.style.transition = '';

  //   requestAnimationFrame(function() {
  //     element.style.height = sectionHeight + 'px';
  //     element.style.transition = elementTransition;

  //     requestAnimationFrame(function() {
  //       element.style.height = 0 + 'px';
  //     });
  //   });

  //   element.setAttribute('data-collapsed', 'true');
  // }

  // function expandSection(element) {
  //   var sectionHeight = element.scrollHeight;

  //   element.style.height = sectionHeight + 'px';

  //   element.addEventListener('transitionend', function(e) {
  //     element.removeEventListener('transitionend', arguments.callee);

  //     element.style.height = null;
  //   });

  //   element.setAttribute('data-collapsed', 'false');
  // }

  document.querySelector('#menu_main__button').addEventListener('click', function(e) {
    var section = document.querySelector('#menu_main__dropdown.collapsible');
    var show_svg = document.getElementById('menu_main__button__show');
    var close_svg = document.getElementById('menu_main__button__close');
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';

    if($(show_svg).is(':hidden')) {
      $(show_svg).show();
      $(close_svg).hide();
    } else {
      $(close_svg).show();
      $(show_svg).hide();
    }
    $(section).slideToggle({
      duration: 1000,
      easing: 'linear',
      step: function(step,b){
        console.log(step);
      },
      // progress: functionToExecute,
      complete: function () {
        console.log('complete');
      }
    });
    // $(section).velocity('slideInDown', 300);
    // $(section).velocity({
    //   scale: 0
    // }, {
    //   queue: false
    // });
    // $(section).velocity("slideDown");

    // function functionToExecute(animation, progress, remainingMs) {
    //   console.log('here and progress count is ' + progress);
    // }

    // if(isCollapsed) {
    //   // expandSection(section);
    //   // section.setAttribute('data-collapsed', 'false');
    //   show_svg.style.display = 'none';
    //   close_svg.style.display = 'block';
    // } else {
    //   // collapseSection(section);
    //   close_svg.style.display = 'none';
    //   show_svg.style.display = 'block';
    // }
  });

  var main_menu_buttons = document.querySelectorAll('.menu_main__main-section .menu_main__list-title');

  [].forEach.call(main_menu_buttons, function(m_btn) {
    m_btn.onclick = function(e) {
      if (window.innerWidth < 992) {
        if (!m_btn.classList.contains('menu_main__mobile-item')) {
        var children = e.currentTarget.parentElement.children;
        var elts = document.getElementsByClassName('menu_main__list');
        var mobile_items = document.getElementsByClassName('menu_main__mobile-item');
        [].forEach.call(elts, function(elt) {
          if (!elt.isSameNode(children[1])) {
            elt.classList.remove('open');
            elt.closest('.col').children[0].classList.remove('open');
          }
        });
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

  login_button.addEventListener('click', function () {
    user_window.classList.toggle('open');
  });

  window.addEventListener('click', function(e) {
    var is_search =  document.getElementById('main_menu__search-input');
    var section = document.querySelector('#menu_main__dropdown.collapsible');
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';
    var show_svg = document.getElementById('menu_main__button__show');
    var close_svg = document.getElementById('menu_main__button__close');
  
    if(!e.target.closest('#menu_main__dropdown') && !e.target.closest('#menu_main__button')) {
      if (!isCollapsed) {
        collapseSection(section);
        section.setAttribute('data-collapsed', 'true');
        close_svg.style.display = 'none';
        show_svg.style.display = 'block';
      }
    }

    if(!is_search.isSameNode(e.target)) {
      document.getElementById('main_menu__search').classList.remove('open');
    }

    if(!e.target.closest('#main_menu__login') && !e.target.closest('#user_window') && !e.target.closest('#account_link')) {
      user_window.classList.remove('open');
    }

    if(!e.target.closest('#search-results')) {
      search_results.classList.remove('open');
    }
    
  });

  accout_link.addEventListener('click', function () {
    var section = document.querySelector('#menu_main__dropdown.collapsible');
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';
    var show_svg = document.getElementById('menu_main__button__show');
    var close_svg = document.getElementById('menu_main__button__close');

    user_window.classList.toggle('open');
    $(section).slideUp(400);
    close_svg.style.display = 'none';
    show_svg.style.display = 'block';

    // if (!isCollapsed) {
    //   collapseSection(section);
    //   section.setAttribute('data-collapsed', 'true');
    //   close_svg.style.display = 'none';
    //   show_svg.style.display = 'block';
    // }
  });
}, false);
