import Ember from 'ember'
const {
  assert,
  Component,
  get,
  isPresent,
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
  size: 'medium',

  propTypes: {
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    size: PropTypes.string,
    toggled: PropTypes.bool,

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
    assert(`Same value has been assigned to both ${this.toString()}.trueValue and ${this.toString()}.falseValue`,
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
    /* eslint-disable complexity */
    _onClick () {
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
        this._eventProxy.click(this._modifyEvent(event, this.$('input')[0]))
      }
    },
    /* eslint-enable complexity */
    noop () {
      // we have this method to avoid action undefined error
    }
  }
})
