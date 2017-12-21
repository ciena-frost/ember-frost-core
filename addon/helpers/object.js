/*
* ewhite 21/12/2017
* Fixes https://github.com/emberjs/ember.js/issues/14738
* Example: https://ember-twiddle.com/2260b80be13a1d6ca5e59c99c40ec51a?openFiles=templates.application.hbs%2C
* Cause: https://github.com/emberjs/ember.js/blob/v2.12.2/packages/ember-metal/lib/property_set.js#L45
*/
import Ember from 'ember'
const {Helper, merge} = Ember

export function object (_, obj) {
  return merge({}, obj)
}

export default Helper.helper(object)
