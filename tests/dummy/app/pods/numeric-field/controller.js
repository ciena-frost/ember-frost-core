import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  queryParams: ['value'],
  value: '3',

  actions: {
    foo (event) {
      debugger
      this.set('value', event.target.value)
    }
  }
})
