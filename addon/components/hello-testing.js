import Ember from 'ember'
import FrostEvents from 'ember-frost-core/mixins/frost-events'
import {
  PropTypes
} from 'ember-prop-types'

const {
  Component
} = Ember

import layout from '../templates/components/hello-testing';

export default Component.extend(FrostEvents, {
	// == Properties =============================================================
	excludeEvents: [],
	classNames: [
		'hello-testing'
	],
	layout,
	propTypes: {},
	// == Functions =============================================================
	getDefaultProps () {
		return {}
	}
})
