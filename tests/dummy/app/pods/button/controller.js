import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  vertical: false,

  actions: {
    onClickHandler () {
      this.notifications.addNotification({
        message: 'Button clicked action sent',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    onFocusHandler () {
      this.notifications.addNotification({
        message: 'Button focused action sent',
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
