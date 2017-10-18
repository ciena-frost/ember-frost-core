import Controller from '@ember/controller'
import {inject as service} from '@ember/service'

// BEGIN-SNIPPET bookends-controller
export default Controller.extend({
  notifications: service('notification-messages'),

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
