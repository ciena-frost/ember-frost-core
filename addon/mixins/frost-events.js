/**
 * Mixin for frost-events
 */

import {on} from '@ember/object/evented'
import Mixin from '@ember/object/mixin'

import {events} from '../utils'

export default Mixin.create({
  initEvents: on('init', function () {
    events.init.call(this, events.map, events.addProperty)
  })
})
