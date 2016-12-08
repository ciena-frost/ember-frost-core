/**
 * In order to simulate proper toString() values w/o faking them, we need a component in the app namespace of
 * the dummy-app that includes the CssMixin
 */

import Ember from 'ember'
const {Component} = Ember
import PropTypesMixin from 'ember-prop-types'

import CssMixin from 'ember-frost-core/mixins/css'

export default Component.extend(CssMixin, PropTypesMixin)
