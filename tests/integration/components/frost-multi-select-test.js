import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {$hook, initialize} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach, describe} from 'mocha'
import sinon from 'sinon'
import hbs from 'htmlbars-inline-precompile'

function wait (callback) {
  run.later(callback)
}

const selectedTestTemplate = hbs`
  {{from-elsewhere name='frost-select'}}
  {{frost-multi-select
    onChange=onChange
    selected=selected
    data=data
    greeting=greeting
    hook=hook
  }}
`
const selectedValueTestTemplate = hbs`
  {{from-elsewhere name='frost-select'}}
  {{frost-multi-select
    onChange=onChange
    data=data
    greeting=greeting
    selectedValue=selectedValue}}
`

let props = {
  hook: 'my-multi-select',
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
      initialize()
      props.selected = []
      run(() => {
        this.setProperties(props)
      })
      this.render(selectedTestTemplate)
    })

    it('renders', function () {
      expect(this.$('.frost-select.multi')).to.have.length(1)
    })

    describe('when opened', function () {
      beforeEach(function () {
        return $hook('my-multi-select').find('.down-arrow').click()
      })

      it('hook grabs the multi-select as expected', function () {
        expect($hook('my-multi-select').hasClass('multi')).to.be.true

        expect($hook('my-multi-select-input').prop('type')).to.be.eql('text')

        expect($hook('my-multi-select-list').find('li')).to.have.length(3)

        expect($hook('my-multi-select-item-0')).to.have.length(1)

        expect($hook('my-multi-select-checkbox-item-0')).to.have.length(1)
      })

      it('shows a checkbox for each item', function () {
        // test that each row has a checkbox, maybe $('.frost-checkbox').length
        expect(this.$('.frost-checkbox').length).to.eql(props.data.length)
      })

      it('clicking a row checks the box', function (done) {
        $hook('my-multi-select-list').find('li:first-child').click()
        wait(() => {
          expect($hook('my-multi-select-list').find('.selected')).to.have.length(1)
          done()
        })
      })

      it('displays the selection in the text input when 1 item is selected', function (done) {
        $hook('my-multi-select-list').find('li:first-child').click()
        wait(() => {
          expect(this.$('.frost-select .trigger').val()).to.eql(props.data[0].label)
          done()
        })
      })

      it('displays both selected items in the text input when 2 items are selected', function (done) {
        $hook('my-multi-select-list').find('li:first-child').click()
        $hook('my-multi-select-list').find('li:nth-child(2)').click()
        wait(() => {
          expect(this.$('.frost-select .trigger').val()).to.eql([props.data[0].label, props.data[1].label].join(', '))
          done()
        })
      })

      it('displays the number of selected items in the text input when 3 or more items are selected', function (done) {
        $hook('my-multi-select-list').find('li:first-child').click()
        $hook('my-multi-select-list').find('li:nth-child(2)').click()
        $hook('my-multi-select-list').find('li:nth-child(3)').click()
        wait(() => {
          expect(this.$('.frost-select .trigger').val()).to.eql('3 items selected')
          done()
        })
      })

      it('has a footer message with number selected', function (done) {
        $hook('my-multi-select-list').find('li:first-child').click()
        $hook('my-multi-select-list').find('li:nth-child(2)').click()
        $hook('my-multi-select-list').find('li:nth-child(3)').click()
        wait(() => {
          expect($hook('my-multi-select-list').find('.number-selected').text()).to.eql('3 selected')
          done()
        })
      })

      it('has a clear button', function () {
        expect($hook('my-multi-select-list').find('.clear')).to.have.length(1)
      })

      it('that clears the selection', function (done) {
        $hook('my-multi-select-list').find('li:first-child').click()
        $hook('my-multi-select-list').find('li:nth-child(2)').click()
        $hook('my-multi-select-list').find('li:nth-child(3)').click()
        $hook('my-multi-select-list').find('.clear').click()
        wait(() => {
          expect($hook('my-multi-select-list').find('.selected')).to.have.length(0)
          done()
        })
      })

      it('filters list when none are selected', function (done) {
        let input = this.$('.frost-select input')

        input.val('kwon').trigger('input')
        wait(() => {
          expect($hook('my-multi-select-list').find('li')).to.have.length(1)
          done()
        })
      })

      it('does not allow filtering when 1+ are selected', function (done) {
        $hook('my-multi-select-list').find('li:first-child').click()
        wait(() => {
          let input = this.$('.frost-select input[type=text]')
          expect(input.prop('disabled')).to.be.true
          done()
        })
      })

      it('keeps the list open when a value is selected', function (done) {
        $hook('my-multi-select-list').find('li:first-child').click()
        wait(() => {
          const isOpen = this.$('.frost-select').hasClass('open')
          expect(isOpen).to.be.true
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

    it('keeps prompt on rerender', function (done) {
      this.set('selectedValue', ['Tony Starks'])
      // A bug would cause the prompt to clear on a rerender
      // We trigger one here by changing a dummy attribute
      this.set('greeting', 'Bonjour')

      wait(() => {
        let input = this.$('.frost-select .trigger')

        expect(input.val()).to.eql('Ghostface')
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

    describe('when opened', function () {
      beforeEach(function () {
        return $hook('my-multi-select').find('.down-arrow').click()
      })

      it('respects pre-selected values', function (done) {
        run.later(() => {
          expect($hook('my-multi-select-list').find('.selected')).to.have.length(2)
          done()
        })
      })
    })
  }
)
