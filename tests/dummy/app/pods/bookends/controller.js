import Ember from 'ember'
const {Controller, inject} = Ember

// BEGIN-SNIPPET bookends-controller
export default Controller.extend({
  notifications: inject.service('notification-messages'),

  actions: {
    showNotification (message) {
      this.get('notifications').success(message, {
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
// END-SNIPPET
