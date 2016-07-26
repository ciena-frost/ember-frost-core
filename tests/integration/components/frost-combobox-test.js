import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {afterEach, beforeEach} from 'mocha'
import sinon from 'sinon'
import hbs from 'htmlbars-inline-precompile'

const testTemplate = hbs`{{frost-combobox onChange=onChange data=data greeting=greeting}}`

describeComponent(
  'frost-combobox',
  'Integration: FrostComboboxComponent',
  {
    integration: true
  },
  function () {
    let sandbox
    let dropDown, props

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      props = {
        onChange: sinon.spy(),
        data: [
          {
            value: 'Lex Diamond'
          },
          {
            value: 'Johnny Blaze'
          },
          {
            value: 'Tony Starks'
          }
        ],
        greeting: 'Hola'
      }

      this.setProperties(props)

      this.render(testTemplate)
      dropDown = this.$('> div')
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('has correct initial state', function () {
      expect(dropDown).to.have.length(1)
    })
  })
