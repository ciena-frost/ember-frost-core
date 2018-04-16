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

  isLoading: true,
  preSelectedValue: 'Bruce Wayne',
  preFilter: 'B',
  width: 500,

  actions: {
    onChangeHandler (value) {
      this.get('notifications').success('User selected: ' + value, {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onClearHandler () {
      this.get('notifications').success('Clearing filter', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onBlurHandler () {
      this.get('notifications').success('blur event', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onFocusHandler () {
      this.get('notifications').success('focus event', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onClickHandler () {
      this.get('notifications').success('click event', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onInputHandler (filterInput) {
      this.get('notifications').success('Handling input: ' + filterInput, {
        autoClear: true,
        clearDuration: 2000
      })
    },

    toggleLoading () {
      this.set('isLoading', !this.get('isLoading'))
    }
  }
})
