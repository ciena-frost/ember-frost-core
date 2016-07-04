import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  sampleList: [1, 2, 3, 4, 5],
  actions: {
    change () {
      this.notifications.addNotification({
        message: `Action recieved with arguments [${[].slice.call(arguments)}]`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
