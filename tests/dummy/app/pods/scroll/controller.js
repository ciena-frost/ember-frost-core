import Ember from 'ember'
const {Controller} = Ember

// BEGIN-SNIPPET scroll-controller
export default Controller.extend({
  notifications: Ember.inject.service('notification-messages'),

  actions: {
    onScrollUp () {
      this.get('notifications').success('Scrolled up', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onScrollDown () {
      this.get('notifications').success('Scrolled down', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onScrollYStart () {
      this.get('notifications').success('Scroll reached start of y axis', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onScrollYEnd () {
      this.get('notifications').success('Scroll reached end of y axis', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    yEndReached () {
      this.get('notifications').success('Scroll reached end of y axis', {
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
// END-SNIPPET scroll-controller

