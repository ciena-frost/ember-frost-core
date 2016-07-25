import _ from 'lodash'
import Ember from 'ember'
const {$, run} = Ember
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach, describe} from 'mocha'
import sinon from 'sinon'
import hbs from 'htmlbars-inline-precompile'

const selectedTestTemplate = hbs`{{frost-select
  data=data
  greeting=greeting
  onChange=onChange
  placeholder=placeholder
  selected=selected
}}`

const selectedValueTestTemplate = hbs`{{frost-select
  data=data
  greeting=greeting
  onChange=onChange
  placeholder=placeholder
  selectedValue=selVal
}}`

const keyCodes = {
  'up': 38,
  'down': 40,
  esc: 27,
  tab: 9,
  backspace: 8
}

function keyDown ($selection, keyCode) {
  if (_.isString(keyCode)) {
    keyCode = keyCodes[keyCode]
  }
  let event = $.Event('keydown')
  event.which = keyCode

  $selection.trigger(event)
}

function keyUp ($selection, keyCode) {
  if (_.isString(keyCode)) {
    keyCode = keyCodes[keyCode]
  }
  let event = $.Event('keyup')
  event.which = keyCode

  $selection.trigger(event)
}

describeComponent(
  'frost-select',
  'Integration: FrostSelectComponent',
  {
    integration: true
  },
  function () {
    let props
    let dropDown

    beforeEach(function () {
      props = {
        selected: 1,
        onChange: sinon.spy(),
        placeholder: 'Select something already',
        data: [
          {
            value: 'Lex Diamond',
            label: 'Raekwon'
          },
          {
            value: 'Johnny Blaze',
            label: 'Method Man'
          },
          {
            value: 'Tony Starks',
            label: 'Ghostface'
          }
        ],
        greeting: 'Hola'
      }
      run(() => {
        this.setProperties(props)
        this.render(selectedTestTemplate)
      })
      dropDown = this.$('.frost-select')
    })

    it('renders', function () {
      expect(this.$('.frost-select')).to.have.length(1)
    })

    it('lists all passed data records', function () {
      expect(this.$('.frost-select li').length).to.eql(props.data.length)
    })

    it('opens when arrow clicked', () => {
      run(() => {
        this.$('.frost-select .down-arrow').click()
      })
      expect(this.$('.frost-select').hasClass('open')).to.be.true
    })

    it('closes when down arrow clicked a second time', () => {
      run(() => {
        this.$('.frost-select .down-arrow').click()
        this.$('.frost-select .down-arrow').click()
      })

      expect(this.$('.frost-select').hasClass('open')).to.be.false
    })

    // FIXME: figure out why test is failing
    /* it('opens when focused', function () {
      run(() => {
        this.$('.frost-select input').focus()
      })
      expect(this.$('.frost-select').hasClass('open')).to.be.true
    })*/

    it('highlights list items on mouse over', function () {
      run(() => {
        this.$('.frost-select').click()
        let listItem = this.$('.frost-select li:first-child')
        listItem.mouseover()
      })
      let listItem = this.$('.frost-select li:first-child')
      expect(listItem.hasClass('hover')).to.be.true
    })

    it('highlights list items when down-arrowed to', function () {
      run(() => {
        let dropDown = this.$('.frost-select')
        keyUp(dropDown, 'down')
      })
      let listItem = this.$('.frost-select li:first-child')
      expect(listItem.hasClass('hover')).to.be.true
    })

    it('highlights list items when up-arrowed to', function () {
      let dropDown = this.$('.frost-select')
      run(() => {
        keyUp(dropDown, 'down')
        keyUp(dropDown, 'down')
        keyUp(dropDown, 'down')
        keyUp(dropDown, 'down')

        keyUp(dropDown, 'up')
        keyUp(dropDown, 'up')
        keyUp(dropDown, 'up')
      })

      let listItem = this.$('.frost-select li:first-child')
      expect(listItem.hasClass('hover')).to.be.true
    })

    it('closes when esc is pressed', function () {
      let dropDown = this.$('.frost-select')

      dropDown.click()
      keyUp(dropDown, 'esc')

      expect(dropDown.hasClass('open')).to.be.false
    })

    it('closes when blurred', () => {
      keyUp(dropDown, 27)
      expect(dropDown.hasClass('open')).to.be.false

      expect(dropDown)
    })

    it('selects the hovered item when enter is pressed', function () {
      run(() => {
        keyUp(dropDown, 40)
        keyUp(dropDown, 13)
      })

      let dropDownInput = this.$('.frost-select input')
      let value = dropDownInput.val()
      expect(value).to.eql(props.data[0].label)
    })

    it('selects the hovered item when it is clicked', function () {
      run(() => {
        let listItem = this.$('.frost-select li:first-child')
        listItem.click()
      })
      let listItem = this.$('.frost-select li:first-child')
      expect(listItem.hasClass('selected')).to.be.true
    })

    it('filters the list when input is typed into', function () {
      run(() => {
        this.$('.frost-select input').first()
          .val('w')
          .trigger('input')
      })
      let listItems = this.$('.frost-select li')
      expect(listItems.length).to.eql(1)
    })

    it('hovers the only available one if filter leaves one', function () {
      run(() => {
        this.$('.frost-select input').first()
          .val('w')
          .trigger('input')
      })

      let listItems = this.$('.frost-select li')
      expect(listItems.length).to.eql(1)
      expect(listItems.hasClass('hover')).to.be.true
    })

    it('calls the supplied callback when an item is selected', function () {
      run(() => {
        let listItem = this.$('.frost-select li:first-child')
        listItem.click()
      })
      expect(props.onChange.called).to.be.true
    })

    it('goes into error state when something non-existant is typed', function () {
      run(() => {
        let input = this.$('.frost-select input')
        this.$('.frost-select').addClass('open')
        input.val('zxcv').trigger('input')
      })
      let component = this.$('.frost-select')
      expect(component.hasClass('open')).to.be.false
      expect(component.hasClass('error')).to.be.true
    })

    it('respects a pre-selected value', function (done) {
      run.later(() => {
        let component = this.$('.frost-select .selected')
        expect(component.length).to.eql(1)
        done()
      })
    })

    it('unsets the value when the index is less than 0', function () {
      run(() => {
        this.set('selected', [-1])
      })
      expect(this.$('.frost-select .selected').length).to.eql(0)
    })

    it('sets the prompt to the selected value when the drop down list is closed', function () {
      run(() => {
        let input = this.$('.frost-select input')
        keyUp(dropDown, 'down')
        keyUp(dropDown, 13) // Enter key, select the item
        input.focus()
        keyUp(dropDown, 'backspace')
        keyUp(dropDown, 'esc')
      })

      let select = this.$('.frost-select')
      let input = this.$('.frost-select input')
      expect(select.hasClass('open')).to.be.false
      expect(input.val()).to.eql('Raekwon')
    })

    it('handles click outside of select', function () {
      run(() => {
        this.$('.frost-select .down-arrow').click()
        this.$().click()
      })
      expect(dropDown.hasClass('open')).to.be.false
    })

    it('handles losing focus by pressing tab', function () {
      run(() => {
        this.$('.frost-select .down-arrow').click()
        keyDown(dropDown, 'tab')
      })
      expect(dropDown.hasClass('open')).to.be.false
    })

    it('supports placeholder', function () {
      const $input = this.$('.frost-select input')
      expect($input.attr('placeholder')).to.eql('Select something already')
    })

    describe('when passing in selected value', function () {
      let props
      beforeEach(function () {
        props = {
          selected: [],
          onChange: sinon.spy(),
          placeholder: 'Select something already',
          data: [
            {
              value: 'Lex Diamond',
              label: 'Raekwon'
            },
            {
              value: 'Johnny Blaze',
              label: 'Method Man'
            },
            {
              value: 'Tony Starks',
              label: 'Ghostface'
            }
          ],
          greeting: 'Hola'
        }
        this.setProperties(props)
        this.render(selectedValueTestTemplate)
      })

      it('renders', function () {
        expect(this.$('.frost-select')).to.have.length(1)
      })

      it('sets the prompt and value from a component attribute', function () {
        run(() => {
          this.set('selVal', 'Tony Starks')
        })

        let input = this.$('.frost-select input')
        expect(input.val()).to.be.eql('Ghostface')
      })
    })
  }
)
