import Route from '@ember/routing/route'

export default Route.extend({
  model: function (params) {
    return this.get('store').find('link', params.second_id)
  }
})
