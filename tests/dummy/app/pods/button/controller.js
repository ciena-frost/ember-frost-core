import Ember from 'ember'
const {Controller, inject} = Ember

export default Controller.extend({
  notifications: inject.service('notification-messages'),
  vertical: false,

  actions: {
    onClickHandler () {
      this.get('notifications').success('Button clicked action sent', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onFocusHandler () {
      this.get('notifications').success('Button focused action sent', {
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
