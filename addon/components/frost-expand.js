/**
 * Component definition for the frost-expand component
 */
import Ember from 'ember'
const {observer} = Ember
import layout from '../templates/components/frost-expand'
import computed, {readOnly} from 'ember-computed-decorators'
import Component from './frost-component'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  tagName: 'div',
  classNameBindings: ['cssStateClass'],

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    expanded: PropTypes.bool,
    duration: PropTypes.string,
    expandLabel: PropTypes.string,
    collapseLabel: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.EmberComponent
    ])
    // state
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      onExpand () {},
      onCollapse () {},
      expanded: false
      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('expanded')
  /**
   * Determine CSS state class name to use
   * @param {Boolean} expanded - whether in expanded state or not
   * @returns {String} the CSS class name to use
   */
  cssStateClass (expanded) {
    return expanded ? 'expanded' : 'collapsed'
  },

  @readOnly
  @computed('content')
  /**
   * Determine whether or not the content is a component
   * @param {*} content - content to display
   * @returns {Boolean} whether or not the content is a component
   */
  isComponentContent (content) {
    return content !== null && typeof content !== 'string'
  },

  @readOnly
  @computed('duration')
  /**
   * Determine duration of expansion animation
   * @param {String} duration - duration string
   * @returns {Number} duration in milliseconds of animation
   */
  durationTime (duration) {
    if (duration === 'fast') {
      return 250
    } else if (duration === 'slow') {
      return 1000
    } else if (duration === 'none') {
      return 0
    }
    return 500
  },

  // == Functions =============================================================

  updateVisibility (expand, duration = 0) {
    if (expand) {
      this.$().find('.frost-expand-content-scroll').slideDown(duration)
    } else {
      this.$().find('.frost-expand-content-scroll').slideUp(duration)
    }
  },

  stateChanged: observer('expanded', function () {
    this.updateVisibility(this.get('expanded'), this.get('durationTime'))
  }),

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  didInsertElement (model, transition) {
    const startExpanded = this.get('expanded')
    if (!startExpanded) {
      this.updateVisibility(startExpanded)
    }
  },

  // == Actions ===============================================================

  actions: {
    _onClick () {
      const expand = !this.get('expanded')

      if (expand) {
        if (this.onExpand) {
          this.onExpand()
        }
      } else {
        if (this.onCollapse) {
          this.onCollapse()
        }
      }

      this.set('expanded', expand)
    }
  }
})
