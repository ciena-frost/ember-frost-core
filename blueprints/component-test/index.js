/**
 * Blueprint for generating a test for a frost component
 * NOTE: this is run in node, not in ember stack, so limited es6 is available
 * Pretty much taken outright from https://github.com/emberjs/ember.js/blob/master/blueprints/component-test/index.js
 */

'use strict'

const getPathOption = require('ember-cli-get-component-path-option')
const stringUtil = require('ember-cli-string-utils')

const utils = require('../utils')

module.exports = {
  description: 'Generates a frost component integration or unit test using mocha.',

  availableOptions: [
    {
      name: 'test-type',
      type: ['integration', 'unit'],
      default: 'integration',
      aliases: [
        {'i': 'integration'},
        {'u': 'unit'},
        {'integration': 'integration'},
        {'unit': 'unit'}
      ]
    }
  ],

  /**
   * Blueprint hook
   * @see {@link https://ember-cli.com/extending/#filemaptokens}
   *
   * @returns {Object} custom tokens to be replaced in your files
   */
  fileMapTokens () {
    return {
      __path__: utils.component.fileMapTokens.path,

      /**
       * @param {Object} options - the options for the ember generate command
       * @returns {String} the type of test (unit|integration)
       */
      __testType__ (options) {
        return options.locals.testType || 'integration'
      }
    }
  },

  /**
   * Blueprint hook
   * @see {@link https://ember-cli.com/extending/#locals}
   * @param {Object} options - the options for the ember generate command
   * @returns {Object|Promise} a set of custom template variables or a Promise that resolves with the set
   */
  locals (options) {
    const dasherizedModuleName = stringUtil.dasherize(options.entity.name)
    let componentPathName = dasherizedModuleName
    const testType = options.testType || 'integration'

    if (options.pod && options.path !== 'components' && options.path !== '') {
      componentPathName = [options.path, dasherizedModuleName].join('/')
    }

    return {
      capitalizedTestType: stringUtil.capitalize(testType),
      componentPathName,
      path: getPathOption(options),
      testType
    }
  },

  normalizeEntityName: utils.component.normalizeEntityName
}
