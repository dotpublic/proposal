(function () {
	'use strict';

	const makeArray = iterable => {
		const list = [];

		if (!iterable) {
			return list;
		}

		Array.prototype.forEach.call(iterable, function (item) {
			list.push(item);
		});

		return list;
	};

	/**
	 * create-event.js
	 * Wrapper for customEvent
	 * Generate namespaced events
	 */

	/**
	 * Polyfill customEvent
	 * @function customEvent
	 * @param {String} eventName namespaced name of the event
	 * @param {Object=} _parameters customEvent options
	 * @return {Event}
	 */
	const customEvent = (eventName, _parameters) => {
		_parameters = _parameters || {bubbles: false, cancelable: false, detail: null};
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent(eventName, _parameters.bubbles, _parameters.cancelable, _parameters.detail);
		return event;
	};

	/**
	 * Create a custom event
	 * @function createEvent
	 * @param {String} eventName name of the event
	 * @param {String} namespace namespace e.g. component name
	 * @param {Object=} _parameters customEvent options
	 * @return {Event}
	 */
	const createEvent = (eventName, namespace, _parameters) => {
		let event;

		if (typeof window.CustomEvent === 'function') {
			event = new CustomEvent(`${namespace}:${eventName}`, _parameters);
		} else {
			event = customEvent(`${namespace}:${eventName}`, _parameters);
		}

		return event;
	};

	/**
	 * @param {integer} length - Length of randomly generated string
	 * @returns {string} - Randomly generated string
	 */

	const randomString = length => (Math.random() + 1).toString(36).substring(12 - length);

	/**
	 * Local Constants
	 */

	const defaultOptions = {
		TARGET_HIDE_CLASS: 'u-js-hide',
		TRIGGER_OPEN_CLASS: 'is-open',
		TRIGGER_OPEN_LABEL: undefined,
		CLOSE_ON_FOCUS_OUT: true,
		CLOSE_ON_DOCUMENT_CLICK: true,
		AUTOFOCUS: null,
		OPEN_EVENT: false,
		DEFAULT_OPEN: false,
	};

	const Expander = class {
		constructor(trigger, target, options = {}) {
			this._options = Object.assign({}, defaultOptions, options);
			this._autoFocusElement = trigger;
			this._triggerEl = trigger;
			this._targetEl = target;
			this._originalTriggerText = trigger.textContent;
			this._isOpen = this._options.DEFAULT_OPEN;
			this._handleButtonClick = this._handleButtonClick.bind(this);
			this._handleButtonKeydown = this._handleButtonKeydown.bind(this);
			this._handleDocumentClick = this._handleDocumentClick.bind(this);
			this._handleDocumentKeydown = this._handleDocumentKeydown.bind(this);
		}

		/**
		 * Event Handlers
		 */

		_handleButtonClick(event) {
			event.preventDefault();

			if (this._isOpen) {
				this.close();
			} else {
				this.open();
			}
		}

		_handleButtonKeydown(event) {
			if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
				event.preventDefault();

				if (this._isOpen) {
					this.close();
				} else {
					this.open();
				}
			}
		}

		_handleDocumentKeydown(event) {
			if (event.key === 'Escape') {
				this.close();
				this._triggerEl.focus();
			}

			if (this._options.CLOSE_ON_FOCUS_OUT) {
				if (event.key === 'Tab' && event.shiftKey === true) {
					if (event.target === this._targetTabbableItems[0] || event.target === this._triggerEl || event.target === this._targetEl) {
						event.preventDefault();
						window.requestAnimationFrame(() => {
							this.close();
							this._triggerEl.focus();
						});
					}
				}

				if (event.key === 'Tab' && event.shiftKey === false) {
					if (event.target === this._targetTabbableItems[this._targetTabbableItems.length - 1]) {
						event.preventDefault();
						window.requestAnimationFrame(() => {
							this.close();
							this._triggerEl.focus();
						});
					}
				}
			}
		}

		_handleDocumentClick(event) {
			let target = event.target;

			if (target === this._targetEl || target === this._triggerEl || this._targetEl.contains(target) || this._triggerEl.contains(target) || !this._options.CLOSE_ON_DOCUMENT_CLICK) {
				return;
			}

			this.close();
		}

		/**
		 * Temporary Event Listeners
		 */

		_setupTemporaryEventListeners() {
			document.addEventListener('keydown', this._handleDocumentKeydown);

			if (this._options.CLOSE_ON_FOCUS_OUT) {
				document.addEventListener('click', this._handleDocumentClick);
			}
		}

		_removeTemporaryEventListeners() {
			document.removeEventListener('keydown', this._handleDocumentKeydown);

			if (this._options.CLOSE_ON_FOCUS_OUT) {
				document.removeEventListener('click', this._handleDocumentClick);
			}
		}

		/**
		 * Attributes
		 */

		_updateAttributes() {
			// eslint-disable-next-line unicorn/consistent-function-scoping
			this._triggerEl.setAttribute('aria-expanded', this._isOpen.toString());

			if (this._isOpen) {
				this._targetEl.removeAttribute('hidden');
			} else {
				this._targetEl.setAttribute('hidden', '');
			}
		}

		/**
		 * Class attributes
		 */

		_updateClassAttributes() {
			if (this._isOpen) {
				this._triggerEl.classList.add(this._options.TRIGGER_OPEN_CLASS);
				this._targetEl.classList.remove(this._options.TARGET_HIDE_CLASS);
			} else {
				this._triggerEl.classList.remove(this._options.TRIGGER_OPEN_CLASS);
				this._targetEl.classList.add(this._options.TARGET_HIDE_CLASS);
			}
		}

		/**
		 * Trigger Label
		 */

		_updateTriggerLabel() {
			if (this._options.TRIGGER_OPEN_LABEL) {
				this._triggerEl.textContent = this._isOpen ? this._options.TRIGGER_OPEN_LABEL : this._originalTriggerText;
			}
		}

		/**
		 * Tabbable Items
		 */

		_updateTabbableItems() {
			this._targetTabbableItems = makeArray(this._targetEl.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)).filter(element => window.getComputedStyle(element).getPropertyValue('visibility') !== 'hidden');
		}

		/**
		 * AutoFocus
		 */

		_handleAutoFocus() {
			if (this._options.AUTOFOCUS === 'target') {
				this._autoFocusElement = this._targetEl;
				this._targetEl.setAttribute('tabindex', '-1');
			}
			if (this._options.AUTOFOCUS === 'firstTabbable') {
				this._autoFocusElement = this._targetTabbableItems.length > 0 && this._targetTabbableItems[0];
				if (this._autoFocusElement.setSelectionRange) {
					this._autoFocusElement.setSelectionRange(0, this._autoFocusElement.value.length);
				}
			}
			this._autoFocusElement.focus();
		}

		/**
		 * @public
		 */

		/**
		 * Toggling
		 */

		open() {
			if (this._isOpen) {
				return;
			}

			this._isOpen = true;

			this._updateTriggerLabel();
			this._updateAttributes();
			this._updateClassAttributes();
			this._updateTabbableItems();

			this._setupTemporaryEventListeners();
			this._handleAutoFocus();

			if (this._options.OPEN_EVENT) {
				const event = createEvent('open', 'globalExpander', {
					bubbles: false
				});
				this._triggerEl.dispatchEvent(event);
			}
		}

		close() {
			if (!this._isOpen) {
				return;
			}

			this._isOpen = false;

			this._updateTriggerLabel();
			this._updateAttributes();
			this._updateClassAttributes();

			this._removeTemporaryEventListeners();
		}

		init() {
			if (this._triggerEl.tagName === 'A' && this._triggerEl.getAttribute('href').charAt(0) === '#') {
				// eslint-disable-next-line no-script-url
				this._triggerEl.setAttribute('href', 'javascript:;');
				this._triggerEl.setAttribute('role', 'button');
			}

			if (this._triggerEl.getAttribute('aria-controls') === null ) {
				if (this._targetEl.id.length > 0) {
					this._triggerEl.setAttribute('aria-controls', this._targetEl.id);
				} else {
					const generatedID = randomString(8);
					this._triggerEl.setAttribute('aria-controls', generatedID);
					this._targetEl.setAttribute('id', generatedID);
				}
			}

			// Warn screen reader users when you are stealing focus
			if (this._options.AUTOFOCUS) {
				this._triggerEl.setAttribute('aria-haspopup', 'true');
			}

			this._updateTriggerLabel();
			this._updateAttributes();
			this._updateClassAttributes();

			this._triggerEl.addEventListener('click', this._handleButtonClick);
			this._triggerEl.addEventListener('keydown', this._handleButtonKeydown);
		}
	};

	class EdsCHeaderNew {

		constructor(selector = 'data-eds-c-header-new') {
			this.selector = `[${selector}]`;
			this.dataComponent = '[data-eds-c-header-new-expander]';
			this.expanderAnchor = '[data-eds-c-header-new-expander-anchor]';
			this.countElementCart = '[data-eds-c-header-new-cart-count]';
			this.countElementNotifications = '[data-eds-c-header-new-notifications-count]';
			this.dropDownCountElementNotifications = '[data-eds-c-header-new-dropdown-notifications-count]';
			this.ariaLiveAnnouncementsList = '[data-eds-c-header-new-aria-live-announcements]';
			this.ariaLabelCart = '[data-eds-c-header-new-cart-aria-label]';
			this.ariaLabelNotifications = '[data-eds-c-header-new-notification-aria-label]';
			this.tethered = 'has-tethered';
		}

		_findTarget(selector){
			if (selector) {
				return document.querySelector(selector);
			}
			return null;
		}

		_uiHandler(countElement) {
			const spanElement = document.querySelector(countElement);
			if (spanElement) {
				if (spanElement.classList.contains('u-display-none')) {
					spanElement.classList.remove('u-display-none');
				}
			}
		}

		_createAndAppendNewAriaLiveItem (message) {
			const el = document.querySelector(this.ariaLiveAnnouncementsList);
			const newItem = document.createElement('p');
			newItem.innerHTML = message;
			el.appendChild(newItem);
		}

		_actionItemsCountHandler(type, count, message) {
			const countSelector = this[`countElement${type}`];
			const labelSelectorElement = document.querySelector(this[`ariaLabel${type}`]);

			if (count >= 0) {
				this._uiHandler(countSelector);
			}
			document.querySelector(countSelector).innerHTML = count;
			if (labelSelectorElement) {
				labelSelectorElement.innerHTML = message;
			}
			this._createAndAppendNewAriaLiveItem(message);
		}

		_dropdownNotificationCountHandler(count) {
			const counter = document.querySelector(this.dropDownCountElementNotifications);
			if (counter) {
				counter.innerHTML = count;
			}
		}

		cartHandler(count, ariaLiveMessage) {
			this._actionItemsCountHandler('Cart', count, ariaLiveMessage);
		}

		notificationHandler(count, ariaLiveMessage) {
			this._actionItemsCountHandler('Notifications', count, ariaLiveMessage);
			this._dropdownNotificationCountHandler(count);
		}

		cleanAriaLiveAnnouncements() {
			document.querySelector(this.ariaLiveAnnouncementsList).innerHTML = '';
		}

		init() {
			const headerElement = document.querySelector(this.selector);

			if (!headerElement) {
				return;
			}

			const triggerElements = document.querySelectorAll(this.dataComponent);

			if (triggerElements.length === 0 || !headerElement) {
				return;
			}

			makeArray(triggerElements).forEach(trigger => {
				const targetElement = this._findTarget(trigger.getAttribute('data-eds-c-header-new-js'));

				if (!targetElement) {
					return;
				}
				const triggerAttributes = [{name: 'role', value: 'button'}];
				triggerAttributes.forEach(function (attribute) {
					trigger.setAttribute(attribute.name, attribute.value);
				});
				if (targetElement.hasAttribute('data-eds-c-header-new-expander-append')) {
					headerElement.querySelector(this.expanderAnchor).append(targetElement);
				} else {
					headerElement.after(targetElement);
				}
				targetElement.classList.add(this.tethered);
				const expander = new Expander(trigger, targetElement, {AUTOFOCUS: 'firstTabbable'});
				expander.init();

				return expander;
			});
		}
	}

	/**
	 * Constants
	 */

	const DATA_COMPONENT = 'data-eds-c-navigation-expander';

	const classNames = {
		TETHERED: 'has-tethered'
	};

	const selectors = {
		DATA_COMPONENT: `[${DATA_COMPONENT}]`,
		NAVIGATION: '[data-eds-c-navigation]'
	};

	const findTarget = selector => {
		if (selector) {
			return document.querySelector(selector);
		}
		return null;
	};

	const navigation = () => {
		const triggerElements = document.querySelectorAll(selectors.DATA_COMPONENT);
		const navigationElement = document.querySelector(selectors.NAVIGATION);

		const triggerAttributes = [
			{name: 'role', value: 'button'}
		];

		if (triggerElements.length === 0 || !navigationElement) {
			return;
		}

		makeArray(triggerElements).forEach(trigger => {
			const targetElement = findTarget(trigger.hash); // #explore

			if (!targetElement) {
				return;
			}

			const parentNav = targetElement.closest('[data-eds-c-navigation-expander-nav]');

			if (parentNav) {
				parentNav.classList.add('u-display-none');
			}

			triggerAttributes.forEach(function (attribute) {
				trigger.setAttribute(attribute.name, attribute.value);
			});

			trigger.after(targetElement);
			targetElement.classList.add(classNames.TETHERED);

			const expander = new Expander(trigger, targetElement, {AUTOFOCUS: 'firstTabbable'});

			expander.init();

			return expander;
		});
	};

	class EdsCAccordion {

		constructor(selector = 'data-eds-c-accordion'){
			this.triggersSelector = `[${selector}]`;
		}

		findTarget(headerElement, selector){
			if (selector) {
				return document.querySelector(selector);
			}
			return null;
		}

		init() {
			const triggerElements = document.querySelectorAll(this.triggersSelector);
			if (triggerElements.length === 0) {
				return;
			}

			makeArray(triggerElements).forEach(trigger => {
				const targetElementSelector = trigger.getAttribute('aria-controls');
				if (!targetElementSelector) {
					return;
				}
				const targetElement = document.querySelector(`#${targetElementSelector}`);
				if (!targetElement) {
					return;
				}

				const defaultOpen = trigger.getAttribute('aria-expanded');

				const expander = new Expander(trigger, targetElement, {AUTOFOCUS: 'firstTabbable', DEFAULT_OPEN: defaultOpen === 'true', CLOSE_ON_DOCUMENT_CLICK: false});
				expander.init();

				return expander;
			});
		}
	}

	var header = new EdsCHeaderNew();
	header.init();
	navigation();
	var accordion = new EdsCAccordion();
	accordion.init();
	console.log('js loaded');

})();
//# sourceMappingURL=bundle.js.map
