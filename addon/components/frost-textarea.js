import Ember from 'ember'
const {
  Component,
  get,
  isPresent,
  on,
  set
} = Ember
import {
  task,
  timeout
} from 'ember-concurrency'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import FrostEventsProxy from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-textarea'

export default Component.extend(FrostEventsProxy, PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Properties ============================================================
  classNames: [
    'frost-textarea'
  ],
  classNameBindings: [
    'isClearVisible',
    'isClearEnabled'
  ],
  layout,

  propTypes: {
    autofocus: PropTypes.bool,
    cols: PropTypes.number,
    disabled: PropTypes.bool,
    form: PropTypes.string,
    hook: PropTypes.string,
    isClearEnabled: PropTypes.bool,
    isClearVisible: PropTypes.bool,
    isHookEmbedded: PropTypes.bool,
    receivedHook: PropTypes.string,
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    rows: PropTypes.number,
    tabindex: PropTypes.number,
    value: PropTypes.string,
    wrap: PropTypes.string
  },

  getDefaultProps () {
    return {
      autofocus: false,
      isClearEnabled: false,
      isClearVisible: false,
      isHookEmbedded: false,
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
    }
  },

  // // == Events ================================================================

  init () {
    this._super(...arguments)
    this.receivedHook = this.hook
    if (get(this, 'isHookEmbedded')) {
      this.hook = ''
    }
  },

  _showClearEvent: on('focusIn', 'focusOut', 'input', function (event) {
    const isFocused = event.type !== 'focusout'
    get(this, '_showClear').perform(isFocused)
  }),

  // == Tasks ==================================================================

  _clear: task(function * () {
    this.$('textarea')
      .focus()
      .val('')
      .trigger('input')
  }).restartable(),

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

  // == Actions ===============================================================

  actions: {
    clear () {
      get(this, '_clear').perform()
    },

    // Setting 'keyUp' directly on the {{input}} helper overwrites
    // Ember's TextSupport keyUp property, which means that other
    // TextSupport events (i.e. 'enter' and 'escape') don't fire.
    // To avoid this, we use the TextSupport 'key-up' event and
    // proxy the event to the keyUp handler.
    keyUp (value, event) {
      if (isPresent(get(this, '_eventProxy.keyUp'))) {
        this._eventProxy.keyUp(event)
      }
    },

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
