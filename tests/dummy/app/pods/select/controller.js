import Controller from '@ember/controller'
import {computed} from '@ember/object'
import {inject as service} from '@ember/service'

export default Controller.extend({
  notifications: service('notification-messages'),
  data: computed('data', 'search', function () {
    let result = this.model.map((record) => {
      return {
        label: record.get('label'),
        secondaryLabels: record.get('secondaryLabels'),
        value: record.get('value')
      }
    })
    if (this.get('search')) {
      let search = this.get('search').toLowerCase()
      let filteredResult = result.filter((item) => {
        if (item.label.toLowerCase().indexOf(search) !== -1) {
          return true
        }
        item.secondaryLabels.filter(function (item) {
          if (item.label.toLowerCase().indexOf(search) !== -1) {
            return true
          }
        })
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
