/**
 * Component definition for frost-textarea component
 */
import FrostEventsProxyMixin from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-textarea'
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
    autofocus: PropTypes.bool,
    cols: PropTypes.number,
    disabled: PropTypes.bool,
    form: PropTypes.string,
    isClearEnabled: PropTypes.bool,
    isClearVisible: PropTypes.bool,
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    rows: PropTypes.number,
    tabindex: PropTypes.number,
    value: PropTypes.string,
    wrap: PropTypes.string

    // state
  },

  getDefaultProps () {
    return {
      // options
      autofocus: false,
      isClearEnabled: false,
      isClearVisible: false,
      disabled: false,
      readonly: false,
      tabindex: 0,

      // Setting these as part of establishing an initial value
      cols: null,
      form: null,
      rows: null,
      placeholder: null,
      value: null,
      wrap: 'soft'

      // state
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == Tasks ==================================================================

  _clear: task(function * () {
    this.$('textarea')
      .focus()
      .val('')
      .trigger('input')
  }).restartable(),

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

  _showClearEvent: on('focusIn', 'focusOut', 'input', function (event) {
    const isFocused = event.type !== 'focusout'
    this.get('_showClear').perform(isFocused)
  }),

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    clear () {
      this.get('_clear').perform()
    },

    // Setting 'keyUp' directly on the {{input}} helper overwrites
    // Ember's TextSupport keyUp property, which means that other
    // TextSupport events (i.e. 'enter' and 'escape') don't fire.
    // To avoid this, we use the TextSupport 'key-up' event and
    // proxy the event to the keyUp handler.
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
