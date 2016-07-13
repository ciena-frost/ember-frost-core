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
  it('can visit /palette', function (done) {
    visit('/palette')

    andThen(function () {
      expect(currentPath()).to.equal('palette')
      capture('palette', $('#ember-testing').width(), $('#ember-testing').height()).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /typography', function (done) {
    visit('/typography')

    andThen(function () {
      expect(currentPath()).to.equal('typography')
      return capture('typography', $('#ember-testing').width(), $('#ember-testing').height()).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /icons', function (done) {
    visit('/icons')
    this.timeout(5000)
    andThen(function () {
      expect(currentPath()).to.equal('icons')
      return capture('icons', $('#ember-testing').width(), $('#ember-testing').height(), 0.00, true).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /area', function (done) {
    visit('/area')

    andThen(function () {
      expect(currentPath()).to.equal('area')
      return capture('area', $('#ember-testing').width(), $('#ember-testing').height()).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /button', function (done) {
    visit('/button')

    andThen(function () {
      expect(currentPath()).to.equal('button')
      return capture('button', $('#ember-testing').width(), $('#ember-testing').height()).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /checkbox', function (done) {
    visit('/checkbox')

    andThen(function () {
      expect(currentPath()).to.equal('checkbox')
      return capture('checkbox', $('#ember-testing').width(), $('#ember-testing').height()).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /field', function (done) {
    visit('/field')

    andThen(function () {
      expect(currentPath()).to.equal('field')
      return capture('field', $('#ember-testing').width(), $('#ember-testing').height()).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /password', function (done) {
    visit('/password')

    andThen(function () {
      expect(currentPath()).to.equal('password')
      return capture('password', $('#ember-testing').width(), $('#ember-testing').height()).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /layout', function (done) {
    visit('/layout')

    andThen(function () {
      expect(currentPath()).to.equal('layout')
      return capture('layout', $('#ember-testing').width(), $('#ember-testing').height()).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /link', function (done) {
    visit('/link')

    andThen(function () {
      expect(currentPath()).to.equal('link.index')
      return capture('link', $('#ember-testing').width(), $('#ember-testing').height()).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
})
