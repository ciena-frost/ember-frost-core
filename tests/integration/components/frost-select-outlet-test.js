import {expect} from 'chai'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-select-outlet')
describe(test.label, function () {
  test.setup()

  it('renders', function () {
    this.render(hbs`{{frost-select-outlet hook='mySelectOutlet'}}`)
    expect(this.$()).to.have.length(1)
  })
})
