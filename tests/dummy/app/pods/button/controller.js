import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  notifications: Ember.inject.service('notification-messages'),
  vertical: false,

  actions: {
    onClickHandler () {
      console.log('button clicked')
      this.get('notifications').success('Action sent', {
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
