import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({

  actions: {
    inputHandler(attrs) {
      console.log(`logs checked: ${attrs.checked} value: ${attrs.value}`)
    }
  }

})
