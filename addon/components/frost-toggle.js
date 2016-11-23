/**
 * Component definition for the frost-toggle component
 */
import Ember from 'ember'
const {Component, ViewUtils, assert, get, isPresent, typeOf} = Ember
import computed from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import FrostEventsProxyMixin from '../mixins/frost-events-proxy'
import layout from '../templates/components/frost-toggle'
import {cloneEvent} from '../utils'

export default Component.extend(PropTypeMixin, FrostEventsProxyMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  attributeBindings: [
    '_isToggled:toggled',
    'disabled'
  ],

  classNameBindings: [
    'disabled'
  ],

  classNames: ['frost-toggle'],

  layout: layout,

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
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
    ]),

    // state

    // keywords
    attributeBindings: PropTypes.arrayOf(PropTypes.string),
    classNameBindings: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.any
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      disabled: false,
      _falseLabel: get(this, 'falseLabel') !== undefined &&
      (typeOf(get(this, 'falseLabel') === 'string') || typeOf(get(this, 'falseLabel') === 'number'))
                ? get(this, 'falseLabel') : false,
      size: 'medium',
      _trueLabel: get(this, 'trueLabel') !== undefined &&
      (typeOf(get(this, 'trueLabel') === 'string') || typeOf(get(this, 'trueLabel') === 'number'))
                ? get(this, 'trueLabel') : true
    }
  },

  // == Computed Properties ===================================================

  @computed('trueValue', '_trueLabel')
  // FIXME: jsdoc
  _trueValue (trueValue, _trueLabel) {
    return trueValue || _trueLabel
  },

  @computed('falseValue', '_falseLabel')
  // FIXME: jsdoc
  _falseValue (falseValue, _falseLabel) {
    return falseValue || _falseLabel
  },

  @computed('value')
  // FIXME: jsdoc
  _isToggled (value) {
    return this._preferBoolean(value) === get(this, '_trueValue')
  },

  // == Functions =============================================================

  // FIXME: jsdoc
  _changeTarget (event, target) {
    const e = cloneEvent(event, target)
    const toggled = get(this, '_isToggled')

    e.target.value = toggled ? get(this, '_falseValue') : get(this, '_trueValue')
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
      (typeOf(get(this, 'trueValue')) === 'undefined' && typeOf(get(this, 'falseValue')) === 'undefined') ||
      get(this, 'trueValue') !== get(this, 'falseValue'))
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
      if (get(this, 'disabled')) return

      if (!ViewUtils.isSimpleClick(event)) {
        return true
      }

      event.stopPropagation()
      event.preventDefault()

      const onClick = this.attrs['onClick']
      if (onClick && onClick.update) {
        onClick.update(get(this, '_isToggled') ? get(this, '_falseValue') : get(this, '_trueValue'))
      } else if (isPresent(get(this, '_eventProxy.click'))) {
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
