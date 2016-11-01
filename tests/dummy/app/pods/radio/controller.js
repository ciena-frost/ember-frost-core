import Ember from 'ember'
const {Controller} = Ember

// BEGIN-SNIPPET radio-controller
export default Controller.extend({
  notifications: Ember.inject.service('notification-messages'),

  inlineValue: 'a',

  sampleList1: ['a', 'b', 'c', 'd', 'e'],
  sampleList2: ['a', 'b', 'c', 'd', 'e'],
  sampleList3: ['a', 'b', 'c', 'd', 'e'],
  sampleList4: ['a', 'b', 'c', 'd', 'e'],
  sampleList5: ['a', 'b', 'c', 'd', 'e'],
  sampleList6: ['a', 'b', 'c', 'd', 'e'],
  sampleList7: ['a', 'b', 'c', 'd', 'e'],

  model: Ember.Object.create({
    radioGroup1: 'a',
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
