import Ember from 'ember'
import { PropTypes } from 'ember-prop-types'
import layout from '../templates/components/frost-icon'
import _ from 'lodash'

const { Component, computed, deprecate } = Ember

export default Component.extend({
  classNames: 'frost-icon',
  classNameBindings: ['iconClass'],
  layout: layout,
  propTypes: {
    pack: PropTypes.string,
    icon: PropTypes.string.isRequired
  },
  tagName: 'svg',
  
  iconClass: computed('icon', function() {
    return `frost-icon-${this.get('pack')}-${this.get('icon')}`
  }),

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
  },

  getDefaultProps () {
    return {
      pack: 'frost'
    }
  }
})
