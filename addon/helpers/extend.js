/**
 * Simple helper to extend an object with additional properties, mainly used when adding properties
 * to hookQualifiers for ember-hook
 *
 * Added here instead of ember-hook b/c the collaborator of ember-hook suggested it not be included there
 * @see {@link https://github.com/Ticketfly/ember-hook/pull/35}
 */

import Helper from '@ember/component/helper'
const {helper} = Helper
import {assign, merge} from '@ember/polyfills'

const objectAssign = Object.assign || assign || merge

export function extend ([original], newProps) {
  return objectAssign({}, original, newProps)
}

export default helper(extend)
