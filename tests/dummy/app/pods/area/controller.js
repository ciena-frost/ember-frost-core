import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  notifications: Ember.inject.service('notification-messages'),
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
      console.log('text area value: ' + attrs.value)
      this.get('notifications').success('value: "' + attrs.value + '"', {
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
