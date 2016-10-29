import Ember from 'ember'
import FrostSelect from './frost-select'

const assign = Object.assign || Ember.assign || Ember.merge

export default FrostSelect.extend({
  getDefaultProps () {
    const defaults = this._super(...arguments)

    return assign(defaults, {
      multiple: true
    })
  }
})
