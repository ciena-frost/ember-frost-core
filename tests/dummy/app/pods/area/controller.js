import Ember from 'ember'

export default Ember.Controller.extend({
  queryParams: ['selectedTab'],
  selectedTab: 'readme',
  error: true,
  errored: true, // deprecated

  actions: {
    text (attrs) {
      this.notifications.addNotification({
        message: 'value: " ' + attrs.value + "'",
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },
    toggleError () {
      this.toggleProperty('error')
      this.toggleProperty('errored') // deprecated
    }
  }
})
