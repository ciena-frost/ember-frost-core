import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach} from 'mocha'
import sinon from 'sinon'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'
const {run} = Ember

function wait (callback) {
  run.later(callback)
}

const selectedTestTemplate = hbs`{{frost-multi-select onChange=onChange selected=selected data=data greeting=greeting}}`
const selectedValueTestTemplate = hbs`{{frost-multi-select onChange=onChange data=data greeting=greeting selectedValue=selectedValue}}`

let props = {
  onChange: sinon.spy(),
  selected: [],
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

describeComponent(
  'frost-multi-select',
  'Integration: FrostMultiSelectComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      props.selected = []
      run(() => {
        this.setProperties(props)
      })
      this.render(selectedTestTemplate)
    })

    it('renders', function () {
      expect(this.$('.frost-select.multi')).to.have.length(1)
    })

    it('shows a checkbox for each item', function () {
      // test that each row has a checkbox, maybe $('.frost-checkbox').length
      expect(this.$('.frost-checkbox').length).to.eql(props.data.length)
    })

    it('clicking a row checks the box', function (done) {
      this.$('.frost-select li:first-child').click()
      wait(() => {
        expect(this.$('.frost-select .selected')).to.have.length(1)
        done()
      })
    })

    it('displays the selection in the text input when 1 item is selected', function (done) {
      this.$('.frost-select li:first-child').click()
      wait(() => {
        expect(this.$('.frost-select .trigger').val()).to.eql(props.data[0].label)
        done()
      })
    })

    it('displays both selected items in the text input when 2 items are selected', function (done) {
      this.$('.frost-select li:first-child').click()
      this.$('.frost-select li:nth-child(2)').click()
      wait(() => {
        expect(this.$('.frost-select .trigger').val()).to.eql([props.data[0].label, props.data[1].label].join(', '))
        done()
      })
    })

    it('displays the number of selected items in the text input when 3 or more items are selected', function (done) {
      this.$('.frost-select li:first-child').click()
      this.$('.frost-select li:nth-child(2)').click()
      this.$('.frost-select li:nth-child(3)').click()
      wait(() => {
        expect(this.$('.frost-select .trigger').val()).to.eql('3 items selected')
        done()
      })
    })

    it('has a footer message with number selected', function (done) {
      this.$('.frost-select li:first-child').click()
      this.$('.frost-select li:nth-child(2)').click()
      this.$('.frost-select li:nth-child(3)').click()
      wait(() => {
        expect(this.$('.frost-select .number-selected').text()).to.eql('3 selected')
        done()
      })
    })

    it('has a clear button', function () {
      expect(this.$('.frost-select .clear')).to.have.length(1)
    })

    it('that clears the selection', function (done) {
      this.$('.frost-select li:first-child').click()
      this.$('.frost-select li:nth-child(2)').click()
      this.$('.frost-select li:nth-child(3)').click()
      this.$('.frost-select .clear').click()
      wait(() => {
        expect(this.$('.frost-select .selected')).to.have.length(0)
        done()
      })
    })

    it('filters list when none are selected', function (done) {
      let input = this.$('.frost-select input')

      input.val('kwon').trigger('input')
      wait(() => {
        expect(this.$('.frost-select li')).to.have.length(1)
        done()
      })
    })

    it('does not allow filtering when 1+ are selected', function (done) {
      this.$('.frost-select li:first-child').click()
      wait(() => {
        let input = this.$('.frost-select input[type=text]')
        expect(input.prop('disabled')).to.be.true
        done()
      })
    })

    it('keeps the list open when a value is selected', function (done) {
      this.$('.down-arrow').click()
      this.$('.frost-select li:first-child').click()
      wait(() => {
        const isOpen = this.$('.frost-select').hasClass('open')
        expect(isOpen).to.be.true
        done()
      })
    })
  }
)

describeComponent(
  'frost-multi-select',
  'Intergration: FrostMultiSelectComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      run(() => {
        this.setProperties(props)
      })
      this.render(selectedValueTestTemplate)
    })

    it('allows for setting multiple values using the selectedValue attribute', function (done) {
      this.set('selectedValue', ['Lex Diamond', 'Tony Starks', 'Johnny Blaze'])

      wait(() => {
        let input = this.$('.frost-select .trigger')

        expect(input.val()).to.eql('3 items selected')
        expect(props.onChange.called).to.be.true
        done()
      })
    })

    it('overwrites selection if selectedValue is set', function (done) {
      this.$('.frost-select li:first-child').click()
      wait(() => {
        this.set('selectedValue', 'Tony Starks')
        wait(() => {
          let input = this.$('.frost-select .trigger')
          expect(input.val()).to.eql('Ghostface')
          done()
        })
      })
    })

    it('clears selection if selectedValue is set to null', function (done) {
      this.$('.frost-select li:first-child').click()
      wait(() => {
        this.set('selectedValue', null)
        wait(() => {
          let input = this.$('.frost-select .trigger')
          expect(input.val()).to.eql('')
          done()
        })
      })
    })
  }
)

describeComponent(
  'frost-multi-select',
  'Integration: FrostMultiSelectComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      props.selected = [1, 2]
      run(() => {
        this.setProperties(props)
      })

      this.render(selectedTestTemplate)
    })

    it('respects pre-selected values', function (done) {
      run.later(() => {
        expect(this.$('.frost-select .selected')).to.have.length(2)
        done()
      })
    })
  }
)
