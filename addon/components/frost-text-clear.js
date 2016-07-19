import Ember from 'ember'
const {
  Component
} = Ember
import FrostEvents from '../mixins/frost-events'
import layout from '../templates/components/frost-text-clear'

export default Component.extend(FrostEvents, {
  classNames: [
    'frost-text-clear'
  ],
  layout
})
