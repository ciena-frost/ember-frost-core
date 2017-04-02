/**
 * Component definition for frost-icon component
 */
import layout from '../templates/components/frost-icon'
import Component from './frost-component'
import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
const {deprecate, inject, get} = Ember
import task from 'ember-concurrency'

export default Component.extend({

  // == Dependencies ==========================================================
  iconAssets: inject.service(),
  // == Keyword Properties ====================================================

  layout,
  tagName: '',

  // == PropTypes =============================================================
  propTypes: {
    // options
    pack: PropTypes.string,
    icon: PropTypes.string.isRequired
    // state
  },

  getDefaultProps () {
    return {
      // options
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

  @readOnly
  @computed('iconPath', 'icon')
  pathToIcon (iconPath, icon) {
    return `${iconPath}#${icon}`
  },
  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================
  init () {
    this._super(...arguments)
    this.get('iconAssets').register(this)
  },

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
