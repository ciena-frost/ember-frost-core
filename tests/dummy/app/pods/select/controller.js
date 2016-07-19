import Ember from 'ember'
const {computed, Controller} = Ember
import _ from 'lodash'

export default Controller.extend({
  data: computed('data', 'search', function () {
    let result = this.model.map((record) => {
      return {
        label: record.get('label'),
        value: record.get('value')
      }
    })
    if (this.get('search')) {
      let filteredResult = _.filter(result, (item) => {
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
    onBlurHandler () {
      this.notifications.addNotification({
        message: 'blur event',
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
