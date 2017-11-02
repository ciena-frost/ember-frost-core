import Ember from 'ember'
const {Controller, inject} = Ember

// BEGIN-SNIPPET scroll-controller
export default Controller.extend({
  notifications: inject.service('notification-messages'),

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

    onScrollX () {
      this.get('notifications').success('Scrolled x axis', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onScrollRight () {
      this.get('notifications').success('Scrolled right', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onScrollLeft () {
      this.get('notifications').success('Scrolled left', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    yEndReached () {
      this.get('notifications').success('Scroll reached end of y axis', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onMouseEnterHandler (element) {
      element.innerHTML = 'mouse entered and will update the scrollbars'
      window.Ps.update(element)
    }
  }
})
// END-SNIPPET scroll-controller
