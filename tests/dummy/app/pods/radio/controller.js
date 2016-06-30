import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  actions: {
    changed (value) {
      this.notifications.addNotification({
        message: `Current value is ${value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
