/* global visit, andThen, currentPath, capture, $ */

import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import Ember from 'ember'
const {run} = Ember

describe('Acceptance: Application', function () {
  let application

  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    run(application, 'destroy')
  })

  it('can visit /', function () {
    visit('/')

    andThen(function () {
      expect(currentPath()).to.equal('demo')
    })
  })
  it('can visit /palette', function () {
    visit('/palette')

    andThen(function () {
      expect(currentPath()).to.equal('palette')
      return capture('palette', $('#ember-testing').width(), $('#ember-testing').height())
    })
  })
  it('can visit /typography', function () {
    visit('/typography')

    andThen(function () {
      expect(currentPath()).to.equal('typography')
      return capture('typography', $('#ember-testing').width(), $('#ember-testing').height())
    })
  })
  it('can visit /icons', function () {
    visit('/icons')

    andThen(function () {
      expect(currentPath()).to.equal('icons')
      return capture('icons', $('#ember-testing').width(), $('#ember-testing').height(), 0.00, true)
    })
  })
  it('can visit /area', function () {
    visit('/area')

    andThen(function () {
      expect(currentPath()).to.equal('area')
      return capture('area', $('#ember-testing').width(), $('#ember-testing').height())
    })
  })
  it('can visit /button', function () {
    visit('/button')

    andThen(function () {
      expect(currentPath()).to.equal('button')
      return capture('button', $('#ember-testing').width(), $('#ember-testing').height())
    })
  })
  it('can visit /checkbox', function () {
    visit('/checkbox')

    andThen(function () {
      expect(currentPath()).to.equal('checkbox')
      return capture('checkbox', $('#ember-testing').width(), $('#ember-testing').height())
    })
  })
  it('can visit /field', function () {
    visit('/field')

    andThen(function () {
      expect(currentPath()).to.equal('field')
      return capture('field', $('#ember-testing').width(), $('#ember-testing').height())
    })
  })
  it('can visit /password', function () {
    visit('/password')

    andThen(function () {
      expect(currentPath()).to.equal('password')
      return capture('password', $('#ember-testing').width(), $('#ember-testing').height())
    })
  })
  it('can visit /layout', function () {
    visit('/layout')

    andThen(function () {
      expect(currentPath()).to.equal('layout')
      return capture('layout', $('#ember-testing').width(), $('#ember-testing').height())
    })
  })
  it('can visit /link', function () {
    visit('/link')

    andThen(function () {
      expect(currentPath()).to.equal('link.index')
      return capture('link', $('#ember-testing').width(), $('#ember-testing').height())
    })
  })
})
