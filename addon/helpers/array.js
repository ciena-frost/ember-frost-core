/**
 * array helper
 * Temporary fix until the following bug is resolved: https://github.com/emberjs/ember.js/issues/14264
 */

import {A} from '@ember/array'
import Helper from '@ember/component/helper'
const {helper} = Helper

export function array (params) {
  let array = A()
  array.pushObjects(params)
  return array
}

export default helper(array)
