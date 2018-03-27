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
      let search = this.get('search').toLowerCase()
      let filteredResult = result.filter((item) => {
        if (item.label.toLowerCase().startsWith(search)) {
          return true
        }
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

    onAutocompleteInputHandler (filterValue) {
      this.get('notifications').success('Handling input: ' + filterValue.value, {
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
