import Ember from 'ember'
const {
  LinkComponent,
  Logger,
  deprecate,
  get
} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-link'

const validDesigns = [
  'info-bar',
  'in-line',
  'inline'
]

const validPriorities = [
  'primary',
  'secondary'
]

const validSizes = [
  'large',
  'medium',
  'small'
]

function addDesignClass (design, classes) {
  deprecate(
    '\'in-line\' design style has been deprecated in favour of \'inline\'',
    design !== 'in-line',
    {
      id: 'frost-debug.deprecate-design-in-line-style',
      until: '1.0.0',
      url: 'http://ciena-frost.github.io/ember-frost-core/#/link'
    }
  )

  switch (design) {
    case 'info-bar':
      classes.push('info-bar')
      break
    case 'in-line':
    case 'inline':
      classes.push('in-line')
      break
    default:
      // no class to add for invalid design
      break
  }
}

export default LinkComponent.extend(PropTypeMixin, {

  // == Component properties ==================================================

  attributeBindings: [
    'disabled'
  ],
  classNames: ['frost-link'],
  classNameBindings: [
    'disabled',
    'extraClasses'
  ],
  layout,
  target: '',

  // == State properties ======================================================

  propTypes: {
    design: PropTypes.oneOf(validDesigns),
    hook: PropTypes.string,
    icon: PropTypes.string,
    priority: PropTypes.oneOf(validPriorities),
    size: PropTypes.oneOf(validSizes),
    text: PropTypes.string,
    onClick: PropTypes.func
  },

  getDefaultProps () {
    return {
      design: '',
      icon: '',
      priority: '',
      size: '',
      text: ''
    }
  },

  // == Computed properties ===================================================

  @readOnly
  @computed('design', 'disabled', 'priority', 'size')
  extraClasses (design, disabled, priority, size) {
    const classes = []

    addDesignClass(design, classes)

    if (classes.length !== 0) {
      // display warning when design property is used together with size and/or priority
      if (priority !== '' || size !== '') {
        Logger.warn('Warning: The `design` property takes precedence over `size` and `priority`.')
      }

      return classes.join(' ')
    }

    if (validSizes.indexOf(size) !== -1) {
      classes.push(size)
    }

    if (validPriorities.indexOf(priority) !== -1) {
      classes.push(priority)
    }

    // primary link opens content in a new tab
    if (
      priority.indexOf('primary') > -1 &&
      disabled === false
    ) {
      this.set('target', '_blank')
    }

    return classes.join(' ')
  },

  // == Functions =============================================================

  _clickAndInvoke(event) {
    if (this.onClick) {
      this.onClick()
    }
    this._invoke(event)
  },

  // == Events ================================================================

  init() {
    this._super(...arguments)

    // Turn off the default _invoke on event and use _clickAndInvoke instead
    let eventName = get(this, 'eventName')
    this.off(eventName)
    this.on(eventName, this, this._clickAndInvoke)
  }

})
