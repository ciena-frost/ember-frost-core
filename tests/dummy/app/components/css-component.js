/**
 * In order to simulate proper toString() values w/o faking them, we need a component in the app namespace of
 * the dummy-app that includes the CssMixin
 */

import Ember from 'ember'
import CssMixin from 'ember-frost-core/mixins/css'
import PropTypesMixin from 'ember-prop-types'
const {Component} = Ember

export default Component.extend(CssMixin, PropTypesMixin)
