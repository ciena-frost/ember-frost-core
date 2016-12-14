/**
 * An extendable version of the `hook` helper from ember-hook
 * NOTE: This should only be necessary until the PR adding this functionality directly to the `hook` is merged
 * @see {@link https://github.com/Ticketfly/ember-hook/pull/35}
 */
import Ember from 'ember'
const {Helper, deprecate} = Ember
import config from 'ember-get-config'
import decorateHook from 'ember-hook/utils/decorate-hook'
import delimit from 'ember-hook/utils/delimit'
import returnWhenTesting from 'ember-hook/utils/return-when-testing'

/**
 * Test if an object is empty `Ember.isEmpty` surprisingly doesn't do that
 * @see {@link https://github.com/emberjs/ember.js/issues/5543}
 * @see {@link https://github.com/emberjs/ember.js/blob/v2.10.0/packages/ember-metal/lib/is_empty.js}
 *
 * @param {Object} obj - the object to test
 * @returns {Boolean} true if there are no keys on the object
 */
function isEmpty (obj) {
  // Ember.keys is being deprecated in favor of Object.keys, handle both cases
  if (Ember.keys) {
    return Ember.keys(obj).length === 0
  } else if (Object.keys) {
    return Object.keys(obj).length === 0
  }

  // if we can't tell if it's empty, just assume it's empty, so the default case is used
  return true
}

export function ehook ([hook, qualifierObj = {}], attributes = {}) {
  deprecate('The "ehook" helper is deprecated. The "hook" helper can and should now be used instead.', {
    id: 'ember-frost-core.helpers.ehook',
    until: '2.0.0'
  })
  let qualifiers

  if (!isEmpty(qualifierObj) && !isEmpty(attributes)) {
    throw new Error('Either provide your own qualifier object, or add attributes to the "hook" helper, not both.')
  } else if (!isEmpty(qualifierObj)) {
    qualifiers = qualifierObj
  } else {
    qualifiers = attributes
  }

  return returnWhenTesting(config, decorateHook(delimit(hook), qualifiers))
}

export default Helper.helper(ehook)
