import Ember from 'ember'
const {Controller, inject} = Ember

export default Controller.extend({
  // BEGIN-SNIPPET expand-query-controller
  queryParams: {
    exp: {
      replace: true
    }
  },
  exp: false,
  // END-SNIPPET expand-query-controller
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
