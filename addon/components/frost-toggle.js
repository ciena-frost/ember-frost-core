import Ember from 'ember'
const {Component, ViewUtils} = Ember
import computed from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-toggle'
import FrostEventsProxy from '../mixins/frost-events-proxy'

export default Component.extend(FrostEventsProxy, {

  // == Properties ============================================================
  attributeBindings: [
    '_isToggled:toggled',
    'disabled'
  ],
  classNameBindings: [
    'disabled'
  ],
  classNames: ['frost-toggle'],
  layout: layout,
  size: 'medium',

  propTypes: {
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    toggled: PropTypes.bool,
    size: PropTypes.string,

    falseLabel: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ]),
    trueLabel: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ])
  },

  // == Functions ==============================================================
  init () {
    this._super(...arguments)
    Ember.assert(`Same value has been assigned to both ${this.toString()}.trueValue and ${this.toString()}.falseValue`,
      (typeof this.attrs['trueValue'] === 'undefined' && typeof this.attrs['falseValue'] === 'undefined') ||
      this.attrs['trueValue'] !== this.attrs['falseValue'])
  },

  getDefaultProps () {
    return {
      _trueLabel: typeof this.get('trueLabel') === 'string' || typeof this.get('trueLabel') === 'number'
                ? this.get('trueLabel') : true,
      _falseLabel: typeof this.get('falseLabel') === 'string' || typeof this.get('falseLabel') === 'number'
                ? this.get('falseLabel') : false
    }
  },

  _modifyEvent (event, target) {
    const _toggled = this.get('_isToggled')
    target.value = _toggled ? this.get('_falseValue') : this.get('_trueValue')
    target.state = !_toggled
    event.target = target

    return event
  },

  _preferBoolean (value) {
    if (value === 'true') return true
    if (value === 'false') return false

    return value
  },

  // == Computed Properties =====================================================
  @computed('trueValue', '_trueLabel')
  _trueValue (trueValue, _trueLabel) {
    return trueValue || _trueLabel
  },

  @computed('falseValue', '_falseLabel')
  _falseValue (falseValue, _falseLabel) {
    return falseValue || _falseLabel
  },

  @computed('value')
  _isToggled (value) {
    return this._preferBoolean(value) === this.get('_trueValue')
  },

  // == Events ================================================================

  // == Actions ================================================================
  actions: {
    _onClick (e) {
      if (this.get('disabled')) return

      if (!ViewUtils.isSimpleClick(e)) {
        return true
      }

      e.stopPropagation()
      e.preventDefault()

      const onClick = this.attrs['onClick']
      if (onClick && onClick.update) {
        onClick.update(this.get('_isToggled') ? this.get('_falseValue') : this.get('_trueValue'))
      } else if (Ember.isPresent(Ember.get(this, '_eventProxy.click'))) {
        //  override target to make sure it's always the <input> field
        let target = this.$('input')[0]
        this._eventProxy.click(this._modifyEvent(e, target))
      }
    }
  }
})
