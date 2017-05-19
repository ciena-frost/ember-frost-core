import Ember from 'ember'
const {Controller, inject} = Ember

export default Controller.extend({
  queryParams: {
    exp: {
      replace: true
    }
  },
  exp: false,
  notifications: inject.service('notification-messages'),

  actions: {
    onExpandHandler () {
      this.get('notifications').success('Expand action sent', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onCollapseHandler () {
      this.get('notifications').success('Collapse action sent', {
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
