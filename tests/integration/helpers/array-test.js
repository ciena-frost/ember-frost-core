import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach} from 'mocha'

describeComponent(
  'array',
  'Integration: ArrayHelper',
  {
    integration: true
  },
  function () {
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
  }
)
