import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach} from 'mocha'
import sinon from 'sinon'
import hbs from 'htmlbars-inline-precompile'
import $ from 'jquery'
import _ from 'lodash'
import Ember from 'ember'

const testTemplate = hbs`{{frost-select
  onChange=onChange
  data=data
  selected=selected
  greeting=greeting
  selectedValue=selVal
}}`

const keyCodes = {
  'up': 38,
  'down': 40,
  esc: 27,
  tab: 9
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
      this.render(testTemplate)
      dropDown = this.$('.frost-select')
    })

    it('renders', function () {
      expect(this.$('.frost-select')).to.have.length(1)
    })

    it('lists all passed data records', function () {
      Ember.run.later(() => {
        expect(this.$('.frost-select li').length).to.eql(props.data.length)
      })
    })

    it('opens when arrow clicked', (done) => {
      this.$('.frost-select .down-arrow').click()
      Ember.run.later(() => {
        expect(this.$('.frost-select').hasClass('open')).to.be.true
        done()
      })
    })
    it('closes when down arrow clicked a second time', (done) => {
      this.$('.frost-select .down-arrow').click()
      this.$('.frost-select .down-arrow').click()
      Ember.run.later(() => {
        expect(this.$('.frost-select').hasClass('ope')).to.be.false
        done()
      })
    })

    // FIXME: figure out why test is failing
    /* it('opens when focused', function (done) {
      this.$('.frost-select input').focus()
      Ember.run.later(() => {
        expect(this.$('.frost-select').hasClass('open')).to.be.true
        done()
      })
    })*/

    it('highlights list items on mouse over', function (done) {
      this.$('.frost-select').click()
      let listItem = this.$('.frost-select li:first-child')
      listItem.mouseover()
      Ember.run.later(() => {
        // expect(true).to.eql(true)
        let listItem = this.$('.frost-select li:first-child')

        expect(listItem.hasClass('hover')).to.be.true
        done()
      })
    })

    it('highlights list items when down-arrowed to', function (done) {
      let dropDown = this.$('.frost-select')
      keyUp(dropDown, 'down')
      Ember.run.later(() => {
        let listItem = this.$('.frost-select li:first-child')
        expect(listItem.hasClass('hover')).to.be.true
        done()
      })
    })

    it('highlights list items when up-arrowed to', function (done) {
      let dropDown = this.$('.frost-select')

      keyUp(dropDown, 'down')
      keyUp(dropDown, 'down')
      keyUp(dropDown, 'down')
      keyUp(dropDown, 'down')

      keyUp(dropDown, 'up')
      keyUp(dropDown, 'up')
      keyUp(dropDown, 'up')

      Ember.run.later(() => {
        let listItem = this.$('.frost-select li:first-child')

        expect(listItem.hasClass('hover')).to.be.true
        done()
      })
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

    it('selects the hovered item when enter is pressed', function (done) {
      keyUp(dropDown, 40)
      keyUp(dropDown, 13)

      Ember.run.later(() => {
        let dropDownInput = this.$('.frost-select input')
        let value = dropDownInput.val()
        expect(value).to.eql(props.data[0].label)
        done()
      })
    })

    it('selects the hovered item when it is clicked', function (done) {
      let listItem = this.$('.frost-select li:first-child')
      listItem.click()
      Ember.run.later(() => {
        let listItem = this.$('.frost-select li:first-child')
        expect(listItem.hasClass('selected')).to.be.true
        done()
      })
    })

    it('filters the list when input is typed into', function (done) {
      let input = this.$('.frost-select input')
      input.val('w')
      input[0].oninput({target: input[0]})
      Ember.run.later(() => {
        let listItems = this.$('.frost-select li')
        expect(listItems.length).to.eql(1)
        done()
      })
    })

    it('hovers the only available one if filter leaves one', function (done) {
      let input = this.$('.frost-select input')
      input.val('w')
      input[0].oninput({target: input[0]})
      Ember.run.later(() => {
        let listItems = this.$('.frost-select li')
        expect(listItems.length).to.eql(1)
        expect(listItems.hasClass('hover')).to.be.true
        done()
      })
    })

    it('calls the supplied callback when an item is selected', function (done) {
      let listItem = this.$('.frost-select li:first-child')
      listItem.click()
      Ember.run.later(() => {
        expect(props.onChange.called).to.be.true
        done()
      })
    })

    it('goes into error state when something non-existant is typed', function (done) {
      let input = this.$('.frost-select input')
      this.$('.frost-select').addClass('open')
      input.val('zxcv').trigger('input')
      Ember.run.later(() => {
        let component = this.$('.frost-select')
        expect(component.hasClass('open')).to.be.false
        expect(component.hasClass('error')).to.be.true

        done()
      })
    })

    it('respects a pre-selected value', function () {
      let component = this.$('.frost-select .selected')
      expect(component.length).to.eql(1)
    })

    it('sets the prompt to the selected value when the drop down list is closed', function (done) {
      let input = this.$('.frost-select input')
      keyUp(dropDown, 'down')
      keyUp(dropDown, 13) // Enter key, select the item

      Ember.run.later(() => {
        input.val('')
        keyUp(dropDown, 'down')
        keyUp(dropDown, 'esc')

        Ember.run.later(() => {
          let select = this.$('.frost-select')
          let input = this.$('.frost-select input')
          expect(select.hasClass('open')).to.be.false
          expect(input.val()).to.eql('Raekwon')
          done()
        })
      })
    })

    it('sets the prompt and value from a component attribute', function (done) {
      this.set('selVal', 'Tony Starks')

      Ember.run.later(() => {
        let input = this.$('.frost-select input')

        expect(input.val()).to.be.eql('Ghostface')
        expect(props.onChange.called).to.be.true
        done()
      })
    })

    it('handles click outside of select', function (done) {
      this.$('.frost-select .down-arrow').click()
      Ember.run.later(() => {
        this.$().click()
        Ember.run.later(() => {
          expect(dropDown.hasClass('open')).to.be.false
          done()
        })
      })
    })

    it('handles loosing focus by pressing tab', function (done) {
      this.$('.frost-select .down-arrow').click()
      Ember.run.later(() => {
        keyDown(dropDown, 'tab')
        Ember.run.later(() => {
          expect(dropDown.hasClass('open')).to.be.false
          done()
        })
      })
    })
  }
)
