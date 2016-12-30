import Ember from 'ember'
const {Controller, inject} = Ember

export default Controller.extend({
  notifications: inject.service('notification-messages'),
  actions: {
    // BEGIN-SNIPPET textarea-support-events
    support (type, value) {
      this.get('notifications').success(`${type}: ${value}`, {
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET textarea-support-events

    // BEGIN-SNIPPET textarea-dom-events
    event (event) {
      this.get('notifications').success(`${event.type}: ${event.target.value}`, {
        autoClear: true,
        clearDuration: 2000
      })
    }
    // END-SNIPPET textarea-dom-events
  }
})
