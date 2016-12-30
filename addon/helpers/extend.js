/**
 * Simple helper to extend an object with additional properties, mainly used when adding properties
 * to hookQualifiers for ember-hook
 *
 * Added here instead of ember-hook b/c the collaborator of ember-hook suggested it not be included there
 * @see {@link https://github.com/Ticketfly/ember-hook/pull/35}
 */

/* eslint-disable ember-standard/destructure */

import Ember from 'ember'
const {Helper} = Ember

const assign = Object.assign || Ember.assign || Ember.merge

export function extend ([original], newProps) {
  return assign({}, original, newProps)
}

export default Helper.helper(extend)
