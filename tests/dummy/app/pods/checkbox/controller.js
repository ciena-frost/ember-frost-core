import Controller from '@ember/controller'
import {inject as service} from '@ember/service'

export default Controller.extend({
  notifications: service('notification-messages'),
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
