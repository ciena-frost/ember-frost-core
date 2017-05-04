/**
 * Component definition for the frost-password component
 */
import FrostEventsProxy from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-password'
import Component from './frost-component'
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import {PropTypes} from 'ember-prop-types'

export default Component.extend(FrostEventsProxy, {

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

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

  // == PropTypes =============================================================

  propTypes: {
    // options
    disabled: PropTypes.bool,
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

    // state
  },

  getDefaultProps () {
    return {
      // options
      disabled: false,
      isRevealed: false,
      revealable: false,
      tabindex: 0,

      // Setting these as part of establishing an initial value
      autofocus: false,
      readonly: false,
      required: false,
      selectionDirection: 'none'
    }
  },

  // == Computed properties  ==================================================

  @readOnly
  @computed('isRevealed')
  /**
   * The message to display on the reveal button
   * @param {Boolean} isRevealed - true if the password is revealed
   * @returns {String} the message for the reveal button
   */
  revealMessage (isRevealed) {
    return isRevealed ? 'Hide' : 'Show'
  },

  @readOnly
  @computed('isRevealed')
  /**
   * The type of the <input>
   * @param {Boolean} isRevealed - true if the password is revealed
   * @returns {String} the type of the <input>
   */
  type (isRevealed) {
    return isRevealed ? 'text' : 'password'
  },

  // == Tasks =================================================================

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

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    /**
     * Toggle the reveal property using an ember-concurrency task
     */
    toggleReveal () {
      this.get('_toggleReveal').perform()
    }
  }
})
