import Ember from 'ember'

export default Ember.Controller.extend({
  error: true,

  actions: {
    onInputHandler (attrs) {
      console.log('field value: ' + attrs.value)
      this.notifications.addNotification({
        message: "value: '" + attrs.value + "'",
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
