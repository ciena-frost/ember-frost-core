import Ember from 'ember'
import _ from 'lodash/lodash'
import svgs from 'ember-frost-core/svgs'
import layout from '../templates/components/frost-icon'

export default Ember.Component.extend({
  tagName: '',
  layout: layout,

  // TODO This is a pretty nasty way to inline svgs - let's look into a better way
  svg: Ember.computed('icon', 'class', function () {
    let svg = Ember.get(svgs, this.get('icon').replace(/\//g, '.'))

    if (_.isUndefined(svg)) {
      Ember.assert('The svg ' + this.get('icon') + ' does not exist')
    } else {
      let classes = _.isString(this.get('class')) ? ' ' + this.get('class') : ''
      svg = svg.replace('<svg', '<svg class="frost-icon' + classes + '"')
      return new Ember.Handlebars.SafeString(svg)
    }
  })
})
