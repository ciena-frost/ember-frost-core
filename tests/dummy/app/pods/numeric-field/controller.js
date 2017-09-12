import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  queryParams: ['value'],
  value: '9',

  actions: {
    foo (event) {
      this.set('value', event.target.value)
    }
  }
})
