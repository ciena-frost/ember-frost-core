import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({

  fontSize: 20,

  actions: {
    // BEGIN-SNIPPET pre-transition-action
    preTransition() {
      this.notifications.addNotification({
        message: `Prior to transition...`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET

    increase (fontSize) {
      this.set('fontSize', fontSize + 1)
    },

    decrease (fontSize) {
      if (fontSize > 1) {
        this.set('fontSize', fontSize - 1)
      }
    }
  }
})
