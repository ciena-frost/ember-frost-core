import destroyApp from '../helpers/destroy-app'
import startApp from '../helpers/start-app'
import { expect } from 'chai'
import { describe, it, beforeEach, afterEach } from 'mocha'

describe('Acceptance | link', function () {
  let application

  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    destroyApp(application)
  })

  describe('when rendering a link using spread options', function () {
    beforeEach(function () {
      visit('/link')
    })

    it('should set the href', function () {
      expect(
        find('#spread-basic').attr('href'),
        'href is set'
      ).to.eql('/link/min')
    })
  })

  describe('when clicking a link using spread options', function () {
    beforeEach(function () {
      visit('/link')
      click('#spread-basic')
    })

    it('should transition', function () {
      expect(currentURL()).to.eql('/link/min')
    })
  })

  describe('when clicking a link using spread options and a model', function () {
    beforeEach(function () {
      visit('/link')
      click('#spread-model-object')
    })

    it('should transition and pass the model to the route', function () {
      expect(currentURL()).to.eql('/link/first/3')
      expect(find('#first-text').text().trim()).to.eql('First : custom first')
    })
  })

  describe('when clicking a link using spread options and multiple model', function () {
    beforeEach(function () {
      visit('/link')
      click('#spread-nested-model-object')
    })

    it('should transition and pass the models to each route in the chain', function () {
      expect(currentURL()).to.eql('/link/first/3/second/4')
      expect(find('#first-text').text().trim()).to.eql('First : custom first')
      expect(find('#second-text').text().trim()).to.eql('Second : custom second')
    })
  })

  describe('when clicking a link using spread options, a model and query params', function () {
    beforeEach(function () {
      visit('/link')
      click('#spread-query-params')
    })

    it('should transition and pass the models and query params to the route', function () {
      expect(currentURL()).to.eql('/link/first/3?foo=bar')
      expect(find('#first-text').text().trim()).to.eql('First : custom first ?foo=bar')
    })
  })
})
