import Ember from 'ember'
const {run} = Ember
import {afterEach, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import startApp from '../helpers/start-app'

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
    })
  })
  it('can visit /typography', function () {
    visit('/typography')

    andThen(function () {
      expect(currentPath()).to.equal('typography')
    })
  })
  it('can visit /icons', function () {
    visit('/icons')

    andThen(function () {
      expect(currentPath()).to.equal('icons')
    })
  })
  it('can visit /area', function () {
    visit('/area')

    andThen(function () {
      expect(currentPath()).to.equal('area')
    })
  })
  it('can visit /button', function () {
    visit('/button')

    andThen(function () {
      expect(currentPath()).to.equal('button')
    })
  })
  it('can visit /checkbox', function () {
    visit('/checkbox')

    andThen(function () {
      expect(currentPath()).to.equal('checkbox')
    })
  })
  it('can visit /field', function () {
    visit('/field')

    andThen(function () {
      expect(currentPath()).to.equal('field')
    })
  })
  it('can visit /password', function () {
    visit('/password')

    andThen(function () {
      expect(currentPath()).to.equal('password')
    })
  })
  it('can visit /layout', function () {
    visit('/layout')

    andThen(function () {
      expect(currentPath()).to.equal('layout')
    })
  })
  it('can visit /link', function () {
    visit('/link')

    andThen(function () {
      expect(currentPath()).to.equal('link.index')
    })
  })
})
