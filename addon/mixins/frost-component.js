import Ember from 'ember'
import events from '../utils/events'

const {
  Mixin,
  on,
  deprecate
} = Ember

export default Mixin.create({
  initEvents: on('init', function () {
    let exclude = this.excludeEvents || []
    Object.keys(events).forEach((event) => {
      events[event].forEach((frostEvent, i) => {
        if (this[frostEvent]) {
          deprecate(`
            Event handler '${frostEvent}' is deprecated.
            Please use '${events[event][0]}' event instead`,
            i === 0, {
              id: this.toString(),
              until: '2.0.0'
            })
          if (!exclude.includes(frostEvent)) {
            this[event] = function (e) {
              this[frostEvent](...arguments)
            }
          }
        }
      })
    })
  })
})
