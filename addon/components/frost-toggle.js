import Ember from 'ember'
const {
  assert,
  Component,
  get,
  isPresent,
  typeOf,
  ViewUtils: {
    isSimpleClick
  }
} = Ember
import computed from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-toggle'
import FrostEventsProxy from '../mixins/frost-events-proxy'
import Events from '../utils/events'
const {cloneEvent} = Events

export default Component.extend(PropTypeMixin, FrostEventsProxy, {
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

  propTypes: {
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
  },

  getDefaultProps () {
    return {
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

  // == Events ================================================================
  init () {
    this._super(...arguments)
    this._setupAssertion()
  },

  // == Functions ==============================================================
  _changeTarget (event, target) {
    const e = cloneEvent(event, target)
    const toggled = get(this, '_isToggled')

    e.target.value = toggled ? get(this, '_falseValue') : get(this, '_trueValue')
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
      (typeOf(get(this, 'trueValue')) === 'undefined' && typeOf(get(this, 'falseValue')) === 'undefined') ||
      get(this, 'trueValue') !== get(this, 'falseValue'))
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
    return this._preferBoolean(value) === get(this, '_trueValue')
  },

  // == Actions ================================================================
  actions: {
    /* eslint-disable complexity */
    _onClick (event) {
      if (get(this, 'disabled')) return

      if (!isSimpleClick(event)) {
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
    noop () {
      // we have this method to avoid action undefined error
    }
  }
})
