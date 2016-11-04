/**
 * Blueprint for generating the re-export of a component in an app context
 * NOTE: this is run in node, not in ember stack, so limited es6 is available
 * Pretty much taken outright from https://github.com/emberjs/ember.js/blob/master/blueprints/component-addon/index.js
 */

'use strict'

const getPathOption = require('ember-cli-get-component-path-option')
const stringUtil = require('ember-cli-string-utils')
const path = require('path')

const utils = require('../utils')

module.exports = {
  description: 'Generates a component. Name must contain a hyphen.',

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
       * @returns {String} the name of the component being generated
       */
      __name__ (options) {
        if (options.pod) {
          return 'component'
        }
        return options.dasherizedModuleName
      },

      /**
       * @param {Object} options - the options for the ember generate command
       * @returns {String} the root
       */
      __root__ (options) {
        if (options.inRepoAddon) {
          return path.join('lib', options.inRepoAddon, 'app')
        }
        return 'app'
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
    const addonRawName = options.inRepoAddon ? options.inRepoAddon : options.project.name()
    const addonName = stringUtil.dasherize(addonRawName)
    const fileName = stringUtil.dasherize(options.entity.name)
    let importPathName = [addonName, 'components', fileName].join('/')

    if (options.pod) {
      importPathName = [addonName, 'components', fileName, 'component'].join('/')
    }

    return {
      modulePath: importPathName,
      path: getPathOption(options)
    }
  },

  normalizeEntityName: utils.component.normalizeEntityName
}
