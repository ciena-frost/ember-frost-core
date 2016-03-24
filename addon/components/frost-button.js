import Ember from 'ember'
import layout from '../templates/components/frost-button'
import _ from 'lodash/lodash'

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

/**
 * Add the appropriate class for the given size to the Array of classes
 * Right now, this function seems a little odd/unnecessary, but we may want some
 * aliases later, so we may as well have it set up like priority.
 *
 * @param {String} size - the size to add
 * @param {String[]} classes - the classes to add the size class to
 */
function addSizeClass (size, classes) {
  switch (size) {
    case 'small':
      classes.push('small')
      break
    case 'medium':
      classes.push('medium')
      break
    case 'large':
      classes.push('large')
      break
    case 'extra-large':
      classes.push('extra-large')
      break
    default:
      // no class to add for invalid size
      break
  }
}

/**
 * Add the appropriate class for the button design to the Array of classes
 * Button design is restricted for use with specific applications.
 * For example, frost-tabs uses button for tabs, but styling for
 * tabs is quite different then for a button.  By providing 'design'
 * property, we can style the button appropriately and still re-use
 * other functionality.
 *
 * @param {String} design - button design
 * @param {String[]} classes - the classes to add the size class to
 */
function addDesignClass (design, classes) {
  switch (design) {
    case 'tab':
      classes.push('tab')
      break
    default:
      // no class to add for this invalid size
      break
  }
}

export default Ember.Component.extend({
  tagName: 'button',
  classNames: [
    'frost-button'
  ],
  classNameBindings: [
    'disabled',
    'extraClasses'
  ],
  attributeBindings: [
    'autofocus',
    'disabled',
    'type',
    'title'
  ],

  autofocus: false,
  disabled: false,
  layout,
  type: 'button',

  title: null,

  /**
   * Currently there are 3 levels of priority:
   *
   * 'primary' - a call-to-action button
   * 'secondary' - a more standard/normal button
   * 'tertiary' - a muted button (for things like cancel)
   *
   * We also support the following aliases for the above priorities
   *
   * 'confirm' => 'primary'
   * 'normal' => 'secondary'
   * 'cancel' => 'tertiary'
   * @type {String}
   */
  priority: '',

  /**
   * How big do you want your button?
   * Currently available options are:
   * ['small', 'medium', 'large', 'extra-large']
   * @type {String}
   */
  size: '',

  /**
   *  Specifies design of the button.
   *  Currently available options are:
   *  ['tab']
   *  @type {String}
   */
  design: '',

  /**
   * The text to display within this button
   * @type {String}
   */
  text: '',

  /**
   * The icon to display within this button
   * @type {String}
   */
  icon: '',

  /**
   * The subtext to display within this button (goes below the text)
   * @type {String}
   */
  subtext: '',

  /**
   * Whether or not to render button content vertically (icon above text)
   * @type {Boolean}
   */
  vertical: false,

  /**
   * True if only the text property is given, and not icon or subtext
   */
  isTextOnly: Ember.computed('text', 'icon', 'subtext', function () {
    return (this.get('text')) && !(this.get('icon') || this.get('subtext'))
  }),

  /**
   * True if only the icon property is given, and not text or subtext
   */
  isIconOnly: Ember.computed('text', 'icon', 'subtext', function () {
    return (this.get('icon')) && !(this.get('text') || this.get('subtext'))
  }),

  /**
   * True if both the icon and text properties are given, but no subtext
   */
  isIconAndText: Ember.computed('text', 'icon', 'subtext', function () {
    return ((this.get('icon') && this.get('text')) && !this.get('subtext'))
  }),

  /**
   * True if all three properties of 'icon', 'text', and 'subtext' are given
   */
  isInfo: Ember.computed('text', 'icon', 'subtext', function () {
    return (this.get('icon') && this.get('text') && this.get('subtext'))
  }),

  extraClasses: Ember.computed('priority', 'vertical', function () {
    const classes = []
    addDesignClass(this.get('design'), classes)

    // only add size and priority if design has not been specified
    if (classes.length === 0) {
      addSizeClass(this.get('size'), classes)
      addPriorityClass(this.get('priority'), classes)
      if (this.get('vertical')) {
        classes.push('vertical')
      }
    } else {
      // design button needs to have either text or icon property present
      if ((this.get('text') === '') && (this.get('icon') === '')) {
        Ember.Logger.error('Error: The `design` property requires `text` or `icon` property to be specified.')
        return
      }

      // display warning when design property is used together with size and/or priority
      if ((this.get('priority') !== '') || (this.get('size') !== '')) {
        Ember.Logger.warn('Warning: The `design` property takes precedence over `size` and `priority`.')
      }
    }

    return classes.join(' ')
  }),

  onclick: Ember.on('click', function (event) {
    if (!Ember.ViewUtils.isSimpleClick(event)) {
      return true
    }

    if (!this.get('disabled') && _.isFunction(this.attrs['on-click'])) {
      this.attrs['on-click'](this.get('id'))
    }
  })
})
