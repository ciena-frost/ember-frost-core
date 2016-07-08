import Ember from 'ember'
import FrostEvents from 'ember-frost-core/mixins/frost-events'
import {
  PropTypes
} from 'ember-prop-types'

const {
  Component
} = Ember

<%= importTemplate %>
export default Component.extend(FrostEvents, {<%= contents %>
})
