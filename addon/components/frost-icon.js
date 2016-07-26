import _ from 'lodash'
import Ember from 'ember'
const {Component, deprecate} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-icon'

export default Component.extend(PropTypeMixin, {
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNames: 'frost-icon',
  classNameBindings: ['iconClass'],
  layout,
  tagName: 'svg',

  propTypes: {
    pack: PropTypes.string,
    icon: PropTypes.string.isRequired
  },

  getDefaultProps () {
    return {
      pack: 'frost'
    }
  },

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

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

  // ==========================================================================
  // Functions
  // ==========================================================================

  /* Ember.Component method */
  didReceiveAttrs ({newAttrs}) {
    deprecate(
      'nested icon paths have been deprecated in favor of flat icon packs',
      !_.includes(_.get(newAttrs, 'icon.value'), '/'),
      {
        id: 'frost-debug.deprecate-nested-icon-paths',
        until: '1.0.0',
        url: 'http://ciena-frost.github.io/ember-frost-core/#/icons'
      }
    )
  }

  // ==========================================================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================
})
