import Ember from 'ember'
const {
  Controller
} = Ember

export default Controller.extend({
  error: true,

  actions: {
    // BEGIN-SNIPPET text-legacy-events
    legacy (attrs) {
      this.notifications.addNotification({
        message: `id: ${attrs.id}, value: ${attrs.value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET text-legacy-events

    // BEGIN-SNIPPET text-support-events
    support (type, value) {
      this.notifications.addNotification({
        message: `${type}: ${value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET text-support-events

    // BEGIN-SNIPPET text-dom-events
    event (event) {
      this.notifications.addNotification({
        message: `${event.type}: ${event.target.value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
    // END-SNIPPET text-dom-events
  }
})
