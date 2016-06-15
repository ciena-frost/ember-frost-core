import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
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
