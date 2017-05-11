/**
 * Unit test for the re-export utils/index module
 */

import {expect} from 'chai'
import {describe, it} from 'mocha'

import {utils} from 'ember-frost-core'
import events from 'ember-frost-core/utils/events'
import {cloneEvent} from 'ember-frost-core/utils/index'
import keyCodes from 'ember-frost-core/utils/key-codes'
import windowUtils from 'ember-frost-core/utils/window'

describe('Unit / util exports', function () {
  it('should export events', function () {
    expect(utils.events).to.equal(events)
  })

  it('should export keyCodes', function () {
    expect(utils.keyCodes).to.equal(keyCodes)
  })

  it('should export cloneEvent function', function () {
    expect(utils.cloneEvent).to.equal(cloneEvent)
  })

  it('should export windowUtils', function () {
    expect(utils.windowUtils).to.equal(windowUtils)
  })
})
