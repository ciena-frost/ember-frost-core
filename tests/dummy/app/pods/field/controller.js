import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  error: true,

  actions: {
    onBlurHandler () {
      this.notifications.addNotification({
        message: 'blur event',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    onFocusHandler () {
      this.notifications.addNotification({
        message: 'focus event',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    onInputHandler (event) {
      console.log('field value: ' + event.target.value)
      this.notifications.addNotification({
        message: `${event.target.id}: ${event.target.value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
