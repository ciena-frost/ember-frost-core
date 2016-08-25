import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  actions: {
    onScrollUp () {
      this.notifications.addNotification({
        message: 'Scrolled up',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    onScrollDown () {
      this.notifications.addNotification({
        message: 'Scrolled down',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    onScrollYStart () {
      this.notifications.addNotification({
        message: 'Scroll reached start of y axis',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    onScrollYEnd () {
      this.notifications.addNotification({
        message: 'Scroll reached end of y axis',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

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
