import Ember from 'ember'
const {
  Component,
  get,
  isEmpty,
  Logger,
  typeOf,
  ViewUtils
} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-button'

/**
 * List of valid values to pass into `design` propery
 * @type {Array} valid `design` values
 */
const validDesignClasses = [
  'app-bar',
  'info-bar',
  'tab'
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

export default Component.extend(PropTypeMixin, {
  // == Dependencies ==========================================================

  // == Properties ============================================================

  attributeBindings: [
    'autofocus',
    'disabled',
    'type',
    'tabIndex',
    'title'
  ],

  classNames: [
    'frost-button'
  ],

  classNameBindings: [
    'disabled',
    'extraClasses'
  ],

  layout,

  tagName: 'button',

  propTypes: {
    autofocus: PropTypes.bool,
    design: PropTypes.oneOf(validDesignClasses),
    disabled: PropTypes.bool,
    hook: PropTypes.string,
    icon: PropTypes.string,
    pack: PropTypes.string,
    priority: PropTypes.string,
    size: PropTypes.oneOf(validSizes),
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    vertical: PropTypes.bool
  },

  getDefaultProps () {
    return {
      autofocus: false,
      design: '',
      disabled: false,
      icon: '',
      pack: 'frost',
      priority: '',
      size: '',
      text: '',
      title: null,
      type: 'button',
      vertical: false
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('icon', 'text')
  /**
   * Determine whether or not button is text only (no icon)
   * @param {String} icon - button icon
   * @param {String} text - button text
   * @returns {Boolean} whether or not button is text only (no icon)
   */
  isTextOnly (icon, text) {
    return !isEmpty(text) && isEmpty(icon)
  },

  @readOnly
  @computed('icon', 'text')
  /**
   * Determine whether or not button is icon only (no text)
   * @param {String} icon - button icon
   * @param {String} text - button text
   * @returns {Boolean} whether or not button is icon only (no text)
   */
  isIconOnly (icon, text) {
    return !isEmpty(icon) && isEmpty(text)
  },

  @readOnly
  @computed('icon', 'text')
  /**
   * Determine whether or not button contains icon and text
   * @param {String} icon - button icon
   * @param {String} text - button text
   * @returns {Boolean} whether or not button contains icon and text
   */
  isIconAndText (icon, text) {
    return !isEmpty(icon) && !isEmpty(text)
  },

  @readOnly
  @computed('design', 'icon', 'priority', 'size', 'text', 'vertical')
  /**
   * Get extra classes for buttons based on button's settings
   * @param {String} design - button design
   * @param {String} icon - button icon
   * @param {String} priority - button priority
   * @param {String} size - button size
   * @param {String} text - button text
   * @param {Boolean} vertical - whether or not icon is above text
   * @returns {String} extra classNames
   */
  extraClasses (design, icon, priority, size, text, vertical) {
    const classes = []

    if (validDesignClasses.indexOf(design) !== -1) {
      classes.push(design)

      // design button needs to have either text or icon property present
      if (text === '' && icon === '') {
        Logger.error('Error: The `design` property requires `text` or `icon` property to be specified.')
        return
      }

      // display warning when design property is used together with size and/or priority
      if (priority !== '' || size !== '') {
        Logger.warn('Warning: The `design` property takes precedence over `size` and `priority`.')
      }

      return classes.join(' ')
    }

    if (validSizes.indexOf(size) !== -1) {
      classes.push(size)
    }

    this.addPriorityClass(priority, classes)

    if (vertical) {
      classes.push('vertical')
    }

    return classes.join(' ')
  },

  // == Functions =============================================================

  /**
   * Add the appropriate class for the given priority to the Array of classes
   * @param {String} priority - the priority to add
   * @param {String[]} classes - the classes to add the priority class to
   */
  addPriorityClass (priority, classes) {
    switch (priority) {
      case 'confirm': // fallthrough
      case 'primary':
        classes.push('primary')
        break
      case 'normal': // fallthrough
      case 'secondary':
        classes.push('secondary')
        break
      case 'cancel': // fallthrough
      case 'tertiary':
        classes.push('tertiary')
        break
      default:
        // no class to add for invalid priority
        break
    }
  },

  _getOnClickHandler () {
    if (typeOf(this.attrs.onClick) === 'function') {
      return this.attrs.onClick
    }
    // For the case when handler is passed from component property and converted
    // into mutable cell
    if (typeOf(this.attrs.onClick) === 'object' &&
      typeOf(this.attrs.onClick.value) === 'function') {
      return this.attrs.onClick.value
    }
  },

  // == Events ================================================================

  onclick: Ember.on('click', function (event) {
    if (!ViewUtils.isSimpleClick(event)) {
      return true
    }

    const onClickHandler = this._getOnClickHandler()
    if (onClickHandler && !get(this, 'disabled')) {
      onClickHandler(get(this, 'id'))
    }
  }),

  _onFocus: Ember.on('focusIn', function (e) {
    // If an onFocus handler is defined, call it
    if (this.attrs.onFocus) {
      this.attrs.onFocus()
    }
  })

  // == Actions ===============================================================
})
