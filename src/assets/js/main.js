import EdsCHeaderNew from '@springernature/elements/components/eds-c-header-new/js/eds-c-header-new';
import navigation from '@springernature/elements/components/eds-c-navigation/js/eds-c-navigation';
import EdsCAccordion from '@springernature/elements/components/eds-c-accordion/js/eds-c-accordion';

const header = new EdsCHeaderNew();
header.init();

navigation();

const accordion = new EdsCAccordion();
accordion.init();

console.log('js loaded');

