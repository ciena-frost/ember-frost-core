/**
 * Component definition for frost-icon component
 */
import Ember from 'ember'
const {Component, deprecate, get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-icon'

export default Component.extend(PropTypeMixin, {

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['iconClass'],
  classNames: 'frost-icon',
  layout,
  tagName: 'svg',

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    hook: PropTypes.string,
    pack: PropTypes.string,
    icon: PropTypes.string.isRequired,

    // state

    // keywords
    classNameBindings: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.any,
    tagName: PropTypes.string
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options
      icon: '',
      pack: 'frost'

      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('icon', 'pack')
  /**
   * Get class for icon
   * @param {String} icon - icon to render
   * @param {String} pack - pack to get icon from
   * @returns {String} class for icon
   */
  iconClass (icon, pack) {
    return `frost-icon-${pack}-${icon}`
  },

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  /* Ember.Component method */
  didReceiveAttrs (attrs) {
    const icon = get(attrs, 'newAttrs.icon.value') || ''

    deprecate(
      'nested icon paths have been deprecated in favor of flat icon packs',
      icon.indexOf('/') === -1,
      {
        id: 'frost-debug.deprecate-nested-icon-paths',
        until: '1.0.0',
        url: 'http://ciena-frost.github.io/ember-frost-core/#/icons'
      }
    )
  },

  // == Actions ===============================================================

  actions: {
  }
})
