import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  afterEach,
  beforeEach,
  describe,
  it
} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-button',
  'Unit: FrostButtonComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-button', function () {
      expect(component.classNames).to.include('frost-button')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('tagName'),
        'tagName: "button"'
      ).to.eql('button')

      expect(
        component.get('autofocus'),
        'autofocus: false'
      ).to.be.false

      expect(
        component.get('design'),
        'design: ""'
      ).to.eql('')

      expect(
        component.get('disabled'),
        'disabled: false'
      ).to.be.false

      expect(
        component.get('hook'),
        'hook: "undefined"'
      ).to.be.undefined

      expect(
        component.get('icon'),
        'icon: ""'
      ).to.eql('')

      expect(
        component.get('pack'),
        'pack: "frost"'
      ).to.eql('frost')

      expect(
        component.get('priority'),
        'priority: ""'
      ).to.eql('')

      expect(
        component.get('size'),
        'size: ""'
      ).to.eql('')

      expect(
        component.get('text'),
        'text: ""'
      ).to.eql('')

      expect(
        component.get('title'),
        'title: null'
      ).to.be.null

      expect(
        component.get('type'),
        'type: "button"'
      ).to.eql('button')

      expect(
        component.get('vertical'),
        'vertical: false'
      ).to.be.false
    })

    it('sets dependent keys correctly', function () {
      const isTextOnlyDependentKeys = [
        'icon',
        'text'
      ]

      const isIconOnlyDependentKeys = [
        'icon',
        'text'
      ]

      const isIconAndTextDependentKeys = [
        'icon',
        'text'
      ]

      const extraClassesDependentKeys = [
        'design',
        'icon',
        'priority',
        'size',
        'text',
        'vertical'
      ]

      expect(
        component.isTextOnly._dependentKeys,
        'Dependent keys are correct for isTextOnly()'
      ).to.eql(isTextOnlyDependentKeys)

      expect(
        component.isIconOnly._dependentKeys,
        'Dependent keys are correct for isIconOnly()'
      ).to.eql(isIconOnlyDependentKeys)

      expect(
        component.isIconAndText._dependentKeys,
        'Dependent keys are correct for isIconAndText()'
      ).to.eql(isIconAndTextDependentKeys)

      expect(
        component.extraClasses._dependentKeys,
        'Dependent keys are correct for extraClasses()'
      ).to.eql(extraClassesDependentKeys)
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true
    })

    describe('"isTextOnly" computed property', function () {
      it('is set to "true" when "text" is set', function () {
        const text = 'text'

        run(() => component.set('text', text))

        expect(
          component.get('isTextOnly'),
          'isTextOnly: true'
        ).to.be.true
      })

      it('is set to "false" when "icon" and "text" are both set', function () {
        const icon = 'round-add'
        const text = 'text'

        run(() => {
          component.set('icon', icon)
          component.set('text', text)
        })

        expect(
          component.get('isTextOnly'),
          'isTextOnly: false'
        ).to.be.false
      })
    })

    describe('"isIconOnly" computed property', function () {
      it('is set to "true" when "icon" is set', function () {
        const icon = 'icon'

        run(() => component.set('icon', icon))

        expect(
          component.get('isIconOnly'),
          'isIconOnly: true'
        ).to.be.true
      })

      it('is set to "false" when "icon" and "text" are both set', function () {
        const icon = 'round-add'
        const text = 'text'

        run(() => {
          component.set('icon', icon)
          component.set('text', text)
        })

        expect(
          component.get('isIconOnly'),
          'isIconOnly: false'
        ).to.be.false
      })
    })

    describe('"isIconAndText" computed property', function () {
      it('is set to "false" when only "icon" is set', function () {
        const icon = 'icon'

        run(() => component.set('icon', icon))

        expect(
          component.get('isIconAndText'),
          'isIconAndText: false'
        ).to.be.false
      })

      it('is set to "false" when only "text" is set', function () {
        const text = 'text'

        run(() => component.set('text', text))

        expect(
          component.get('isIconAndText'),
          'isIconAndText: false'
        ).to.be.false
      })

      it('is set to "true" when "icon" and "text" are both set', function () {
        const icon = 'round-add'
        const text = 'text'

        run(() => {
          component.set('icon', icon)
          component.set('text', text)
        })

        expect(
          component.get('isIconAndText'),
          'isIconAndText: true'
        ).to.be.true
      })
    })

    describe('"extraClasses" computed property', function () {
      describe('design class', function () {
        const validDesignClasses = [
          {in: 'app-bar', out: 'app-bar'},
          {in: 'info-bar', out: 'info-bar'},
          {in: 'tab', out: 'tab'}
        ]

        validDesignClasses.forEach((test) => {
          it(`includes "${test.out}" when design="${test.in}" is passed in`, function () {
            const text = 'text'

            run(() => {
              component.set('design', test.in)
              component.set('text', text)
            })

            expect(
              component.get('extraClasses'),
              `extraClasses: "${test.out}"`
            ).to.eql(test.out)
          })
        })

        describe('"design" property must also have either "text" or "icon" set', function () {
          const design = 'app-bar'

          it('returns with no class set if either "text" or "icon" are not also set', function () {
            run(() => component.set('design', design))

            expect(
              component.get('extraClasses'),
              'Nothing is returned: must include either "text" or "icon"'
            ).to.be.undefined
          })

          it('calls Ember.Logger.error if either "text" or "icon" are not also set', function () {
            const EmberLoggerSpy = sinon.spy(Ember.Logger, 'error')

            run(() => component.set('design', design))

            component.get('extraClasses')

            expect(
              EmberLoggerSpy.called,
              'Ember.Logger.error is called with error message'
            ).to.be.true

            Ember.Logger.error.restore()
          })
        })

        describe('display warning on design property', function () {
          const design = 'app-bar'
          const priority = 'primary'
          const size = 'medium'
          const text = 'text'
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
              component.set('text', text)
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
              component.set('text', text)
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
              component.set('text', text)
            })

            component.get('extraClasses')

            expect(
              EmberLoggerSpy.called,
              'Ember.Logger.warn is called with warn message'
            ).to.be.true
          })
        })
      })

      it('concatenates the classes when size, priority and vertical are set', function () {
        const priority = 'primary'
        const size = 'medium'
        const vertical = true

        run(() => {
          component.set('size', size)
          component.set('priority', priority)
          component.set('vertical', vertical)
        })

        expect(
          component.get('extraClasses'),
          '"extraClasses" is concatenated correctly'
        ).to.eql('medium primary vertical')
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

      it('is set to "vertical" when "vertical=true" is passed in', function () {
        const vertical = true

        run(() => component.set('vertical', vertical))

        expect(
          component.get('extraClasses'),
          'extraClasses: "vertical"'
        ).to.eql('vertical')
      })

      it('calls addPriorityClass to set the priority class', function () {
        const addPriorityClassSpy = sinon.spy(component, 'addPriorityClass')
        const priority = 'primary'
        const testArray = [ priority ]

        run(() => {
          component.set('priority', priority)
        })

        const extraClasses = component.get('extraClasses')

        expect(
          extraClasses,
          'extraClasses: "primary"'
        ).to.eql('primary')

        expect(
          addPriorityClassSpy.calledWith(priority, testArray),
          'addPriorityClass method called'
        ).to.be.true
      })
    })

    describe('addPriorityClass', function () {
      it('adds class primary', function () {
        let testArray = []

        component.addPriorityClass('primary', testArray)

        expect(
          testArray,
          'addPriorityClass adds class primary'
        ).to.include('primary')
      })

      it('adds class secondary', function () {
        let testArray = []

        component.addPriorityClass('secondary', testArray)

        expect(
          testArray,
          'addPriorityClass adds class secondary'
        ).to.include('secondary')
      })

      it('adds class tertiary', function () {
        let testArray = []

        component.addPriorityClass('tertiary', testArray)

        expect(
          testArray,
          'addPriorityClass adds class tertiary'
        ).to.include('tertiary')
      })
    })
  }
)
