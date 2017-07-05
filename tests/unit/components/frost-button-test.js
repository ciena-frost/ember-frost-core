import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import Component from 'ember-frost-core/components/frost-component'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = unit('frost-button')
describe(test.label, function () {
  test.setup()

  let component, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = this.subject({
      hook: 'myButton'
    })
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should default tagName to button', function () {
    expect(component.get('tagName')).to.equal('button')
  })

  it('should default autofocus to false', function () {
    expect(component.get('autofocus')).to.equal(false)
  })

  it('should default design to empty string', function () {
    expect(component.get('design')).to.equal('')
  })

  it('should default disabled to false', function () {
    expect(component.get('disabled')).to.equal(false)
  })

  it('should default icon to empty string', function () {
    expect(component.get('icon')).to.equal('')
  })

  it('should default pack to frost', function () {
    expect(component.get('pack')).to.equal('frost')
  })

  it('should default priority to empty string', function () {
    expect(component.get('priority')).to.equal('')
  })

  it('should default size to empty string', function () {
    expect(component.get('size')).to.equal('')
  })

  it('should default text to empty string', function () {
    expect(component.get('text')).to.equal('')
  })

  it('should default title to empty string', function () {
    expect(component.get('text')).to.equal('')
  })

  it('should default type to button', function () {
    expect(component.get('type')).to.equal('button')
  })

  it('should default vertical to false', function () {
    expect(component.get('vertical')).to.equal(false)
  })

  it('should extend the common frost component', function () {
    expect(component instanceof Component).to.equal(true)
  })

  describe('"isTextOnly" computed property', function () {
    describe('when text alone is set', function () {
      beforeEach(function () {
        component.set('text', 'some text')
      })

      it('should be true', function () {
        expect(component.get('isTextOnly')).to.equal(true)
      })
    })

    describe('when text and icon are set', function () {
      beforeEach(function () {
        component.setProperties({
          icon: 'round-add',
          text: 'some text'
        })
      })

      it('should be false', function () {
        expect(component.get('isTextOnly')).to.equal(false)
      })
    })
  })

  describe('"isIconOnly" computed property', function () {
    describe('when icon alone is set', function () {
      beforeEach(function () {
        component.set('icon', 'round-add')
      })

      it('should be true', function () {
        expect(component.get('isIconOnly')).to.equal(true)
      })
    })

    describe('when icon and text are set', function () {
      beforeEach(function () {
        component.setProperties({
          icon: 'round-add',
          text: 'some text'
        })
      })

      it('should be false', function () {
        expect(component.get('isIconOnly')).to.equal(false)
      })
    })
  })

  describe('"isIconAndText" computed property', function () {
    describe('when icon alone is set', function () {
      beforeEach(function () {
        component.set('icon', 'round-add')
      })

      it('should be false', function () {
        expect(component.get('isIconAndText')).to.equal(false)
      })
    })

    describe('when text alone is set', function () {
      beforeEach(function () {
        component.set('text', 'some text')
      })

      it('should be false', function () {
        expect(component.get('isIconAndText')).to.equal(false)
      })
    })

    describe('when icon and text are set', function () {
      beforeEach(function () {
        component.setProperties({
          icon: 'round-add',
          text: 'some text'
        })
      })

      it('should be true', function () {
        expect(component.get('isIconAndText')).to.equal(true)
      })
    })
  })

  describe('"extraClasses" computed property', function () {
    const validDesignClasses = [
      {in: 'app-bar', out: 'app-bar'},
      {in: 'info-bar', out: 'info-bar'},
      {in: 'tab', out: 'tab'}
    ]

    validDesignClasses.forEach((test) => {
      describe(`When design is set to "${test.in}"`, function () {
        beforeEach(function () {
          component.setProperties({
            design: test.in,
            text: 'some text'
          })
        })

        it(`should include "${test.out}"`, function () {
          expect(component.get('extraClasses')).to.include(test.out)
        })
      })
    })

    const validSizes = [
      {in: 'large', out: 'large'},
      {in: 'medium', out: 'medium'},
      {in: 'small', out: 'small'}
    ]

    validSizes.forEach((test) => {
      describe(`When size is set to "${test.in}"`, function () {
        beforeEach(function () {
          component.set('size', test.in)
        })

        it(`should include "${test.out}"`, function () {
          expect(component.get('extraClasses')).to.include(test.out)
        })
      })
    })

    const validPriorities = [
      {in: 'primary', out: 'primary'},
      {in: 'confirm', out: 'primary'},
      {in: 'secondary', out: 'secondary'},
      {in: 'normal', out: 'secondary'},
      {in: 'tertiary', out: 'tertiary'},
      {in: 'cancel', out: 'tertiary'}
    ]

    validPriorities.forEach((test) => {
      describe(`When priority is set to "${test.in}"`, function () {
        beforeEach(function () {
          component.set('priority', test.in)
        })

        it(`should include "${test.out}"`, function () {
          expect(component.get('extraClasses')).to.include(test.out)
        })
      })
    })

    describe('when "design" property is set', function () {
      beforeEach(function () {
        sandbox.spy(Logger, 'error')
        sandbox.spy(Logger, 'warn')

        component.set('design', 'app-bar')
      })

      describe('but neither "text" nor "icon" are set', function () {
        let extraClasses
        beforeEach(function () {
          component.setProperties({
            icon: '',
            text: ''
          })

          extraClasses = component.get('extraClasses')
        })

        it('should return with no class', function () {
          expect(extraClasses).to.equal(undefined)
        })

        it('should log an error', function () {
          const msg = 'Error: The `design` property requires `text` or `icon` property to be specified.'
          expect(Logger.error).to.have.been.calledWith(msg)
        })
      })

      describe('when "priority" is also set', function () {
        let extraClasses
        beforeEach(function () {
          component.setProperties({
            priority: 'primary',
            text: 'some text'
          })

          extraClasses = component.get('extraClasses')
        })

        it('should log a warning', function () {
          const msg = 'Warning: The `design` property takes precedence over `size` and `priority`.'
          expect(Logger.warn).to.have.been.calledWith(msg)
        })

        it('should still include the design class', function () {
          expect(extraClasses).to.include('app-bar')
        })
      })

      describe('when "size" is also set', function () {
        let extraClasses
        beforeEach(function () {
          component.setProperties({
            size: 'small',
            text: 'some text'
          })

          extraClasses = component.get('extraClasses')
        })

        it('should log a warning', function () {
          const msg = 'Warning: The `design` property takes precedence over `size` and `priority`.'
          expect(Logger.warn).to.have.been.calledWith(msg)
        })

        it('should still include the design class', function () {
          expect(extraClasses).to.include('app-bar')
        })
      })

      describe('when "size" and "priority" are both also set', function () {
        let extraClasses
        beforeEach(function () {
          component.setProperties({
            priority: 'primary',
            size: 'small',
            text: 'some text'
          })

          extraClasses = component.get('extraClasses')
        })

        it('should log a warning', function () {
          const msg = 'Warning: The `design` property takes precedence over `size` and `priority`.'
          expect(Logger.warn).to.have.been.calledWith(msg)
        })

        it('should still include the design class', function () {
          expect(extraClasses).to.include('app-bar')
        })
      })
    })

    describe('When "vertical" is true', function () {
      beforeEach(function () {
        component.set('vertical', true)
      })

      it('should include "vertical" class', function () {
        expect(component.get('extraClasses')).to.include('vertical')
      })
    })

    describe('When "vertical" is false', function () {
      beforeEach(function () {
        component.set('vertical', false)
      })

      it('should not include "vertical" class', function () {
        expect(component.get('extraClasses')).not.to.include('vertical')
      })
    })

    describe('when "size", "priority", and "vertical" are all set', function () {
      let extraClasses, priority, size
      beforeEach(function () {
        priority = 'primary'
        size = 'medium'
        component.setProperties({
          priority,
          size,
          vertical: true
        })

        extraClasses = component.get('extraClasses')
      })

      it('should include the "priority" class', function () {
        expect(extraClasses).to.include(priority)
      })

      it('should include the "size" class', function () {
        expect(extraClasses).to.include(size)
      })

      it('should include the "vertical" class', function () {
        expect(extraClasses).to.include('vertical')
      })
    })
  })
})
