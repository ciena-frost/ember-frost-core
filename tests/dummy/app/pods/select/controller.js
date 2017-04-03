import Ember from 'ember'
const {Controller, computed, inject} = Ember

export default Controller.extend({
  notifications: inject.service('notification-messages'),

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
  }).readOnly(),

  selectedIndex: 1,
  selectedIndices: [1, 2],
  preSelectedValue: 'Arthur Curry',
  preSelectedValueForClearing: 'Arthur Curry',
  selectedValues: ['Arthur Curry', 'Ray Palmer'],
  clearSelectedValue: false,
  width: 500,
  actions: {
    onBlurHandler () {
      this.get('notifications').success('blur event', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onChangeHandler (values) {
      this.get('notifications').success('User selected: ' + values, {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onInputHandler (filterValue) {
      this.get('notifications').success('Handling input: ' + filterValue, {
        autoClear: true,
        clearDuration: 2000
      })
      this.set('search', filterValue)
    },

    onClearSelect (event) {
      this.set('preSelectedValueForClearing', '')
    },

    onChangeClearable (value) {
      this.set('preSelectedValueForClearing', value[0])
    }
  }
})
