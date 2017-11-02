import Ember from 'ember'
const {Controller, inject} = Ember

export default Controller.extend({
  notifications: inject.service('notification-messages'),

  // used for initial togged button
  value7: 'trueValue',
  // used for value mapping
  value8: 'enable',

  fireNotification: function (e) {
    this.get('notifications').success(
      `toggle state: ${e.target.state}. value: ${e.target.value}`, {
        autoClear: true,
        clearDuration: 2000
      }
    )
  },

  actions: {
    toggleHandler1 (e) {
      this.set('value1', e.target.value)
      this.fireNotification(e)
    },

    toggleHandler5 (e) {
      this.set('value5', e.target.value)
      this.fireNotification(e)
    },

    toggleHandler6 (e) {
      this.set('value6', e.target.value)
      this.fireNotification(e)
    },

    toggleHandler7 (e) {
      this.set('value7', e.target.value)
      this.fireNotification(e)
    }
  }

})
