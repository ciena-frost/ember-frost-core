import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-select-li',
  'Integration: FrostSelectLiComponent',
  {
    integration: true
  },
  function () {
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
  }
)
