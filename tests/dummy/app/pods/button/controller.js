import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  vertical: false,

  actions: {
    onClickHandler () {
      console.log('button clicked')
      this.notifications.addNotification({
        message: 'Action sent',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    /**
     * Toggle vertical rendering
     */
    toggleVertical () {
      this.toggleProperty('vertical')
    }
  }
})
