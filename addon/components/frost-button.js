import _ from 'lodash'
import Ember from 'ember'
const {Component, Logger, ViewUtils} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'

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
  'extra-large',
  'large',
  'medium',
  'small'
]

/**
 * Add the appropriate class for the given priority to the Array of classes
 * @param {String} priority - the priority to add
 * @param {String[]} classes - the classes to add the priority class to
 */
function addPriorityClass (priority, classes) {
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
}

export default Component.extend({
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

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

  tagName: 'button',

  propTypes: {
    autofocus: PropTypes.bool,
    design: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    pack: PropTypes.string,
    priority: PropTypes.string,
    size: PropTypes.string,
    subtext: PropTypes.string,
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
      subtext: '',
      text: '',
      title: null,
      type: 'button',
      vertical: false
    }
  },

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('icon', 'subtext', 'text')
  /**
   * Determine whether or not button is text only (no icon or subtext)
   * @param {String} icon - button icon
   * @param {String} subtext - button subtext
   * @param {String} text - button text
   * @returns {Boolean} whether or not button is text only (no icon or subtext)
   */
  isTextOnly (icon, subtext, text) {
    return text && !(icon || subtext)
  },

  @readOnly
  @computed('icon', 'subtext', 'text')
  /**
   * Determine whether or not button is icon only (no text or subtext)
   * @param {String} icon - button icon
   * @param {String} subtext - button subtext
   * @param {String} text - button text
   * @returns {Boolean} whether or not button is icon only (no text or subtext)
   */
  isIconOnly (icon, subtext, text) {
    return icon && !(text || subtext)
  },

  @readOnly
  @computed('icon', 'subtext', 'text')
  /**
   * Determine whether or not button contains icon and text but not subtext
   * @param {String} icon - button icon
   * @param {String} subtext - button subtext
   * @param {String} text - button text
   * @returns {Boolean} whether or not button contains icon and text but not subtext
   */
  isIconAndText (icon, subtext, text) {
    return icon && text && !subtext
  },

  @readOnly
  @computed('icon', 'subtext', 'text')
  /**
   * Determine whether or not button is an info button
   * @param {String} icon - button icon
   * @param {String} subtext - button subtext
   * @param {String} text - button text
   * @returns {Boolean} whether or not button is info button
   */
  isInfo (icon, subtext, text) {
    return icon && text && subtext
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

    addPriorityClass(priority, classes)

    if (vertical) {
      classes.push('vertical')
    }

    return classes.join(' ')
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  // ==========================================================================
  // Events
  // ==========================================================================

  onclick: Ember.on('click', function (event) {
    if (!ViewUtils.isSimpleClick(event)) {
      return true
    }

    if (!this.get('disabled') && _.isFunction(this.attrs.onClick)) {
      this.attrs.onClick(this.get('id'))
    }
  }),

  _onFocus: Ember.on('focusIn', function (e) {
    // If an onFocus handler is defined, call it
    if (this.attrs.onFocus) {
      this.attrs.onFocus()
    }
  })

  // ==========================================================================
  // Actions
  // ==========================================================================
})
