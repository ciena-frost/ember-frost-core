import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({

  fontSize: 20,

  actions: {
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
