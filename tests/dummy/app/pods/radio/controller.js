import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  sampleList: [1,2,3,4,5],
  actions: {
    change (value) {
      this.notifications.addNotification({
        message: `Value changed to ${value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
