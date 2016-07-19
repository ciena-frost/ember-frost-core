/*
 Based on the textarea field, the URL input field consists of an input field and a button.
 The component is used to verify that teh provided URL is both valid and accessible.

 After clicking the 'Test' button, the entered URL is loosely verified to be correctly formatted.
 An AJAX GET request is then sent (with JSONP to overcome cross-domain problems) to the destination URL.
 The response is checked with any status code between 100 and 500, except 404, deemed a success.

 Should MIME Checking be enabled and the Type set to 'Text',
 it is possible that an error be thrown when using Chrome
 */

import Ember from 'ember'
const {Component} = Ember
import layout from '../templates/components/frost-url-input'

// Override Lint checking problem for undefined $
/* global $ */

export default Component.extend({
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNames: ['frost-url-input'],

  error: false,
  isLoading: false,
  success: false,
  undetermined: false,
  urlFormatError: false,
  placeholder: 'Enter URL',

  layout,

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  // ==========================================================================
  // Functions
  // ==========================================================================

  // ==========================================================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================

  actions: {

    test: function (host) {
      // Verify URL - potentially change to a solid regex in the future
      if ((!host) || (!host.toLowerCase().startsWith('http://')) && (!host.toLowerCase().startsWith('https://'))) {
        this.set('urlFormatError', true)
        return
      }

      this.send('clear')
      this.set('isLoading', true)

      let that = this

      // Not using Ember AJAX as it throws unrecoverable error when JSONP is not supported by the server
      $.ajax({
        url: host,
        crossDomain: true,
        dataType: 'jsonp text',
        jsonp: false,
        timeout: 10000,
        status: function (data) {
          that.set('isLoading', false)
          that.set('success', true)
        },
        error: function (e) {
          that.set('isLoading', false)

          let httpStatusCode = e.status
          // JSONP not supported by server

          if (httpStatusCode === 404) {
            that.set('error', true)
          } else if ((httpStatusCode >= 100) && (httpStatusCode < 500)) {
            that.set('success', true)
          } else {
            that.set('undetermined', true)
          }
        }
      })
    },

    clear: function () {
      this.setProperties({'isLoading': false, 'success': false, 'error': false, 'undetermined': false,
        'urlFormatError': false})

      this.set('value', '')
      this.$('text').focus()
      this.$('text').val('')
      this.$('textarea').trigger('input')
    }

  }
})
