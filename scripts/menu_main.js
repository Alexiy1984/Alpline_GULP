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
}, false);
