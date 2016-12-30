/**
 * Component definition for the frost-toggle component
 */
import Ember from 'ember'
const {ViewUtils, assert, isPresent, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'

import Component from './frost-component'
import FrostEventsProxyMixin from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-toggle'
import {cloneEvent} from '../utils'

export default Component.extend(SpreadMixin, PropTypeMixin, FrostEventsProxyMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  attributeBindings: [
    '_isToggled:toggled',
    'disabled'
  ],

  classNameBindings: [
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
    hook: PropTypes.string,
    size: PropTypes.string,
    trueLabel: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ]),
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ])

    // state
  },

  getDefaultProps () {
    return {
      // options
      disabled: false,
      _falseLabel: this.get('falseLabel') !== undefined &&
      (typeOf(this.get('falseLabel') === 'string') || typeOf(this.get('falseLabel') === 'number'))
                ? this.get('falseLabel') : false,
      size: 'medium',
      _trueLabel: this.get('trueLabel') !== undefined &&
      (typeOf(this.get('trueLabel') === 'string') || typeOf(this.get('trueLabel') === 'number'))
                ? this.get('trueLabel') : true
    }
  },

  // == Computed Properties ===================================================

  @computed('trueValue', '_trueLabel')
  // FIXME: jsdoc
  // TODO: make computed property readOnly
  _trueValue (trueValue, _trueLabel) { // eslint-disable-line
    return trueValue || _trueLabel
  },

  @computed('falseValue', '_falseLabel')
  // FIXME: jsdoc
  // TODO: make computed property readOnly
  _falseValue (falseValue, _falseLabel) { // eslint-disable-line
    return falseValue || _falseLabel
  },

  @readOnly
  @computed('value')
  // FIXME: jsdoc
  _isToggled (value) {
    return this._preferBoolean(value) === this.get('_trueValue')
  },

  // == Functions =============================================================

  // FIXME: jsdoc
  _changeTarget (event, target) {
    const e = cloneEvent(event, target)
    const toggled = this.get('_isToggled')

    e.target.value = toggled ? this.get('_falseValue') : this.get('_trueValue')
    e.target.state = !toggled

    return e
  },

  // FIXME: jsdoc
  _preferBoolean (value) {
    if (value === 'true') return true
    if (value === 'false') return false

    return value
  },

  // FIXME: jsdoc
  _setupAssertion () {
    assert(`Same value has been assigned to both ${this.toString()}.trueValue and ${this.toString()}.falseValue`,
      (typeOf(this.get('trueValue')) === 'undefined' && typeOf(this.get('falseValue')) === 'undefined') ||
      this.get('trueValue') !== this.get('falseValue'))
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  /* Ember.Component method */
  init () {
    this._super(...arguments)
    this._setupAssertion()
  },

  // == Actions ===============================================================

  actions: {
    /* eslint-disable complexity */
    // FIXME: eslint
    _onClick (event) {
      if (this.get('disabled')) return

      if (!ViewUtils.isSimpleClick(event)) {
        return true
      }

      event.stopPropagation()
      event.preventDefault()

      const onClick = this.attrs['onClick']
      if (onClick && onClick.update) {
        onClick.update(this.get('_isToggled') ? this.get('_falseValue') : this.get('_trueValue'))
      } else if (isPresent(this.get('_eventProxy.click'))) {
        //  override target to make sure it's always the <input> field
        const target = this.$('input')[0]
        this._eventProxy.click(this._changeTarget(event, target))
      }
    },
    /* eslint-enable complexity */

    /** A no-op action to avoid an action undefined error */
    noop () {}
  }
})
