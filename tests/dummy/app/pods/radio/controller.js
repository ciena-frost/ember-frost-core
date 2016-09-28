import Ember from 'ember'
const {Controller} = Ember

// BEGIN-SNIPPET radio-controller
export default Controller.extend({
  sampleList: ['a', 'b', 'c', 'd', 'e'],

  model: Ember.Object.create({
    radioGroup: 'c'
  }),

  actions: {
    change (event) {
      this.set(`model.${event.target.id}`, event.target.value)
      this.notifications.addNotification({
        message: `Radio group ${event.target.id} value set to ${event.target.value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
// END-SNIPPET radio-controller
