import Ember from 'ember'
const {
  A,
  Helper: {
    helper
  }
} = Ember

export function array (params) {
  // Temporary fix until the following bug is resolved: https://github.com/emberjs/ember.js/issues/14264
  // initial code:
  // return params

  let array = A()
  array.pushObjects(params)
  return array
}

export default helper(array)
