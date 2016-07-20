import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  actions: {
    // BEGIN-SNIPPET password-legacy-events
    legacy(attrs) {
      this.notifications.addNotification({
        message: `id: ${attrs.id}, value: ${attrs.value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET password-legacy-events

    // BEGIN-SNIPPET password-support-events
    support(type, value) {
      this.notifications.addNotification({
        message: `${type}: ${value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET password-support-events

    // BEGIN-SNIPPET password-dom-events
    event(event) {
      this.notifications.addNotification({
        message: `${event.type}: ${event.target.value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
    // END-SNIPPET password-dom-events
  }
})
