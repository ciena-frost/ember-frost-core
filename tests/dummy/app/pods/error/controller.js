import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  // BEGIN-SNIPPET error-query-params
  queryParams: {
    showDetails: {
      replace: true
    }
  },
  showDetails: false,
  // END-SNIPPET error-query-params

  actions: {
  }
})
