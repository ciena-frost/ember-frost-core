/**
 * Test helpers for frost-link
 */
import Ember from 'ember'

/**
 * Stub the routing service so we can test the route given to a frost-link
 * @param {*} context - the testing context (`this` from within your beforeEach())
 */
export function stubRoutingService (context) {
  const RouterStub = Ember.Object.extend({
    generateURL (endpoint, segments) {
      let url = endpoint

      if (segments.length !== 0) {
        url = `${url}/${segments.join('/')}`
      }

      return url
    },

    hasRoute () {
      return true
    },

    transitionTo () {}
  })

  context.registry.register('service:-routing', RouterStub)
}
