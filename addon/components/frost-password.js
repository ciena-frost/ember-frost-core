import computed from 'ember-computed-decorators'
import Ember from 'ember'
const {
  Component,
  get
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

  /*
    At this time the following attributes are passed through to frost-text which
    in turn passes them into {{input}}. These attributes are being set
    here because the base {{input}} never sets them and therefore they are
    still undefined.

    autofocus
    form
    maxlength
    placeholder
    readonly
    required
    selectionDirection
    title
   */

  propTypes: {
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    isRevealed: PropTypes.bool,
    revealable: PropTypes.bool,
    tabindex: PropTypes.number,
    value: PropTypes.string,

    // Setting these as part of establishing an inital value
    autofocus: PropTypes.bool,
    form: PropTypes.string,
    maxlength: PropTypes.number,
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    selectionDirection: PropTypes.string,
    title: PropTypes.string
  },

  getDefaultProps () {
    return {
      disabled: false,
      isRevealed: false,
      revealable: false,
      tabindex: 0,
      value: null,

      // Setting these as part of establishing an initial value
      autofocus: false,
      form: null,
      maxlength: null,
      placeholder: null,
      readonly: false,
      required: false,
      selectionDirection: 'none',
      title: null
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
      get(this, '_toggleReveal').perform()
    }
  }
})
