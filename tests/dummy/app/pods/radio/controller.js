import Controller from '@ember/controller'
import EmberObject from '@ember/object'
import {inject as service} from '@ember/service'

// BEGIN-SNIPPET radio-controller
export default Controller.extend({
  notifications: service('notification-messages'),

  inlineValue: 'a',

  sampleList: [
    {label: 'a', value: 'a'},
    {label: 'b', value: 'b'},
    {label: 'c', value: 'c'},
    {label: 'd', value: 'd'},
    {label: 'e', value: 'e'}
  ],

  model: EmberObject.create({
    radioGroup1: 'c',
    radioGroup2: 'b',
    radioGroup3: 'c',
    radioGroup4: 'd',
    radioGroup5: 'b',
    radioGroup6: 'a',
    radioGroup7: 'b'
  }),

  actions: {
    change (event) {
      this.set(`model.${event.target.id}`, event.target.value)
      this.get('notifications').success(
        `Radio group ${event.target.id} value set to ${event.target.value}`, {
          autoClear: true,
          clearDuration: 2000
        }
      )
    }
  }
})
// END-SNIPPET radio-controller
