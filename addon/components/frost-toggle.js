/**
 * Component definition for the frost-toggle component
 */
import Ember from 'ember'
const {ViewUtils, assert, deprecate, isPresent, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'

import FrostEventsProxyMixin from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-toggle'
import {cloneEvent} from '../utils'
import Component from './frost-component'

export default Component.extend(SpreadMixin, PropTypeMixin, FrostEventsProxyMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  attributeBindings: [
    'disabled'
  ],

  classNameBindings: [
    '_isToggled:toggled',
    'disabled'
  ],

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    disabled: PropTypes.bool,
    falseLabel: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ]),
    falseValue: PropTypes.any,
    onClick: PropTypes.func,
    onToggle: PropTypes.func,
    size: PropTypes.string,
    trueLabel: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ]),
    trueValue: PropTypes.any,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ])

    // state
  },

  getDefaultProps () {
    const falseLabel = this.get('falseLabel')
    const trueLabel = this.get('trueLabel')
    const validTypes = ['string', 'number', 'boolean']

    return {
      // options
      disabled: false,
      onToggle () {},
      size: 'medium',

      // state
      _falseLabel: validTypes.includes(typeOf(falseLabel)) ? falseLabel : false,
      _trueLabel: validTypes.includes(typeOf(trueLabel)) ? trueLabel : true
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('trueValue', '_trueLabel')
  _trueValue (trueValue, _trueLabel) {
    return (trueValue === undefined) ? _trueLabel : trueValue
  },

  @readOnly
  @computed('falseValue', '_falseLabel')
  _falseValue (falseValue, _falseLabel) {
    return (falseValue === undefined) ? _falseLabel : falseValue
  },

  @readOnly
  @computed('value')
  _isToggled (value) {
    return this._preferBoolean(value) === this.get('_trueValue')
  },

  // == Functions =============================================================

  _changeTarget (event, target) {
    const e = cloneEvent(event, target)
    const toggled = this.get('_isToggled')

    e.target.value = toggled ? this.get('_falseValue') : this.get('_trueValue')
    e.target.state = !toggled

    return e
  },

  _preferBoolean (value) {
    if (value === 'true') return true
    if (value === 'false') return false

    return value
  },

  _setupAssertion () {
    assert(`Same value has been assigned to both ${this.toString()}.trueValue and ${this.toString()}.falseValue`,
      (typeOf(this.get('trueValue')) === 'undefined' && typeOf(this.get('falseValue')) === 'undefined') ||
      this.get('trueValue') !== this.get('falseValue'))
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  init () {
    this._super(...arguments)
    const onClick = this.get('onClick')
    deprecate(
      '"frost-toggle" property "onClick" is deprecated. Please use the "onToggle" property instead.',
      onClick === undefined,
      {
        id: 'frost-toggle-onClick-deprecated',
        until: '2.0.0'
      }
    )
    this._setupAssertion()
  },

  // == Actions ===============================================================

  actions: {
    /* eslint-disable complexity */
    _onClick (event) {
      if (this.get('disabled')) return

      if (!ViewUtils.isSimpleClick(event)) {
        return true
      }

      event.stopPropagation()
      event.preventDefault()

      const value = this.get('_isToggled') ? this.get('_falseValue') : this.get('_trueValue')

      if (this.onToggle) {
        this.onToggle(value)
      }

      const onClick = this.attrs['onClick']
      if (onClick && onClick.update) {
        onClick.update(value)
      } else if (isPresent(this.get('_eventProxy.click'))) {
        //  override target to make sure it's always the <input> field
        const target = this.$('input')[0]
        this._eventProxy.click(this._changeTarget(event, target, value))
      }
    },
    /* eslint-enable complexity */

    /** A no-op action to avoid an action undefined error */
    noop () {}
  }
})
