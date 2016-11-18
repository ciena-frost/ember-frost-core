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

    onInputHandler (attrs) {
      console.log('checkbox value: ' + attrs.value)
      this.get('notifications').success("value: '" + attrs.value + "'", {
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
