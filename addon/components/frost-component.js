import Ember from 'ember'
import events from './utils/events'

const {
  Mixin
} = Ember

export default Mixin.create({
  init () {
    this._super(...arguments)
    Object.keys(events).forEach((event) => {
      events[event].forEach((frostEvent) => {
        if (this[frostEvent]) {
          this[event] = function (e) {
            this[frostEvent](...arguments)
          }
        }
      })
    })
  }
})
