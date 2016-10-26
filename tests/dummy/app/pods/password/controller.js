import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  notifications: Ember.inject.service('notification-messages'),

  actions: {
    // BEGIN-SNIPPET password-legacy-events
    legacy (attrs) {
      this.get('notifications').success(`id: ${attrs.id}, value: ${attrs.value}`, {
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET password-legacy-events

    // BEGIN-SNIPPET password-support-events
    support (type, value) {
      this.get('notifications').success(`${type}: ${value}`, {
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET password-support-events

    // BEGIN-SNIPPET password-dom-events
    event (event) {
      this.get('notifications').success(`${event.type}: ${event.target.value}`, {
        autoClear: true,
        clearDuration: 2000
      })
    }
    // END-SNIPPET password-dom-events
  }
})
