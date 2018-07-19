/**
 * Integration test for the frost-error component
 */

import {expect} from 'chai'
import {$hook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const test = integration('frost-ajax-error-page')
describe(test.label, function () {
  test.setup()
  describe('when hook is passed in', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-ajax-error-page
          hook="fe"
          description=""
          errorCode=-1
          errorTitle=""
          errorMessage=""
          errorDetails=""
        }}
      `)
    })

    const componentClass = 'frost-ajax-error-page'
    const descriptionClass = componentClass + '-description'
    const suggestionClass = componentClass + '-suggestion'
    const httpErrorClass = componentClass + '-http-error'
    const errorMessageClass = componentClass + '-message'
    const frostExpandClass = 'frost-expand'
    const detailsClass = componentClass + '-details'

    it('should add hook to description', function () {
      expect($hook('fe-description')).to.have.class(descriptionClass)
    })

    it('should add hook to suggestion', function () {
      expect($hook('fe-suggestion')).to.have.class(suggestionClass)
    })

    it('should add hook to HTTP error', function () {
      expect($hook('fe-http-error')).to.have.class(httpErrorClass)
    })

    it('should add hook to error message', function () {
      expect($hook('fe-message')).to.have.class(errorMessageClass)
    })

    it('should add hook to hidden details component', function () {
      expect($hook('fe-expand')).to.have.class(frostExpandClass)
    })

    it('should add hook to hidden details text', function () {
      expect($hook('fe-details')).to.have.class(detailsClass)
    })
  })

  describe('when setting properties', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-ajax-error-page
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

    it('should collapse additional details', function () {
      expect(this.$('.frost-expand')).to.have.class('collapsed')
    })
  })

  describe('when expanding details', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-ajax-error-page
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

    it('should expaned additional details', function () {
      expect($hook('myError-expand-label-text').text().trim()).to.equal('Hide details')
    })

    it('should correctly set additional details text', function () {
      expect(this.$('.frost-expand')).to.have.class('expanded')
      expect($hook('myError-details').text().trim()).to.equal('Detailed information would be displayed here.')
    })
  })
})
