/* jshint expr:true */
import { expect } from 'chai'
import Ember from 'ember'
const {
  $
} = Ember
import {
  describe,
  it
} from 'mocha'
import {cloneEvent} from 'ember-frost-core/utils/utils'

describe('cloneEvent', function () {
  it('target cloned and original target unchanged', function () {
    const eventText = 'my-original-target'
    const clonedEventText = 'cloned-target'

    // Create the target
    const target = $(`<div>${eventText}</div>`)
    target.cloneNode = function () { return $(`<div>${clonedEventText}</div>`) }
    target.ownerDocument = this

    // Create the event
    const event = $.Event('click', {target: target})

    // Clone the event
    const clonedEvent = cloneEvent(event, target)

    expect(
      event.target.text(),
      'target is unchanged'
    ).to.eq(eventText)

    expect(
      clonedEvent.target.text(),
      'target has been cloned'
    ).to.eq(clonedEventText)
  })
})
