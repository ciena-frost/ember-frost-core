/**
 * In order to simulate proper toString() values w/o faking them, we need a component in the app namespace of
 * the dummy-app that includes the CssMixin
 */

import Component from '@ember/component'

import CssMixin from 'ember-frost-core/mixins/css'
import PropTypesMixin from 'ember-prop-types'

export default Component.extend(CssMixin, PropTypesMixin)
