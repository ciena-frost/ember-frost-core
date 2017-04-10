'use strict'

const _chalk = require('chalk')
const _npm = require('./npm')
const _semver = require('semver')

module.exports = {
  /**
   * Get the packages to install. If a package is already installed, it will not required to be installed.
   * @param {Array} pkgs the packages that might need to be installed
   * @param {Object} consumerPackages the packages already installed in the consumer
   * @returns {Array} the packages to install
   */
  getPkgsToInstall: function (pkgs, consumerPackages) {
    const packagesVersionsPromise = this._getPackagesVersions(pkgs)
    return packagesVersionsPromise.then((results) => {
      const toInstall = []
      results.forEach(({pkg, result}) => {
        if (this._isPkgInstalled(pkg, result, consumerPackages)) {
          console.log(`${_chalk.green('Package already installed')} ${pkg.name}@${pkg.target}`)
        } else {
          toInstall.push(pkg)
        }
      })
      return toInstall
    })
  },

  /**
   * Returns true if a package is already installed and false otherwise.
   * @param {Object} pkg the package
   * @param {Array} availablePkgVersions the available versions of this package
   * @param {Object} consumerPackages the packages already installed in the consumer
   * @returns {Bool} true if the package is already installed and false otherwise
   */
  _isPkgInstalled: function (pkg, availablePkgVersions, consumerPackages) {
    const existingTarget = consumerPackages[pkg.name]

    if (!existingTarget) {
      return false
    }

    const isValidPkg = availablePkgVersions && availablePkgVersions.length > 0 && pkg.target

    if (isValidPkg) {
      const existingTargetVersion = this._getTargetVersion(existingTarget, availablePkgVersions)
      const targetVersion = this._getTargetVersion(pkg.target, availablePkgVersions)

      return existingTargetVersion >= targetVersion
    } else {
      console.error(`Invalid package ${pkg.name}@${pkg.target}`)
      return true
    }
  },

  /**
   * Get the available versions for each packages.
   * @param {Array} pkgs a list of the packages
   * @returns {Promise} a promise that will return all the available packages versions
   */
  _getPackagesVersions: function (pkgs) {
    return Promise.all(pkgs.reduce((promises, pkg) => {
      promises.push(_npm.getVersions(pkg))
      return promises
    }, []))
  },

  /**
   * Get the fixed package version.
   * @param {String} target the current version (might be a range)
   * @param {Array} availablePkgVersions the available versions
   * @returns {String} a fixed package version
   */
  _getTargetVersion (target, availablePkgVersions) {
    const validRange = _semver.validRange(target)
    let version
    if (validRange) {
      version = _semver.maxSatisfying(availablePkgVersions, target)
    } else {
      version = _semver.valid(target)
    }

    return version
  }
}
