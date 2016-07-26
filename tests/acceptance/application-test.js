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
  this.timeout(10000)
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
      capture('palette', {width: $('#ember-testing').width(),
       height: $('#ember-testing').height()}).then(function (data) {
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
      capture('typography', {width: $('#ember-testing').width(), height: $('#ember-testing').height()}).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
  it('can visit /icons', function (done) {
    visit('/icons')
    andThen(function () {
      expect(currentPath()).to.equal('icons')
      capture('icons', {width: 1000, height: 6000, experimentalSvgs: true}).then(function (data) {
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
      capture('area', {width: 1000, height: $('#ember-testing').height()}).then(function (data) {
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
      capture('button', {width: 1000, height: $('#ember-testing').height(),
       experimentalSvgs: true}).then(function (data) {
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
      capture('checkbox', {width: 1000, height: $('#ember-testing').height()}).then(function (data) {
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
      capture('field', {width: 1000, height: $('#ember-testing').height()}).then(function (data) {
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
      capture('password', {width: 1000, height: $('#ember-testing').height()}).then(function (data) {
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
      capture('layout', {width: $('#ember-testing').width(), height: $('#ember-testing').height()}).then(function (data) {
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
      capture('link', {width: 1000, height: $('#ember-testing').height()}).then(function (data) {
        console.log(arguments)
        done()
      }).catch(function (err) {
        done(err)
      })
    })
  })
})
