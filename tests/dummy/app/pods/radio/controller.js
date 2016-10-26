import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  notifications: Ember.inject.service('notification-messages'),

  sampleList: ['a', 'b', 'c', 'd', 'e'],

  model: Ember.Object.create({
    checkboxGroup: 'c'
  }),

  actions: {
    change (event) {
      this.set(`model.${event.target.id}`, event.target.value)
      this.get('notifications').success(
        `Radio group ${event.target.id} value set to ${event.target.value}`, {
          autoClear: true,
          clearDuration: 2000
        }
      )
    }
  }
})
