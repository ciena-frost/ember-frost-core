import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({

  actions: {
    // BEGIN-SNIPPET textarea-support-events
    support (type, value) {
      this.notifications.addNotification({
        message: `${type}: ${value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET textarea-support-events

    // BEGIN-SNIPPET textarea-dom-events
    event (event) {
      this.notifications.addNotification({
        message: `${event.type}: ${event.target.value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
    // END-SNIPPET textarea-dom-events
  }
})
