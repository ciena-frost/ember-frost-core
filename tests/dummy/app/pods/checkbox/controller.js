import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  notifications: Ember.inject.service('notification-messages'),
  error: true,

  actions: {
    onBlurHandler () {
      this.get('notifications').success('blur event', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onFocusHandler () {
      this.get('notifications').success('focus event', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onInputHandler (attrs) {
      this.get('notifications').success("value: '" + attrs.value + "'", {
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
