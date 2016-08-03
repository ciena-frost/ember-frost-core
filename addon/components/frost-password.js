import computed from 'ember-computed-decorators'
import Ember from 'ember'
const {
  Component
} = Ember
import {
  task,
  timeout
} from 'ember-concurrency'
import FrostEventsProxy from '../mixins/frost-events-proxy'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-password'

export default Component.extend(FrostEventsProxy, PropTypeMixin, {

  // == Properties ============================================================

  classNames: [
    'frost-password'
  ],
  classNameBindings: [
    'revealable'
  ],
  layout,

  propTypes: {
    hook: PropTypes.string,
    isRevealed: PropTypes.bool,
    revealable: PropTypes.bool,
    tabindex: PropTypes.number
  },

  getDefaultProps () {
    return {
      isRevealed: false,
      revealable: false,
      tabindex: 0
    }
  },

  // == Computed properties  ===================================================

  @computed('isRevealed')
  revealMessage (isRevealed) {
    return isRevealed ? 'Hide' : 'Show'
  },

  @computed('isRevealed')
  type (isRevealed) {
    return isRevealed ? 'text' : 'password'
  },

  // == Tasks ==================================================================

  _toggleReveal: task(function * (isVisible) {
    this.toggleProperty('isRevealed')

    const $input = this.$('input').get(0)

    // Capture the current cursor selection/position
    const selectionStart = $input.selectionStart
    const selectionEnd = $input.selectionEnd

    // Re-focus the input
    $input.focus()

    yield timeout(0) // Let focus resolve prior to setting the cursor

    // Restore the cursor selection/position
    $input.selectionStart = selectionStart
    $input.selectionEnd = selectionEnd
  }).restartable(),

  // == Actions ===============================================================

  actions: {
    toggleReveal () {
      this.get('_toggleReveal').perform()
    }
  }
})
