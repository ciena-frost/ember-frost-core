import _ from 'lodash'
import Ember from 'ember'
const {deprecate, LinkComponent, Logger} = Ember
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
    !_.eq(design, 'in-line'),
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
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

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

  propTypes: {
    design: PropTypes.oneOf(validDesigns),
    icon: PropTypes.string,
    priority: PropTypes.oneOf(validPriorities),
    size: PropTypes.oneOf(validSizes),
    text: PropTypes.string
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

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

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
  }

  // ==========================================================================
  // Functions
  // ==========================================================================

  // ==========================================================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================
})
