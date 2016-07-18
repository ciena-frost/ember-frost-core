import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  error: true,

  actions: {
    enter(value) {
      this.notifications.addNotification({
        message: `enter: ${value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    escape(value) {
      this.notifications.addNotification({
        message: `escape: ${value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    event(event) {
      this.notifications.addNotification({
        message: `${event.type}: ${event.target.value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
