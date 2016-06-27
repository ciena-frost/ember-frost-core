import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  error: true,

  notify (message) {
    this.notifications.addNotification({
      message,
      type: 'success',
      autoClear: true,
      clearDuration: 2000
    })
  },

  actions: {
    handleBlur () {
      this.notify('blur event')
    },

    handleFocus () {
      this.notify('focus event')
    },

    handleInput (e) {
      console.log('field value: ' + e.value)
      this.notify(`value: "${e.value}"`)
    },

    handleKeyDown (e) {
      this.notify(`key down: ${e.keyCode} "${e.key}"`)
    },

    handleKeyUp (e) {
      this.notify(`key up: ${e.keyCode} "${e.key}"`)
    }
  }
})
