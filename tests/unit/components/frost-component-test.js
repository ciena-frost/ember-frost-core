/**
 * Unit test for the frost-component component
 */

import {expect} from 'chai'
import CssMixin from 'ember-frost-core/mixins/css'
import {HookMixin} from 'ember-hook'
import PropTypesMixin from 'ember-prop-types'
import SpreadMixin from 'ember-spread'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {beforeEach, describe, it} from 'mocha'

const test = unit('frost-component')
describe(test.label, function () {
  test.setup()

  let component

  describe('when created with only defaults', function () {
    beforeEach(function () {
      component = this.subject({
        hook: 'myComponent'
      })
    })

    it('should have the CssMixin', function () {
      expect(CssMixin.detect(component)).to.equal(true)
    })

    it('should have the HookMixin', function () {
      expect(HookMixin.detect(component)).to.equal(true)
    })

    it('should have the SpreadMixin', function () {
      expect(SpreadMixin.detect(component)).to.equal(true)
    })

    it('should have the PropTypesMixin', function () {
      expect(PropTypesMixin.detect(component)).to.equal(true)
    })

    const propTypeKeys = [
      'hook',
      'hookPrefix',
      'hookQualifiers',
      'actions',
      'ariaRole',
      'attributeBindings',
      // 'classNameBindings',
      // 'classNames',
      'concatenatedProperties',
      // 'element',
      // 'elementId',
      // 'isDestroyed',
      // 'isDestroying',
      'isVisible',
      'mergedProperties',
      'layout',
      'positionalParams',
      'tagName'
    ]

    describe('propTypes property', function () {
      let keys
      beforeEach(function () {
        // aggregate all keys from concatenated property
        keys = []
        component.get('propTypes').forEach((types) => {
          keys = keys.concat(Object.keys(types))
        })
      })

      propTypeKeys.forEach((key) => {
        it(`should have the "${key}" key`, function () {
          expect(keys).to.include(key)
        })
      })
    })
  })

  describe('when created with a hook property', function () {
    beforeEach(function () {
      component = this.subject({hook: 'myHook'})
    })

    it('should initialize the hookPrefix to equal the hook', function () {
      expect(component.get('hookPrefix')).to.equal('myHook')
    })
  })

  describe('when created with both a hook property and a hookPrefix', function () {
    beforeEach(function () {
      component = this.subject({hook: 'myHook', hookPrefix: 'myHookPrefix'})
    })

    it('should leave the hookPrefix alone', function () {
      expect(component.get('hookPrefix')).to.equal('myHookPrefix')
    })
  })
})
