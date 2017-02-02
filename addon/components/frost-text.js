/**
 * Component definition for the frost-text component
 */
import FrostEventsProxyMixin from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-text'
import Component from './frost-component'
import Ember from 'ember'
import {task, timeout} from 'ember-concurrency'
import {PropTypes} from 'ember-prop-types'
const {isPresent, on} = Ember

export default Component.extend(FrostEventsProxyMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: [
    'isClearVisible',
    'isClearEnabled'
  ],

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    align: PropTypes.string,
    isClearEnabled: PropTypes.bool,
    isClearVisible: PropTypes.bool,
    isHookEmbedded: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
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
    title: PropTypes.string

    // state
  },

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
      spellcheck: false,
      tabindex: 0,
      type: 'text'
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
    const showClear = isFocused && isPresent(this.get('value')) && !this.get('readonly')
    if (this.get('isClearVisible') === showClear) {
      return
    }

    this.set('isClearVisible', showClear)

    // If the clear button is clicked the focusOut event occurs before
    // the click event, so delay disabling the clear so that the click
    // can process first
    if (!showClear) {
      yield timeout(200) // Duration of the visibility animation
    }
    this.set('isClearEnabled', showClear)
  }).restartable(),

  // == DOM Events ============================================================

  // FIXME: jsdoc
  _showClearEvent: on('focusIn', 'focusOut', 'input', function (event) {
    const isFocused = event.type !== 'focusout'
    this.get('_showClear').perform(isFocused)
  }),

  // == Lifecycle Hooks =======================================================

  init () {
    this._super(...arguments)
    this.set('receivedHook', this.get('hook'))
    if (this.get('isHookEmbedded')) {
      this.set('hook', '')
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
      this.get('_clear').perform()
    },

    // FIXME: jsdoc
    keyUp (value, event) {
      if (isPresent(this.get('_eventProxy.keyUp'))) {
        this._eventProxy.keyUp(event)
      }
    },

    // FIXME: jsdoc
    _onInput (event) {
      if (isPresent(this.get('_eventProxy.input'))) {
        // Add id and value for legacy support
        event.id = this.get('elementId')
        event.value = event.target.value
        this._eventProxy.input(event)
      }
    }
  }
})
