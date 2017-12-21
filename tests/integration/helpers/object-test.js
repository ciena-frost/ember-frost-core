/**
 * Integration test for the object-helper component
 */

import {expect} from 'chai'
import Ember from 'ember'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'
const {Component, run, set} = Ember
const test = integration('object')
describe('Integration | Helper | object', function () {
  test.setup()

  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should return a object with the right key-value', function () {
    this.render(hbs`{{#with (object name=\"Sergio\") as |person|}}{{person.name}}{{/with}}`)

    expect(this.$().text().trim()).to.be.equal('Sergio')
  })

  it('should have more than one key-value', function () {
    this.render(hbs`{{#with (object name="Sergio" lastName="Arbeo") as |person|}}
    {{person.name}} {{person.lastName}}{{/with}}`)

    expect(this.$().text().trim()).to.be.equal('Sergio Arbeo')
  })

  it('should bind values when variables are used,', function () {
    this.set('model', {
      firstName: 'Marisa'
    })
    this.render(hbs`{{#with (object name=model.firstName lastName="Arbeo") as |person|}}
    {{person.name}} {{person.lastName}}{{/with}}`)

    expect(this.$().text().trim()).to.be.equal('Marisa Arbeo')

    this.set('model.firstName', 'Sergio')

    expect(this.$().text().trim()).to.be.equal('Sergio Arbeo')

    this.set('model', {firstName: 'Marisa'})

    expect(this.$().text().trim()).to.be.equal('Marisa Arbeo')
  })

  it('should bind multiple values when variables are used', function () {
    this.set('model', {
      firstName: 'Marisa',
      lastName: 'Arbeo'
    })
    this.render(hbs`{{#with (object name=model.firstName lastName=model.lastName) as |person|}}
    {{person.name}} {{person.lastName}}{{/with}}`)

    expect(this.$().text().trim()).to.be.equal('Marisa Arbeo')

    this.set('model.firstName', 'Sergio')

    expect(this.$().text().trim()).to.be.equal('Sergio Arbeo')

    this.set('model.lastName', 'Smith')

    expect(this.$().text().trim()).to.be.equal('Sergio Smith')

    this.set('model', {
      firstName: 'Marisa',
      lastName: 'Arbeo'
    })

    expect(this.$().text().trim()).to.be.equal('Marisa Arbeo')
  })

  it('should be to have nested object helpers', function () {
    this.set('model', {firstName: 'Balint'})
    this.render(hbs`{{#with (object person=(object name=model.firstName)) as |ctx|}}{{ctx.person.name}}{{/with}}`)

    expect(this.$().text().trim()).to.be.equal('Balint')

    expect(this.$().text().trim()).to.be.equal('Balint')

    this.set('model.firstName', 'Chad')

    expect(this.$().text().trim()).to.be.equal('Chad')

    this.set('model', {firstName: 'Balint'})

    expect(this.$().text().trim()).to.be.equal('Balint')
  })

  describe('components', function () {
    let fooBarInstance

    beforeEach(function () {
      let FooBarComponent = Component.extend({
        layout: hbs`{{yield (object firstName=model.firstName lastName=lastName)}}`,
        model: {firstName: 'Chad'},
        init () {
          this._super(...arguments)
          fooBarInstance = this
        }
      })
      this.register('component:foo-bar', FooBarComponent)
    })
    it('should yield object of internal properties', function (done) {
      this.render(hbs`{{#foo-bar as |values|}}{{values.firstName}}{{/foo-bar}}`)

      expect(this.$().text().trim()).to.be.equal('Chad')
      let self = this
      run(function () {
        set(fooBarInstance, 'model.firstName', 'Godfrey')
        run.next(function () {
          expect(self.$().text().trim()).to.be.equal('Godfrey')
          run(function () {
            set(fooBarInstance, 'model.firstName', 'Chad')
            run.next(function () {
              expect(self.$().text().trim()).to.be.equal('Chad')
              done()
            })
          })
        })
      })
    })

    it('should yield object of internal and external properties', function (done) {
      this.set('model', {lastName: 'Hietala'})
      this.render(hbs`{{#foo-bar lastName=model.lastName as |values|}}
      {{values.firstName}} {{values.lastName}}{{/foo-bar}}`)

      expect(this.$().text().trim()).to.be.equal('Chad Hietala')

      expect(this.$().text().trim()).to.be.equal('Chad Hietala')
      let self = this
      run(function () {
        set(fooBarInstance, 'model.firstName', 'Godfrey')
        self.set('model.lastName', 'Chan')
        run.next(function () {
          expect(self.$().text().trim()).to.be.equal('Godfrey Chan')
          run(function () {
            set(fooBarInstance, 'model', {firstName: 'Chad'})
            self.set('model', {lastName: 'Hietala'})
            run.next(function () {
              expect(self.$().text().trim()).to.be.equal('Chad Hietala')
              done()
            })
          })
        })
      })
    })

    /*
    * ewhite 21/12/2017
    * Added test to check when updating value array's toString for asserts does not throw error because hash doesn't have a toString method
    * Example: https://ember-twiddle.com/2260b80be13a1d6ca5e59c99c40ec51a?openFiles=templates.application.hbs%2C
    * Issue: https://github.com/emberjs/ember.js/issues/14738
    * Cause: https://github.com/emberjs/ember.js/blob/v2.12.2/packages/ember-metal/lib/property_set.js#L45
    */
    it('should not throw error when updating value', function () {
      this.set('model', {
        lastName: 'Arbeo'
      })
      this.render(hbs`{{#foo-bar lastName=model.lastName foo=(array (object name=model.firstName)) as |values|}}
      {{values.firstName}} {{values.lastName}}{{/foo-bar}}`)

      expect(this.$().text().trim()).to.be.equal('Chad Arbeo')

      this.set('model.lastName', 'Sergio')

      expect(this.$().text().trim()).to.be.equal('Chad Sergio')
    })
  })
})
