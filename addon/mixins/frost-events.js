import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import {events} from '../utils'

export default Mixin.create({
  initEvents: on('init', function () {
    events.init.call(this, events.map, events.addProperty)
  })
})
