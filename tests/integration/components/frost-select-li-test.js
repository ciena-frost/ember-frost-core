import {expect} from 'chai'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-select-li')
describe(test.label, function () {
  test.setup()

  it('renders', function () {
    this.setProperties({
      data: {
        label: 'Foo',
        selected: false,
        value: 'foo'
      },
      onItemOver () {},
      onSelect () {}
    })

    this.render(hbs`{{frost-select-li
      data=data
      hook='mySelectListItem'
      onItemOver=onItemOver
      onSelect=onSelect
    }}`)
    expect(this.$()).to.have.length(1)
  })
})
