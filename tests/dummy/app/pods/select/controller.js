import Ember from 'ember'
const {computed, Controller} = Ember

export default Controller.extend({
  data: computed('data', 'search', function () {
    let result = this.model.map((record) => {
      return {
        label: record.get('label'),
        value: record.get('value')
      }
    })
    if (this.get('search')) {
      let filteredResult = result.filter((item) => {
        return item.label.toLowerCase().indexOf(this.get('search').toLowerCase()) !== -1
      })
      result = filteredResult
    }
    return result
  }),

  selectedIndex: 1,
  selectedIndices: [1, 2],
  preSelectedValue: 'Arthur Curry',
  selectedValues: ['Arthur Curry', 'Ray Palmer'],

  actions: {
    onFocusOutHandler (e) {
      this.notifications.addNotification({
        message: `onFocusOut event ${e}`,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },
    onFocusInHandler () {
      this.notifications.addNotification({
        message: 'onFocusIn event',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    onChangeHandler (values) {
      this.notifications.addNotification({
        message: 'User selected: ' + values,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },
    onInputHandler (filterValue) {
      this.notifications.addNotification({
        message: 'Handling input: ' + filterValue,
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
      this.set('search', filterValue)
    }
  }
})
