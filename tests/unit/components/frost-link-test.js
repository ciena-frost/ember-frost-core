import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import {
  afterEach,
  beforeEach,
  describe,
  it
} from 'mocha'
import PropTypeMixin from 'ember-prop-types'
import sinon from 'sinon'

describeComponent(
  'frost-link',
  'Unit: FrostLinkComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-link', function () {
      expect(component.classNames).to.include('frost-link')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('design'),
        'design: ""'
      ).to.eql('')

      expect(
        component.get('hook'),
        'hook: "undefined"'
      ).to.be.undefined

      expect(
        component.get('icon'),
        'icon: ""'
      ).to.eql('')

      expect(
        component.get('priority'),
        'priority: ""'
      ).to.eql('')

      expect(
        component.get('size'),
        'size: ""'
      ).to.eql('')
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true
    })

    it('sets dependent keys correctly', function () {
      const extraClassesDependentKeys = [
        'design',
        'disabled',
        'priority',
        'size'
      ]

      expect(
        component.extraClasses._dependentKeys,
        'Dependent keys are correct for extraClasses()'
      ).to.eql(extraClassesDependentKeys)
    })

    describe('"extraClasses" computed property', function () {
      it('calls addDesignClass to set the design class', function () {
        const addDesignClassSpy = sinon.spy(component, 'addDesignClass')
        const design = 'info-bar'
        const testArray = [ design ]

        run(() => {
          component.set('design', design)
        })

        const extraClasses = component.get('extraClasses')

        expect(
          extraClasses,
          'extraClasses: "info-bar"'
        ).to.eql('info-bar')

        expect(
          addDesignClassSpy.calledWith(design, testArray),
          'addDesignClass method called'
        ).to.be.true
      })

      describe('display warning on design property', function () {
        const design = 'info-bar'
        const priority = 'primary'
        const size = 'medium'
        let EmberLoggerSpy

        beforeEach(function () {
          EmberLoggerSpy = sinon.spy(Ember.Logger, 'warn')
        })

        afterEach(function () {
          Ember.Logger.warn.restore()
        })

        it('is used with "priority" property', function () {
          run(() => {
            component.set('design', design)
            component.set('priority', priority)
          })

          component.get('extraClasses')

          expect(
            EmberLoggerSpy.called,
            'Ember.Logger.warn is called with warn message'
          ).to.be.true
        })

        it('is used with "size" property', function () {
          run(() => {
            component.set('design', design)
            component.set('size', size)
          })

          component.get('extraClasses')

          expect(
            EmberLoggerSpy.called,
            'Ember.Logger.warn is called with warn message'
          ).to.be.true
        })

        it('is used with "priority" and "size" properties', function () {
          run(() => {
            component.set('design', design)
            component.set('priority', priority)
            component.set('size', size)
          })

          component.get('extraClasses')

          expect(
            EmberLoggerSpy.called,
            'Ember.Logger.warn is called with warn message'
          ).to.be.true
        })
      })

      it('concatenates the classes when size and priority are set', function () {
        const priority = 'primary'
        const size = 'medium'

        run(() => {
          component.set('size', size)
          component.set('priority', priority)
        })

        expect(
          component.get('extraClasses'),
          '"extraClasses" is concatenated correctly'
        ).to.eql('medium primary')
      })

      describe('size class', function () {
        const validSizes = [
          {in: 'large', out: 'large'},
          {in: 'medium', out: 'medium'},
          {in: 'small', out: 'small'}
        ]

        validSizes.forEach((test) => {
          it(`includes "${test.out}" when size="${test.in}" is passed in`, function () {
            run(() => component.set('size', test.in))

            expect(
              component.get('extraClasses'),
              `extraClasses: "${test.out}"`
            ).to.eql(test.out)
          })
        })
      })

      describe('priority class', function () {
        const validPriorities = [
          {in: 'primary', out: 'primary'},
          {in: 'secondary', out: 'secondary'}
        ]

        validPriorities.forEach((test) => {
          it(`includes "${test.out}" when priority="${test.in}" is passed in`, function () {
            run(() => component.set('priority', test.in))

            expect(
              component.get('extraClasses'),
              `extraClasses: "${test.out}"`
            ).to.eql(test.out)
          })
        })
      })
    })

    describe('addDesignClass()', function () {
      it('sets "info-bar" class', function () {
        const design = 'info-bar'

        run(() => component.set('design', design))

        expect(
          component.get('extraClasses'),
          'extraClasses: "info-bar"'
        ).to.eql('info-bar')
      })

      it('sets "in-line" class', function () {
        const design = 'inline'

        run(() => component.set('design', design))

        expect(
          component.get('extraClasses'),
          'extraClasses: "in-line"'
        ).to.eql('in-line')
      })
    })

    describe('_setTarget()', function () {
      it('sets target to "_blank" when priority="primary" and disabled=false', function () {
        const priority = 'primary'

        run(() => {
          component.set('priority', priority)
        })

        component._setTarget()

        expect(
          component.get('target'),
          '"target" is set to "_blank"'
        ).to.eql('_blank')
      })

      it('does not set target when priority="primary" and disabled=true', function () {
        const disabled = true
        const priority = 'primary'

        run(() => {
          component.set('disabled', disabled)
          component.set('priority', priority)
        })

        component._setTarget()

        expect(
          component.get('target'),
          '"target" is null'
        ).to.be.null
      })
    })
  }
)
