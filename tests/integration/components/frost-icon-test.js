import {expect} from 'chai'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-icon')
describe(test.label, function () {
  test.setup()

  it('sets icon class', function () {
    this.render(hbs`
      {{frost-icon hook='myIcon' icon='round-add'}}
    `)

    expect(
      this.$('.frost-icon-frost-round-add'),
      'Icon class is set correctly.'
    ).to.have.length(1)
  })

  it('sets the pack property', function () {
    this.render(hbs`
      {{frost-icon
        hook='myIcon'
        pack='test'
        icon='round-add'
      }}
    `)

    expect(
      this.$('.frost-icon-test-round-add'),
      'Icon class updates correctly when pack is set.'
    ).to.have.length(1)
  })

  it('renders using spread', function () {
    this.render(hbs`
      {{frost-icon hook='myIcon' options=(hash icon='round-add')}}
    `)

    expect(
      this.$('.frost-icon-frost-round-add'),
      'Icon class is set correctly.'
    ).to.have.length(1)
  })
})
