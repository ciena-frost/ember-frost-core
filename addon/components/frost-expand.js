/**
 * Component definition for the frost-expand component
 */
import Ember from 'ember'
const {run} = Ember
import layout from '../templates/components/frost-expand'
import computed, {readOnly} from 'ember-computed-decorators'
import Component from './frost-component'
import {PropTypes} from 'ember-prop-types'
import {validators} from 'ember-prop-types/utils/prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  classNameBindings: ['expanded:expanded:collapsed'],

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    onChange: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    animationDuration: PropTypes.number,
    expandLabel: PropTypes.string,
    collapseLabel: PropTypes.string,
    content: PropTypes.any,
    isChevronOnlyClickTrigger: PropTypes.bool,
    labelComponent: PropTypes.EmberComponent
    // state
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      expandLabel: 'Expand',
      collapseLabel: 'Collapse',
      animationDuration: 300,
      isChevronOnlyClickTrigger: false
      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('content')
  /**
   * Determine whether or not the content is a component
   * @param {*} content - content to display
   * @returns {Boolean} whether or not the content is a component
   */
  isComponentContent (content) {
    return validators.EmberComponent(null, 'content', content, null, false, false)
  },

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // TODO measure content size and update animation speed accordingly, maybe
  // instead of allowing the client to specify speed in ms, create some preset
  // values (ex. 'fast', 'slow') like jquery provides
  didReceiveAttrs () {
    const _expanded = this.get('_expanded')
    const expanded = this.get('expanded')

    if (_expanded !== expanded) {
      this.set('_expanded', expanded)
    }

    run.scheduleOnce('afterRender', this, () => {
      const expand = this.get('_expanded')
      const animationDuration = _expanded !== undefined ? this.get('animationDuration') : 0
      if (expand) {
        this.$().find('.frost-expand-scroll').slideDown(animationDuration)
      } else {
        this.$().find('.frost-expand-scroll').slideUp(animationDuration)
      }
    })
  },

  // == Actions ===============================================================

  actions: {
    _onClick () {
      if (this.onChange) {
        this.onChange(!this.get('expanded'))
      }
    }
  }
})
