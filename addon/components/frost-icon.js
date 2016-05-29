import Ember from 'ember';
import { PropTypes } from 'ember-prop-types'
import layout from '../templates/components/frost-icon'
import _ from 'lodash'

const { deprecate } = Ember

export default Ember.Component.extend({
  classNames: 'frost-icon',
  layout: layout,
  propTypes: {
    pack: PropTypes.string,
    icon: PropTypes.string.isRequired
  },
  tagName: 'svg',
  
  didReceiveAttrs({newAttrs}) {
    deprecate(
      'nested icon paths have been deprecated in favor of flat icon packs',
      _.includes(newAttrs.icon, '/'),
      {
        id: 'frost-debug.deprecate-nested-icon-paths',
        until: '1.0.0',
        url: 'http://ciena-frost.github.io/ember-frost-core/#/icons'
      }
    )
  },
  
  getDefaultProps() {
    return {
      pack: 'frost'
    }
  }
})
