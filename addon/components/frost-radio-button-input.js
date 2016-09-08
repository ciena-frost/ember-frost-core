import Ember from 'ember'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

const {
  Component,
  computed: {
    alias
  }
} = Ember

export default Component.extend(PropTypeMixin, {
  // == Properties =============================================================
  attributeBindings: [
    'checked',
    'disabled',
    'value',
    'type'
  ],
  classNames: [
    'frost-radio-button-input'
  ],
  tagName: 'input',

  propTypes: {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    type: PropTypes.string
  },

  getDefaultProps () {
    return {
      disabled: false,
      type: 'radio'
    }
  },

  // == Computed properties ====================================================

  checked: alias('parentView.checked'),

  // == Functions ==============================================================
  didInsertElement () {
    this._super(...arguments)

    let assert = `${this.toString()} must exist inside 'frost-radio-button'`
    let cond = /frost-radio-button/.test(this.parentView.toString())
    Ember.assert(assert, cond)
  }
})
