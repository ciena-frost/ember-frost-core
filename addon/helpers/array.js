/**
 * array helper
 * Temporary fix until the following bug is resolved: https://github.com/emberjs/ember.js/issues/14264
 */
import Ember from 'ember'
const {A: emberArray, Helper} = Ember
const {helper} = Helper

export function array (params) {
  // params is a frozen, non-ember array
  return emberArray(params.slice())
}

export default helper(array)
