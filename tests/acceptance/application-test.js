import {expect} from 'chai'
import Ember from 'ember'
import {after, before, beforeEach, describe, it} from 'mocha'

import destroyApp from '../helpers/destroy-app'
import startApp from '../helpers/start-app'

const {String: EmberString} = Ember

describe('Acceptance: Application', function () {
  let application

  this.timeout(5000)

  before(function () {
    application = startApp()
    server.loadFixtures()
  })

  after(function () {
    destroyApp(application)
    application = null
  })

  describe('visit /', function () {
    beforeEach(function () {
      return visit('/')
    })

    it('should have default title provided by frost-page-title', function () {
      expect(document.title).to.equal('ember-frost-core tests')
    })

    it('should redirect correct route', function () {
        console.log('fpt', document.title)
      expect(currentPath()).to.equal('demo')
    })
  })

  ;[
    'area',
    'bookends',
    'button',
    'checkbox',
    'field',
    'helpers',
    'icons',
    'layout',
    'loading',
    'palette',
    'password',
    'radio',
    'scroll',
    'select',
    'toggle',
    'typography'
  ]
    .forEach((path) => {
      describe(`visit /${path}`, function () {
        beforeEach(function () {
          return visit(`/${path}`)
        })

        it('should render correct route', function () {
          expect(currentPath()).to.equal(path)
        })
      })
    })

  describe('visit /link', function () {
    beforeEach(function () {
      return visit('/link')
    })

    it('should render correct route', function () {
      expect(currentPath()).to.equal('link.index')
    })
  })
})
