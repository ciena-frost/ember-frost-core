/**
 * Unit test for the ehook helper
 */

import {expect} from 'chai'
import {ehook} from 'ember-frost-core/helpers/ehook'
import {beforeEach, describe, it} from 'mocha'

describe('Unit / Helper / ehook', function () {
  let result
  describe('when just a hook is given', function () {
    beforeEach(function () {
      result = ehook(['myHook'])
    })

    it('should construct the hook properly', function () {
      expect(result).to.equal('myHook&^%^&')
    })
  })

  describe('when a hook and qualifier attributes are given', function () {
    beforeEach(function () {
      result = ehook(['myHook'], {foo: 'bar', fizz: 'bang'})
    })

    it('should construct the hook properly', function () {
      expect(result).to.equal('myHook&^%^&fizz=bang&^%^&foo=bar&^%^&')
    })
  })

  describe('when a hook and qualifier object are given', function () {
    beforeEach(function () {
      result = ehook(['myHook', {foo: 'bar'}])
    })

    it('should construct the hook properly', function () {
      expect(result).to.equal('myHook&^%^&foo=bar&^%^&')
    })
  })

  describe('when a hook and bothe a qualifier object and qualifier objects are given', function () {
    beforeEach(function () {
    })

    it('should throw an error', function () {
      expect(function () {
        ehook(['myHook', {foo: 'bar'}], {fizz: 'bang'})
      }).to.throw(/Either provide your own qualifier object, or add attributes to the "hook" helper, not both/)
      expect(result).to.equal('myHook&^%^&foo=bar&^%^&')
    })
  })
})
