import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'

describe('Acceptance | link', function () {
  let application

  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    destroyApp(application)
  })

  it('can visit /link', function () {
    visit('/link')

    andThen(function () {
      expect(currentURL()).to.equal('/link')

      expect(
        find('#frost-link-spread').attr('href'),
        'href is set'
      ).to.eql('/link/min')
    })
  })
})
