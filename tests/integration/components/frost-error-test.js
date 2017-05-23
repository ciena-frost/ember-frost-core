/**
 * Integration test for the frost-error component
 */

import {expect} from 'chai'
import {$hook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const test = integration('frost-error')
describe(test.label, function () {
  test.setup()
  describe('when hook is passed in', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-error
          hook="fe"
        }}
      `)
    })

    it('should add hook to description', function () {
      expect($hook('fe-description')).to.have.class('frost-error-description')
    })

    it('should add hook to suggestion', function () {
      expect($hook('fe-suggestion')).to.have.class('frost-error-suggestion')
    })

    it('should add hook to HTTP error', function () {
      expect($hook('fe-http-error')).to.have.class('frost-error-http-error')
    })

    it('should add hook to error message', function () {
      expect($hook('fe-message')).to.have.class('frost-error-message')
    })

    it('should add hook to hidden details component', function () {
      expect($hook('fe-expand')).to.have.class('frost-expand')
    })

    it('should add hook to hidden details text', function () {
      expect($hook('fe-details')).to.have.class('frost-error-details')
    })
  })

  describe('when setting properties', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-error
          hook='myError'
          description='Blue Planet is currently unavailable.'
          suggestion='Try again later.'
          errorCode=500
          errorTitle='Internal server error'
          errorMessage='Failure to retrieve network elements'
          errorDetails='Detailed information would be displayed here.'
        }}
      `)
    })

    it('should have the description text set correctly', function () {
      expect($hook('myError-description').text().trim()).to.equal('Blue Planet is currently unavailable.')
    })

    it('should have the suggestion text set correctly', function () {
      expect($hook('myError-suggestion').text().trim()).to.equal('Try again later.')
    })

    it('should have the error text set correctly', function () {
      expect($hook('myError-http-error').text().trim()).to.equal('Error 500 - Internal server error')
    })

    it('should have the server message text set correctly', function () {
      expect($hook('myError-message').text().trim()).to.equal('Failure to retrieve network elements')
    })

    it('should have the show details label text set correctly', function () {
      expect($hook('myError-expand-label-text').text().trim()).to.equal('Show details')
    })

    it('additional details should be collapsed', function () {
      expect(this.$('.frost-expand')).to.have.class('collapsed')
    })
  })

  describe('when expanding details', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-error
          hook='myError'
          description='Blue Planet is currently unavailable.'
          suggestion='Try again later.'
          errorCode=500
          errorTitle='Internal server error'
          errorMessage='Failure to retrieve network elements'
          errorDetails='Detailed information would be displayed here.'
        }}
      `)

      $hook('myError-expand-label').click()
    })

    it('additional details should be expanded', function () {
      expect($hook('myError-expand-label-text').text().trim()).to.equal('Hide details')
    })

    it('additional details text should be set correctly', function () {
      expect(this.$('.frost-expand')).to.have.class('expanded')
      expect($hook('myError-details').text().trim()).to.equal('Detailed information would be displayed here.')
    })
  })
})
