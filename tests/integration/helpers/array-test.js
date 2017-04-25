import {expect} from 'chai'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const test = integration('array')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    this.render(hbs`{{array 1 2 3}}`)
  })

  it('renders as expected', function () {
    this.render(hbs`{{array 1 2 3}}`)
    expect(this.$().text().trim()).to.be.equal('1,2,3')
  })

  it('use in loop', function () {
    this.render(hbs`
    {{#each (array 1 2 3) as |value|}}
      <p class='value'>{{value}}</p>
    {{/each}}`)
    expect(this.$('.value')).to.have.length(3)
  })
})
