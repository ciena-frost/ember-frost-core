import computed from 'ember-computed-decorators'
import Ember from 'ember'
const {
  Component,
  isPresent,
  on,
  run,
  $
} = Ember
import {
  task,
  timeout
} from 'ember-concurrency'
import FrostEventsProxy from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-text'

export default Component.extend(FrostEventsProxy, {

  // == Properties =============================================================

  align: 'left', // TODO PropTypes
  classNames: [
    'frost-text'
  ],
  classNameBindings: [
    'isClearVisible',
    'isClearEnabled'
  ],
  eventVersion: null, // TODO Deprecation message
  isClearEnabled: false, // TODO PropTypes
  isClearVisible: false, // TODO PropTypes
  layout,
  tabindex: 0, // TODO PropTypes
  type: 'text', // TODO PropTypes

  // == Computed properties  ===================================================

  @computed('value', '_focused')
  isFocusedWithValue(value, _focused) {
    return this._focused && isPresent(this.value)
  },

  // == Events =================================================================

  _focusIn: on('focusIn', function() {
    this.set('_focused', true)
    this.get('_toggleClear').perform(this.get('isFocusedWithValue'))
  }),

  _focusOut: on('focusOut', function(event) {
    this.set('_focused', false)
    this.get('_toggleClear').perform(this.get('isFocusedWithValue'))
  }),

  _input: on('input', function(event) {
    this.get('_toggleClear').perform(this.get('isFocusedWithValue'))
  }),

  // == Tasks ==================================================================

  _toggleClear: task(function * (isVisible) {
    if (isVisible) {
      this.setProperties({
        isClearEnabled: true,
        isClearVisible: true
      })
    } else {
      this.set('isClearVisible', false)
      yield timeout(200)
      this.set('isClearEnabled', false)
    }
  }).restartable(),

  // == Actions ================================================================

  // Setting 'keyUp' directly on the {{input}} helper overwrites
  // Ember's TextSupport keyUp property, which means that other
  // TextSupport events (i.e. 'enter' and 'escape') don't fire.
  // To avoid this, we use the TextSupport 'key-up' event and
  // proxy the event to the keyUp handler.
  actions: {
    clear() {
      this.$('input').focus()
      this.$('input').val('')
      this.$('input').trigger('input')
    },

    keyUp(value, event) {
      if (Ember.isPresent(Ember.get(this, '_eventProxy.keyUp'))) {
        this._eventProxy.keyUp(event)
      }
    },

    _onInput(event) {
      if (Ember.isPresent(Ember.get(this, '_eventProxy.input'))) {
        if (!this.eventVersion) {
          this._eventProxy.input({
            id: this.get('elementId'),
            value: event.target.value
          })
        } else if (this.eventVersion === '2') {
          this._eventProxy.input(event)
        }
      }
    }
  }
})
