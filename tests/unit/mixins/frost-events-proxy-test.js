/* jshint expr:true */
import { expect } from 'chai'
import {
  describe,
  it
} from 'mocha'
import Ember from 'ember'
import FrostEventsProxyMixin from 'ember-frost-core/mixins/frost-events-proxy'

describe('FrostEventsProxyMixin', function () {
  // Replace this with your real tests.
  it('works', function () {
    let FrostEventsProxyObject = Ember.Object.extend(FrostEventsProxyMixin)
    let subject = FrostEventsProxyObject.create()
    expect(subject).to.be.ok
  })
})
