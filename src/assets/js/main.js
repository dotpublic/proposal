import EdsCHeaderNew from '@springernature/elements/components/eds-c-header-new/js/eds-c-header-new';
import navigation from '@springernature/elements/components/eds-c-navigation/js/eds-c-navigation';
import EdsCAccordion from '@springernature/elements/components/eds-c-accordion/js/eds-c-accordion';

const header = new EdsCHeaderNew();
header.init();

navigation();

const accordion = new EdsCAccordion();
accordion.init();

// Language switcher enhancement
(function() {
  var links = document.querySelector('.language-switcher-links');
  var selectWrapper = document.querySelector('.language-switcher-select');
  if (!links || !selectWrapper) return;
  
  var select = document.getElementById('language-select');
  var currentLang = select.getAttribute('data-current-lang');
  
  // Hide links and show dropdown when JS is available
  links.style.display = 'none';
  selectWrapper.style.display = 'inline-block';
  
  // Add JS-based switching
  select.addEventListener('change', function() {
    switchLanguage(this.value);
  });
  
  function switchLanguage(langCode) {
    var currentPath = window.location.pathname;
    var pathPrefix = '/proposal/';
    
    // Remove path prefix
    var path = currentPath.replace(pathPrefix, '/');
    
    // Remove current language code from path if present
    path = path.replace(/^\/(en|es|ga)\//, '/');
    
    // Build new path with selected language
    var newPath;
    if (langCode === 'en') {
      newPath = pathPrefix + path.substring(1);
    } else {
      newPath = pathPrefix + langCode + path;
    }
    
    window.location.href = newPath;
  }
})();

console.log('js loaded');

