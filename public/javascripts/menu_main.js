document.addEventListener("DOMContentLoaded",function(){document.querySelector("#menu_main__button").addEventListener("click",function(t){var e,n,i,a,l,o=document.querySelector("#menu_main__dropdown.collapsible");"true"===o.getAttribute("data-collapsed")?(l=(a=o).scrollHeight,a.style.height=l+"px",a.addEventListener("transitionend",function(t){a.removeEventListener("transitionend",arguments.callee),a.style.height=null}),a.setAttribute("data-collapsed","false"),o.setAttribute("data-collapsed","false")):(n=(e=o).scrollHeight,i=e.style.transition,e.style.transition="",requestAnimationFrame(function(){e.style.height=n+"px",e.style.transition=i,requestAnimationFrame(function(){e.style.height="0px"})}),e.setAttribute("data-collapsed","true"))})},!1);