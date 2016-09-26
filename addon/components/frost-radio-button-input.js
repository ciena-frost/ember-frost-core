import Ember from 'ember'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import FrostEvents from '../mixins/frost-events'

const {
  Component,
  computed
} = Ember

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
      type: 'radio'
    }
  },

  // == Computed properties ====================================================
  checked: computed('groupValue', 'value', function () {
    return this.get('groupValue') === this.get('value')
  }),

  // == Functions ==============================================================
  init () {
    this._super(...arguments)

    let assert = `${this.toString()} must be initialized in the yield block of 'frost-radio-button'`
    let cond = /frost-radio-button/.test(this.parentView.toString())
    Ember.assert(assert, cond)
  }

})
