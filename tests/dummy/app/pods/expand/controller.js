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
  expanded1: false,
  expanded2: false,
  expanded3: false,
  expanded4: false,
  expanded5: false,
  expanded6: false,
  expanded7: false,
  expanded9: false,
  expanded10: false,
  notifications: inject.service('notification-messages'),

  actions: {
    onChangeHandler1 (expanded) {
      this.set('expanded1', expanded)
    },

    onChangeHandler2 (expanded) {
      this.set('expanded2', expanded)
    },

    onChangeHandler3 (expanded) {
      this.set('expanded3', expanded)
    },

    onChangeHandler4 (expanded) {
      this.set('expanded4', expanded)
    },

    onChangeHandler5 (expanded) {
      this.set('expanded5', expanded)
    },

    onChangeHandler6 (expanded) {
      this.set('expanded6', expanded)
    },

    onChangeHandler7 (expanded) {
      this.get('notifications').success('Expanded state: ' + expanded, {
        autoClear: true,
        clearDuration: 2000
      })
      this.set('expanded7', expanded)
    },

    onChangeHandler9 (expanded) {
      this.set('expanded9', expanded)
    },

    onChangeHandler10 (expanded) {
      this.set('expanded10', expanded)
    },

    // BEGIN-SNIPPET expand-query-controller2
    onChangeHandler8 (expanded) {
      this.set('exp', expanded)
    }
    // END-SNIPPET expand-query-controller2
  }
})
