import Ember from 'ember'
const {Route} = Ember

export default Route.extend({
  model: function (params) {
    return this.get('store').find('link', params.second_id)
  }
})
