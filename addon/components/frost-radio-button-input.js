import Ember from 'ember'
const {
  Component
} = Ember
import computed from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import FrostEvents from '../mixins/frost-events'

export default Component.extend(FrostEvents, PropTypeMixin, {
  // == Properties =============================================================
  attributeBindings: [
    'checked',
    'disabled',
    'value',
    'type'
  ],
  classNames: ['frost-radio-button-input'],
  tagName: 'input',

  propTypes: {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string
  },

  getDefaultProps () {
    return {
      disabled: false,
      groupValue: null,
      type: 'radio',
      value: null
    }
  },

  // == Computed properties ====================================================

  @computed('groupValue', 'value')
  /**
   * Determine checked state
   * @param {String} groupValue - which radio button in the group is set
   * @param {String} value - is this radio button selected
   * @returns {Boolean} whether this radio button is checked
   */
  checked (groupValue, value) {
    return groupValue === value
  },

  // == Functions ==============================================================
  init () {
    this._super(...arguments)
    this._setupAssertions()
  },

  _setupAssertions () {
    let assert = `${this.toString()} must be initialized in the yield block of 'frost-radio-button'`
    let cond = /frost-radio-button/.test(this.parentView.toString())
    Ember.assert(assert, cond)
  }

})
