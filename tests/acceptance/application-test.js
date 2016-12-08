import {expect} from 'chai'
import {after, before, beforeEach, describe, it} from 'mocha'
import destroyApp from '../helpers/destroy-app'
import startApp from '../helpers/start-app'

describe('Acceptance: Application', function () {
  let application

  before(function () {
    application = startApp()
  })

  after(function () {
    destroyApp(application)
  })

  describe('visit /', function () {
    beforeEach(function () {
      return visit('/')
    })

    it('redirects correct route', function () {
      expect(currentPath()).to.equal('demo')
    })
  })

  ;[
    'area',
    'button',
    'checkbox',
    'field',
    'icons',
    'layout',
    'palette',
    'password',
    'typography'
  ]
    .forEach((path) => {
      describe(`visit /${path}`, function () {
        beforeEach(function () {
          return visit(`/${path}`)
        })

        it('renders correct route', function () {
          expect(currentPath()).to.equal(path)
        })
      })
    })

  describe('visit /link', function () {
    beforeEach(function () {
      return visit('/link')
    })

    it('renders correct route', function () {
      expect(currentPath()).to.equal('link.index')
    })
  })
})
