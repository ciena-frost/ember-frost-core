import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  queryParams: {
    showDetails: {
      replace: true
    }
  },
  showDetails: false,

  actions: {
  }
})
