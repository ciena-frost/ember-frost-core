/**
 * Component definition for frost-external-link component
 */
import Ember from 'ember'
const {K, Logger, deprecate, run} = Ember
import computed, {alias, readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-link'
import Component from './frost-component'

/**
 * List of valid values to pass into `design` propery
 * @type {Array} valid `design` values
 */
const validDesigns = [
  'info-bar',
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

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  // == Component properties ==================================================

  attributeBindings: [
    'disabled',
    'href',
    'tabindex',
    'target'
  ],

  classNameBindings: ['disabled', 'extraClasses'],
  classNames: ['frost-link'],

  layout,

  tagName: 'a',

  // == State properties ======================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    design: PropTypes.oneOf(validDesigns),
    disabled: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    priority: PropTypes.oneOf(validPriorities),
    size: PropTypes.oneOf(validSizes),
    tabindex: PropTypes.string,
    target: PropTypes.string,
    text: PropTypes.string

    // state
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      design: '',
      disabled: false,
      href: '',
      icon: '',
      onClick: K,
      priority: '',
      size: '',
      text: ''

      // state
    }
  },

  // == Computed properties ===================================================

  @readOnly
  @alias('text') linkTitle: '',

  @computed('priority')
  /**
   * Get link target.
   * @param {String} priority - link priority
   * @returns {String} target
   */
  target (priority) {
    return (priority === 'primary') ? '_blank' : '_self'
  },

  /* eslint-disable complexity */
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
      if (priority || size) {
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
  /* eslint-enable complexity */

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
      case 'inline':
        classes.push('inline')
        break
      default:
        // no class to add for invalid design
        break
    }
  },

  // == DOM Events ============================================================

  /**
   * Handle the click event
   * @returns {boolean} false if the link is disabled
   */
  click () {
    if (this.get('disabled')) {
      // Stop propagation
      return false
    } else {
      run.next(() => {
        this.onClick()
      })
    }
  }

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
})
