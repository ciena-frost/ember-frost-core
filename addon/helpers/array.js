/**
 * array helper
 * Temporary fix until the following bug is resolved: https://github.com/emberjs/ember.js/issues/14264
 */
import Ember from 'ember'
const {A, Helper} = Ember
const {helper} = Helper

export function array (params) {
  let array = A()
  array.pushObjects(params)
  return array
}

export default helper(array)
