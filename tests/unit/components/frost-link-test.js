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
import SpreadMixin from 'ember-spread'

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
        component.get('routeNames'),
        'routeNames: []'
      ).to.eql([])

      expect(
        component.get('design'),
        'design: ""'
      ).to.eql('')

      expect(
        component.get('disabled'),
        'disabled: false'
      ).to.equal(false)

      expect(
        component.get('hook'),
        'hook: "undefined"'
      ).to.equal(undefined)

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

      expect(
        component.get('target'),
        'target: null'
      ).to.equal(null)

      expect(
        component.get('linkTitle'),
        'linkTitle: ""'
      ).to.eql('')

      expect(
        component.get('tabindex'),
        'tabindex: null'
      ).to.equal(null)
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.equal(true)

      expect(
        SpreadMixin.detect(component),
        'SpreadMixin Mixin is present'
      ).to.equal(true)
    })

    it('sets dependent keys correctly', function () {
      const extraClassesDependentKeys = [
        'design',
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
        ).to.equal(true)
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
          ).to.equal(true)
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
          ).to.equal(true)
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
          ).to.equal(true)
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

      it('sets "inline" class', function () {
        const design = 'inline'

        run(() => component.set('design', design))

        expect(
          component.get('extraClasses'),
          'extraClasses: "inline"'
        ).to.eql('inline')
      })
    })

    describe('_shouldOpenInSameTab()', function () {
      it('should not open in same tab when priority="primary" and disabled=false', function () {
        const priority = 'primary'

        run(() => {
          component.set('priority', priority)
        })

        const shouldOpenInSameTab = component._shouldOpenInSameTab()

        expect(
          shouldOpenInSameTab,
          'should return "false"'
        ).to.eql(false)
      })

      it('should open in same tab when priority="primary" and disabled=true', function () {
        const disabled = true
        const priority = 'primary'

        run(() => {
          component.set('disabled', disabled)
          component.set('priority', priority)
        })

        const shouldOpenInSameTab = component._shouldOpenInSameTab()

        expect(
          shouldOpenInSameTab,
          'should return "true"'
        ).to.eql(true)
      })
    })

    describe('_hasMultipleLinks()', function () {
      it('should return true when routeNames is set', function () {
        const routeNames = ['route1', 'route2']

        run(() => {
          component.set('routeNames', routeNames)
        })

        const hasMultipleLinks = component._hasMultipleLinks()

        expect(
          hasMultipleLinks,
          'should return "true"'
        ).to.eql(true)
      })

      it('should return false when routeNames is not set or empty', function () {
        const routeNames = []

        run(() => {
          component.set('routeNames', routeNames)
        })

        const hasMultipleLinks = component._hasMultipleLinks()

        expect(
          hasMultipleLinks,
          'should return "false"'
        ).to.eql(false)
      })
    })

    describe('_setupRouting()', function () {
      it('do nothing when opening a new tab is not necessary', function () {
        const href = 'my-url'

        run(() => {
          component.set('href', href)
          component.set('_shouldOpenInSameTab', function () { return true })
        })

        component._setupRouting()

        expect(
          component.get('href'),
          'href should not be changed'
        ).to.eql(href)
      })

      it('set "target" when "_hasMultipleLinks" returns false', function () {
        run(() => {
          component.set('_shouldOpenInSameTab', function () { return false })
          component.set('_hasMultipleLinks', function () { return false })
        })

        component._setupRouting()

        expect(
          component.get('target'),
          '"target" is set to "_blank"'
        ).to.eql('_blank')
      })

      it('set "params"=currentRoute and "href"=null when has multiple routes', function () {
        const currentRoute = 'my-route'

        run(() => {
          component.set('_routing', { currentRouteName: currentRoute })
          component.set('params', [])
          component.set('href', 'my-url')
          component.set('_shouldOpenInSameTab', function () { return false })
          component.set('_hasMultipleLinks', function () { return true })
        })

        component._setupRouting()

        expect(
          component.get('params.0'),
          '"params" is set with the current route'
        ).to.eql(currentRoute)

        expect(
          component.get('href'),
          '"href" is set to null'
        ).to.equal(null)
      })

      describe('display warning on _setupRouting', function () {
        let EmberLoggerSpy

        beforeEach(function () {
          EmberLoggerSpy = sinon.spy(Ember.Logger, 'warn')
        })

        afterEach(function () {
          Ember.Logger.warn.restore()
        })

        it('user is getting a warning message when "routeNames" and "routeName" are set', function () {
          const routeNames = ['route1']
          const routeName = 'route1'

          run(() => {
            component.set('routeNames', routeNames)
            component.set('routeName', routeName)
            component.set('_shouldOpenInSameTab', function () { return false })
            component.set('_hasMultipleLinks', function () { return true })
          })

          component._setupRouting()

          expect(
            EmberLoggerSpy.called,
            'Ember.Logger.warn is called with warn message'
          ).to.equal(true)
        })
      })
    })

    describe('_openLinks()', function () {
      let WindowOpenStub
      let EmberLoggerSpy

      beforeEach(function () {
        WindowOpenStub = sinon.stub(window, 'open', function () { return null })
        EmberLoggerSpy = sinon.spy(Ember.Logger, 'warn')
      })

      afterEach(function () {
        window.open.restore()
        Ember.Logger.warn.restore()
      })

      it('do nothing when "routeNames" is empty', function () {
        const routeNames = []

        run(() => {
          component.set('routeNames', routeNames)
        })

        component._openLinks()

        expect(
          WindowOpenStub.called,
          'window.open is not called'
        ).to.equal(false)
      })

      it('call "window.open" when "routeNames" is not empty', function () {
        const routeNames = ['route1']

        run(() => {
          component.set('routeNames', routeNames)
        })

        component._openLinks()

        expect(
          WindowOpenStub.called,
          'window.open is called'
        ).to.equal(true)
      })

      it('user get warning message when call "window.open" and that pop-ups blocker is enable', function () {
        const routeNames = ['route1']

        run(() => {
          component.set('routeNames', routeNames)
        })

        component._openLinks()

        expect(
          EmberLoggerSpy.called,
          'Ember.Logger.warn is called with warn message'
        ).to.equal(true)
      })
    })

    describe('click()', function () {
      let openLinksSpy

      beforeEach(function () {
        openLinksSpy = sinon.spy(component, '_openLinks')
      })

      afterEach(function () {
        openLinksSpy.restore()
      })

      it('call "_openLinks" when there is multiple links', function () {
        run(() => {
          component.set('_hasMultipleLinks', function () { return true })
        })

        component.click()

        expect(
          openLinksSpy.called,
          '_openLinks is called'
        ).to.equal(true)
      })
    })
  }
)
