/**
 * Component definition for the frost-text component
 */
import Ember from 'ember'
const {Component, get, isPresent, on, set} = Ember
import {task, timeout} from 'ember-concurrency'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import FrostEventsProxyMixin from '../mixins/frost-events-proxy'
import SpreadMixin from 'ember-spread'

import layout from '../templates/components/frost-text'

export default Component.extend(SpreadMixin, FrostEventsProxyMixin, PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: [
    'isClearVisible',
    'isClearEnabled'
  ],

  classNames: [
    'frost-text'
  ],

  layout,

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    align: PropTypes.string,
    hook: PropTypes.string,
    isClearEnabled: PropTypes.bool,
    isClearVisible: PropTypes.bool,
    isHookEmbedded: PropTypes.bool,
    receivedHook: PropTypes.string,
    tabindex: PropTypes.number,
    type: PropTypes.string,

    // Setting these as part of establishing an inital value
    autocapitalize: PropTypes.string,
    autofocus: PropTypes.bool,
    autocorrect: PropTypes.string,
    form: PropTypes.string,
    maxlength: PropTypes.number,
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    selectionDirection: PropTypes.string,
    spellcheck: PropTypes.bool,
    value: PropTypes.string,
    title: PropTypes.string,

    // state

    // keywords
    classNameBindings: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.any
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      align: 'left',
      autocapitalize: 'off',
      autocorrect: 'off',
      autofocus: false,
      isClearEnabled: false,
      isClearVisible: false,
      isHookEmbedded: false,
      readonly: false,
      required: false,
      selectionDirection: 'none',
      spellcheck: false,
      tabindex: 0,
      type: 'text',

      // Setting these as part of establishing an initial value
      form: null,
      maxlength: null,
      placeholder: null,
      title: null,
      value: null

      // state
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == Tasks ==================================================================

  // FIXME: jsdoc
  _clear: task(function * () {
    this.$('input')
      .focus()
      .val('')
      .trigger('input')
  }).restartable(),

  // FIXME: jsdoc
  _showClear: task(function * (isFocused) {
    const showClear = isFocused && isPresent(get(this, 'value')) && !get(this, 'readonly')
    if (get(this, 'isClearVisible') === showClear) {
      return
    }

    set(this, 'isClearVisible', showClear)

    // If the clear button is clicked the focusOut event occurs before
    // the click event, so delay disabling the clear so that the click
    // can process first
    if (!showClear) {
      yield timeout(200) // Duration of the visibility animation
    }
    set(this, 'isClearEnabled', showClear)
  }).restartable(),

  // == DOM Events ============================================================

  // FIXME: jsdoc
  _showClearEvent: on('focusIn', 'focusOut', 'input', function (event) {
    const isFocused = event.type !== 'focusout'
    get(this, '_showClear').perform(isFocused)
  }),

  // == Lifecycle Hooks =======================================================

  /* Ember.Component method */
  init () {
    this._super(...arguments)
    this.receivedHook = this.hook
    if (get(this, 'isHookEmbedded')) {
      this.hook = ''
    }
  },

  // == Actions ================================================================

  // Setting 'keyUp' directly on the {{input}} helper overwrites
  // Ember's TextSupport keyUp property, which means that other
  // TextSupport events (i.e. 'enter' and 'escape') don't fire.
  // To avoid this, we use the TextSupport 'key-up' event and
  // proxy the event to the keyUp handler.
  actions: {
    // FIXME: jsdoc
    clear () {
      get(this, '_clear').perform()
    },

    // FIXME: jsdoc
    keyUp (value, event) {
      if (isPresent(get(this, '_eventProxy.keyUp'))) {
        this._eventProxy.keyUp(event)
      }
    },

    // FIXME: jsdoc
    _onInput (event) {
      if (isPresent(get(this, '_eventProxy.input'))) {
        // Add id and value for legacy support
        event.id = get(this, 'elementId')
        event.value = event.target.value
        this._eventProxy.input(event)
      }
    }
  }
})
