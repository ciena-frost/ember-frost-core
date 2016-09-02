import Ember from 'ember'
const {Controller} = Ember

function createActionClosure (func) {
  let context = this
  return function closure () {
    func.apply(context, arguments)
  }
}

export default Controller.extend({
  vertical: false,

  // BEGIN-SNIPPET button-hash
  createAttrsHash: Ember.on('init', function () {
    this.set('attrsHash', {
      priority: 'primary',
      size: 'medium',
      text: 'Data driven',
      onClick: createActionClosure.call(this, this.actions.onClickHandler)
    })
  }),
  // END-SNIPPET

  actions: {
    onClickHandler () {
      console.log('button clicked')
      this.notifications.addNotification({
        message: 'Action sent',
        type: 'success',
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
