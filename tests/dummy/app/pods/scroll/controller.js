import Ember from 'ember'

export default Ember.Controller.extend({
  actions: {
    yEndReached () {
      this.notifications.addNotification({
        message: 'Scroll reached end of y axis',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
