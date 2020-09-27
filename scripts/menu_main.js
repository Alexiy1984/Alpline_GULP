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

      var children = e.currentTarget.parentElement.children;
      var elts = document.getElementsByClassName('menu_main__list');
      [].forEach.call(elts, function(elt) {
        if (!elt.isSameNode(children[1])) {
          elt.classList.remove('open');
        }
      });
      children[1].classList.toggle('open');
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
      });
    };
  });

}, false);
