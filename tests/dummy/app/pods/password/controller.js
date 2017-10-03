import Controller from '@ember/controller'
import {inject as service} from '@ember/service'

export default Controller.extend({
  notifications: service('notification-messages'),

  actions: {
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
