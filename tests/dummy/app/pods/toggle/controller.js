import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  // used for initial togged button
  value7: 'trueValue',
  // used for value mapping
  value8: 'enable',

  fireNotification: function (e) {
    this.notifications.addNotification({
      message: `toggle state: ${e.target.state}. value: ${e.target.value}`,
      type: 'success',
      autoClear: true,
      clearDuration: 2000
    })
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
