import {expect} from 'chai'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

const test = integration('frost-select-outlet')
describe(test.label, function () {
  test.setup()

  it('should render', function () {
    this.render(hbs`{{frost-select-outlet hook='mySelectOutlet'}}`)
    expect(this.$()).to.have.length(1)
  })
})
