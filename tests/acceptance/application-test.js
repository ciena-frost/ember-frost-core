import {afterEach, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import destroyApp from '../helpers/destroy-app'
import startApp from '../helpers/start-app'

describe('Acceptance: Application', function () {
  let application

  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    destroyApp(application)
  })

  describe('visit /', function () {
    beforeEach(function () {
      return visit('/')
    })

    it('redirects to /demo', function () {
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

        it('does not redirect', function () {
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
