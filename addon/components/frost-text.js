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
    onClear: PropTypes.func,
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
    step: PropTypes.string,
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
      step: 'any',
      tabindex: 0,
      type: 'text'
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == Tasks ==================================================================

  _clear: task(function * () {
    this.$('input')
      .focus()
      .val('')
      .trigger('input')

    if (this.onClear) {
      this.onClear()
    }
  }).restartable(),
  /* eslint-disable complexity */
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
    if (!this.get('isDestroyed') && !this.get('isDestroying')) this.set('isClearEnabled', showClear)
  }).restartable(),
  /* eslint-enable complexity */

  // == DOM Events ============================================================

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
    clear () {
      this.get('_clear').perform()
    },

    keyUp (value, event) {
      if (isPresent(this.get('_eventProxy.keyUp'))) {
        this._eventProxy.keyUp(event)
      }
    },

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
