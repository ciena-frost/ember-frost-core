import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({

  isButtonToggled: false,

  actions: {
    toggleHandler(attrs) {
      this.notifications.addNotification({
        message: `toggle state: ${attrs.toggled}. value: ${attrs.value}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }

})
