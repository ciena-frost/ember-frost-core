import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'
import Component from 'ember-frost-core/components/frost-component'

const test = unit('frost-external-link')
describe(test.label, function () {
  test.setup()

  let component, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = this.subject({
      hook: 'myLink'
    })
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should default tagName to a', function () {
    expect(component.get('tagName')).to.equal('a')
  })

  it('should default design to empty string', function () {
    expect(component.get('design')).to.equal('')
  })

  it('should default disabled to false', function () {
    expect(component.get('disabled')).to.equal(false)
  })

  it('should default href to empty string', function () {
    expect(component.get('href')).to.equal('')
  })

  it('should default icon to empty string', function () {
    expect(component.get('icon')).to.equal('')
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

  it('should extend the common frost component', function () {
    expect(component instanceof Component).to.equal(true)
  })

  describe('"target" computed property', function () {
    describe('when target is set', function () {
      beforeEach(function () {
        component.set('target', 'myTarget')
      })

      it('should be myTarget', function () {
        expect(component.get('target')).to.equal('myTarget')
      })
    })

    describe('when target is not set and priority is primary', function () {
      beforeEach(function () {
        component.set('priority', 'primary')
      })

      it('should be _blank', function () {
        expect(component.get('target')).to.equal('_blank')
      })
    })

    describe('when target is not set and priority is not primary', function () {
      beforeEach(function () {
        component.set('priority', 'secondary')
      })

      it('should be _self', function () {
        expect(component.get('target')).to.equal('_self')
      })
    })
  })

  describe('"extraClasses" computed property', function () {
    const validDesignClasses = [
      {in: 'info-bar', out: 'info-bar'},
      {in: 'inline', out: 'inline'}
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
      {in: 'secondary', out: 'secondary'}
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

        component.set('design', 'info-bar')
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
          expect(extraClasses).to.include('info-bar')
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
          expect(extraClasses).to.include('info-bar')
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
          expect(extraClasses).to.include('info-bar')
        })
      })
    })

    describe('when "size", "priority" are all set', function () {
      let extraClasses, priority, size
      beforeEach(function () {
        priority = 'primary'
        size = 'medium'
        component.setProperties({
          priority,
          size
        })

        extraClasses = component.get('extraClasses')
      })

      it('should include the "priority" class', function () {
        expect(extraClasses).to.include(priority)
      })

      it('should include the "size" class', function () {
        expect(extraClasses).to.include(size)
      })
    })
  })
})
