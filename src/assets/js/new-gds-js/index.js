import { nodeListForEach } from '../../govuk/common';
import Accordion from '../../govuk/components/accordion/accordion';
import Button from '../../govuk/components/button/button';
import Details from '../../govuk/components/details/details';
import CharacterCount from '../../govuk/components/character-count/character-count';
import Checkboxes from '../../govuk/components/checkboxes/checkboxes';
import ErrorSummary from '../../govuk/components/error-summary/error-summary';
import Header from '../../govuk/components/header/header';
import Radios from '../../govuk/components/radios/radios';
import Tabs from '../../govuk/components/tabs/tabs';

function initAll(options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {};

  // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document;

  var $buttons = scope.querySelectorAll('[data-module="govuk-button"]');
  nodeListForEach($buttons, function($button) {
    new Button($button).init();
  });

  var $accordions = scope.querySelectorAll('[data-module="govuk-accordion"]');
  nodeListForEach($accordions, function($accordion) {
    new Accordion($accordion).init();
  });

  var $details = scope.querySelectorAll('[data-module="govuk-details"]');
  nodeListForEach($details, function($detail) {
    new Details($detail).init();
  });

  var $characterCounts = scope.querySelectorAll('[data-module="govuk-character-count"]');
  nodeListForEach($characterCounts, function($characterCount) {
    new CharacterCount($characterCount).init();
  });

  var $checkboxes = scope.querySelectorAll('[data-module="govuk-checkboxes"]');
  nodeListForEach($checkboxes, function($checkbox) {
    new Checkboxes($checkbox).init();
  });

  // Find first error summary module to enhance.
  var $errorSummary = scope.querySelector('[data-module="govuk-error-summary"]');
  new ErrorSummary($errorSummary).init();

  // Find first header module to enhance.
  var $toggleButton = scope.querySelector('[data-module="govuk-header"]');
  new Header($toggleButton).init();

  var $radios = scope.querySelectorAll('[data-module="govuk-radios"]');
  nodeListForEach($radios, function($radio) {
    new Radios($radio).init();
  });

  var $tabs = scope.querySelectorAll('[data-module="govuk-tabs"]');
  nodeListForEach($tabs, function($tabs) {
    new Tabs($tabs).init();
  });
}

export { initAll, Accordion, Button, Details, CharacterCount, Checkboxes, ErrorSummary, Header, Radios, Tabs };
