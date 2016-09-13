import Ember from 'ember'
const {
  deprecate,
  get,
  LinkComponent,
  Logger,
  set
} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-link'

/**
 * List of valid values to pass into `design` propery
 * @type {Array} valid `design` values
 */
const validDesigns = [
  'info-bar',
  'in-line',
  'inline'
]

/**
 * List of valid values to pass into `priorities` property
 * @type {Array} valid `priorities` values
 */
const validPriorities = [
  'primary',
  'secondary'
]

/**
 * List of valid values to pass into `size` property
 * @type {Array} valid `size` values
 */
const validSizes = [
  'large',
  'medium',
  'small'
]

export default LinkComponent.extend(PropTypeMixin, {
  // == Component properties ==================================================

  /*
    The Link component provides and sets default values for:
    disabled: false - className and attributeBindings
    tabindex: null - attributeBindings
    target: null
   */

  classNames: ['frost-link'],
  classNameBindings: [
    'extraClasses'
  ],
  layout,

  // == State properties ======================================================

  propTypes: {
    design: PropTypes.oneOf(validDesigns),
    hook: PropTypes.string,
    icon: PropTypes.string,
    priority: PropTypes.oneOf(validPriorities),
    size: PropTypes.oneOf(validSizes),
    linkTitle: PropTypes.string,
    onClick: PropTypes.func
  },

  getDefaultProps () {
    return {
      design: '',
      icon: '',
      priority: '',
      size: '',
      linkTitle: ''
    }
  },

  // == Computed properties ===================================================

  @readOnly
  @computed('design', 'priority', 'size')
  /**
   * Get extra classes for links based on link's settings
   * @param {String} design - link design
   * @param {String} priority - link priority
   * @param {String} size - link size
   * @returns {String} extra classNames
   */
  extraClasses (design, priority, size) {
    const classes = []

    this.addDesignClass(design, classes)

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

    return classes.join(' ')
  },

  // == Functions =============================================================

  /**
   * Sets correct classes to be added to the classNames array
   * @param {String} design link design type
   * @param {Array} classes the classes to be added to the classNames array for the component
   * @returns {undefined}
   */
  addDesignClass (design, classes) {
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
  },

  /**
   * Set whether the primary link opens content in a new tab
   * @private
   * @returns {undefined}
   */
  _setTarget () {
    if (
      get(this, 'priority') === 'primary' &&
      get(this, 'disabled') === false
    ) {
      set(this, 'target', '_blank')
    }
  },

  // == Events ================================================================

  init () {
    this._super(...arguments)

    this._setTarget()
  },

  click () {
    if (this.onClick) {
      this.onClick()
    }
  }

})
