import Ember from 'ember'

export default Ember.Controller.extend({
  actions: {

    toggleError () {
      this.toggleProperty('error')
    },

    value (attrs) {
      this.notifications.addNotification({
        message: attrs.id + ' - ' + attrs.value,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
