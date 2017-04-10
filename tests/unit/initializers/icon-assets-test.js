import { expect } from 'chai'
import Ember from 'ember'
import { describe, it, beforeEach, afterEach } from 'mocha'
import destroyApp from '../../helpers/destroy-app'
import { initialize } from 'dummy/initializers/icon-assets'

describe('Unit | Initializer | icon assets', function () {
  let application

  beforeEach(function () {
    Ember.run(function () {
      application = Ember.Application.create()
      application.deferReadiness()
    })
  })

  afterEach(function () {
    destroyApp(application)
  })

  // TODO: Add real tests
  it('works', function () {
    initialize(application)
    expect(true).to.equal(true)
  })
})
