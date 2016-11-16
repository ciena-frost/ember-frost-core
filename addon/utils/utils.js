import Ember from 'ember'
const {$} = Ember

export function cloneEvent (event, target) {
  let newEvent = $.Event(null, event)
  let newTarget = $.clone(target)

  newEvent.target = newTarget

  return newEvent
}
