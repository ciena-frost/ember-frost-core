/**
 * Shared functions used in multiple blueprints
 */

'use strict'

const Bluebird = require('bluebird')
const normalizeEntityName = require('ember-cli-normalize-entity-name')
const validComponentName = require('ember-cli-valid-component-name')
const fs = require('fs-extra-promise').usePromise(Bluebird)
const path = require('path')

module.exports = {
  component: {
    fileMapTokens: {
      /**
       * @param {Object} options - the options for the ember generate command
       * @returns {String} the path for the component being generated
       */
      path (options) {
        if (options.pod) {
          return path.join(options.podPath, options.locals.path, options.dasherizedModuleName)
        }
        return 'components'
      }
    },

    /**
     * Blueprint hook
     * @see {@link https://ember-cli.com/extending/#normalizeentityname}
     * @param {String} entityName - the requested name
     * @returns {String} the normalized, validated entity name (must be a valid component name)
     */
    normalizeEntityName (entityName) {
      entityName = normalizeEntityName(entityName)
      return validComponentName(entityName)
    }
  },

  packages: {
    /**
     * Update the package.json file with the desired version number (keep semver range format).
     * @param {Object[]} packages - a list of packages
     * @returns {Promise} a promise to update the package file
     */
    updatePkgJsonFile (packages) {
      const path = this.path + '/package.json'
      delete require.cache[require.resolve(path)]
      const pkgJson = require(path)
      if (pkgJson && pkgJson.devDependencies) {
        packages.forEach((pkg) => {
          pkgJson.devDependencies[pkg.name] = pkg.target
        })
        return fs.outputJsonAsync(path, pkgJson)
      }
    }
  }
}
