import Ember from 'ember'
const {
  Component,
  isPresent,
  on
} = Ember
import {
  task,
  timeout
} from 'ember-concurrency'
import FrostEventsProxy from '../mixins/frost-events-proxy'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-text'

export default Component.extend(FrostEventsProxy, PropTypeMixin, {
  // == Properties =============================================================

  classNames: [
    'frost-text'
  ],
  classNameBindings: [
    'isClearVisible',
    'isClearEnabled'
  ],
  layout,

  propTypes: {
    align: PropTypes.string,
    hook: PropTypes.string,
    isClearEnabled: PropTypes.bool,
    isClearVisible: PropTypes.bool,
    isHookEmbedded: PropTypes.bool,
    receivedHook: PropTypes.string,
    tabindex: PropTypes.number,
    type: PropTypes.string
  },

  getDefaultProps () {
    return {
      align: 'left',
      isClearEnabled: false,
      isClearVisible: false,
      isHookEmbedded: false,
      tabindex: 0,
      type: 'text'
    }
  },

  // == Events =================================================================

  init () {
    this._super(...arguments)
    this.receivedHook = this.hook
    if (this.get('isHookEmbedded')) {
      this.hook = ''
    }
  },

  _showClearEvent: on('focusIn', 'focusOut', 'input', function (event) {
    const isFocused = event.type !== 'focusout'
    this.get('_showClear').perform(isFocused)
  }),

  // == Tasks ==================================================================

  _clear: task(function * () {
    this.$('input')
      .focus()
      .val('')
      .trigger('input')
  }).restartable(),

  _showClear: task(function * (isFocused) {
    const showClear = isFocused && isPresent(this.get('value'))
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
      if (Ember.isPresent(Ember.get(this, '_eventProxy.keyUp'))) {
        this._eventProxy.keyUp(event)
      }
    },

    _onInput (event) {
      if (Ember.isPresent(Ember.get(this, '_eventProxy.input'))) {
        // Add id and value for legacy support
        event.id = this.get('elementId')
        event.value = event.target.value
        this._eventProxy.input(event)
      }
    }
  }
})
