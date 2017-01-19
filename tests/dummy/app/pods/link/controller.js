import Ember from 'ember'
const {Controller, inject} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Controller.extend({
  notifications: inject.service('notification-messages'),

  fontSize: 20,

  first: {
    id: 3,
    text: 'custom first'
  },
  second: {
    id: 4,
    text: 'custom second'
  },

  @readOnly
  @computed('fontSize')
  fontSizeStyle (fontSize) {
    return Ember.String.htmlSafe(`font-size: ${fontSize}px`)
  },

  actions: {
    // BEGIN-SNIPPET pre-transition-action
    preTransition () {
      this.get('notifications').success('Prior to transition...', {
        autoClear: true,
        clearDuration: 2000
      })
    },
    // END-SNIPPET

    increase (fontSize) {
      this.set('fontSize', fontSize + 1)
    },

    decrease (fontSize) {
      if (fontSize > 1) {
        this.set('fontSize', fontSize - 1)
      }
    }
  }
})
