/* globals module */

// 'use strict'

const writeFile = require('broccoli-file-creator')
const Funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees')
const SVGStore = require('broccoli-svgstore')
const fs = require('fs')
const path = require('path')

/**
 * Creates an object composed of the object properties predicate returns truthy for. The predicate is invoked with two arguments: (value, key).
 * @param {Object} object - the source object
 * @param {Function} predicate - The function invoked per property
 * @returns {Object} Returns the new object
 */
function pickBy (object, predicate) {
  const result = {}

  Object.keys(object).forEach((key) => {
    const value = object[key]

    if (predicate(value, key)) {
      result[key] = value
    }
  })

  return result
}

/**
 * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place
 * @param {Object} object -  The object to query
 * @param {String} path - The path of the property to get
 * @param {*} defaultValue - The value returned for undefined resolved values
 * @returns {*} Returns the resolved value
 */
function get (object, path, defaultValue) {
  const segments = path.split('.')
  var result = object

  while (segments.length !== 0) {
    if (isObject(result)) {
      result = result[segments[0]]
    } else {
      result = undefined
    }

    segments.shift()
  }

  return result || defaultValue
}

/**
 * Checks if path is a direct property of object.
 * @param {Object} object - The object to query
 * @param {String} path - The path to check
 * @returns {Boolean} Returns true if path exists, else false
 */
function has (object, path) {
  return get(object, path) !== undefined
}

/**
 * Checks whether or not an object is a POJO
 * @param {*} object - Object to check
 * @returns {Boolean} Returns true if object is a POJO, else false
 */
function isObject (object) {
  return object !== null && typeof object === 'object'
}

/**
 * Default the babel options
 * @param {Object} options - the options for this build
 */
function defaultBabel (options) {
  options.babel = options.babel || {}
  options.babel.optional = options.babel.optional || []
}

module.exports = {
  name: 'ember-frost-core',

  included: function (app) {
    // Addons - see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      this.app = app = app.app
    }

    this._super.included(app)

    if (app) {
      const robotoPath = path.join('vendor', 'google', 'fonts', 'roboto')
      app.import(path.join(robotoPath, 'Roboto-Bold.woff2'), {destDir: 'assets/fonts'})
      app.import(path.join(robotoPath, 'Roboto-Light.woff2'), {destDir: 'assets/fonts'})
      app.import(path.join(robotoPath, 'Roboto-LightItalic.woff2'), {destDir: 'assets/fonts'})
      app.import(path.join(robotoPath, 'Roboto-Medium.woff2'), {destDir: 'assets/fonts'})
      app.import(path.join(robotoPath, 'Roboto-Regular.woff2'), {destDir: 'assets/fonts'})
      app.import(path.join(robotoPath, 'stylesheet.css'))
      app.import(path.join('vendor', 'svg4everybody.min.js'))
      app.import(path.join('vendor', 'perfect-scrollbar.min.js'))
      app.import(path.join('vendor', 'perfect-scrollbar.min.css'))
    }
  },

  init: function (app) {
    this.options = this.options || {}
    defaultBabel(this.options)

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators')
    }
    if (this._super.init) {
      this._super.init.apply(this, arguments)
    }
  },

  flattenIcons: function (iconNames, subDir, srcDir) {
    fs.readdirSync(srcDir).forEach((fileName) => {
      var filePath = path.join(srcDir, fileName)
      if (fs.lstatSync(filePath).isDirectory()) {
        this.flattenIcons(iconNames, `${subDir}${subDir === '' ? '' : '/'}${fileName}`, filePath)
      } else if (fileName.endsWith('.svg')) {
        iconNames.push(`${subDir === '' ? '' : `${subDir}/`}${fileName.substr(0, fileName.length - 4)}`)
      }
    })

    return iconNames
  },
  /**
  * Runs the styles tree through preprocessors.
  * Overriding allows consumer to choose if `addon/styles`
  * are compiled by default
  * https://ember-cli.com/api/files/lib_models_addon.js.html#782
  * @private
  * @function compileStyles
  * @param {Tree} addonStylesTree Default tree
  * @returns {Tree} Compiled styles tree
  */
  compileStyles: function () {
    var env = process.env.EMBER_ENV

    var options = (this.app && this.app.options && this.app.options.frostCore) || {}
    var envConfig = this.project.config(env).frostCore

    if (envConfig) {
      console.warn('Deprecation warning: frostCore should be moved to ember-cli-build')
      Object.assign(options, envConfig)
    }

    if (options.excludeAddonStyles) {
      return null
    }
    return this._super.compileStyles.apply(this, arguments)
  },
  /**
   * Returns the tree for all style files
   * Point app/styles import to addon to avoid code duplication
   * https://ember-cli.com/api/files/lib_models_addon.js.html#677
   * @public
   * @function treeForStyles
   * @param {Tree} appStyles Usually the `app/styles` directory tree
   * @returns {Tree} Compiled styles tree
   */
  treeForStyles: function () {
    const addonStyles = new Funnel(`${this.root}/addon/styles`)

    return this._super.treeForStyles.call(this, addonStyles)
  },
  /* eslint-disable complexity */
  // Present purely to allow programmatic access to the icon packs and icon names (for demo purposes)
  treeForAddon: function (tree) {
    var addonTree = this._super.treeForAddon.call(this, tree)

    var iconNames = {}

    var addonPackages = pickBy(this.project.addonPackages, (addonPackage) => {
      return has(addonPackage.pkg, 'ember-frost-icon-pack')
    })

    for (var addonName in addonPackages) {
      if (addonPackages.hasOwnProperty(addonName)) {
        const addonPackage = addonPackages[addonName]
        const iconPack = addonPackage.pkg['ember-frost-icon-pack']
        const iconPackName = iconPack.name
        const iconPackPath = iconPack.path || 'svgs'
        const addonIconPackPath = path.join(addonPackage.path, iconPackPath)
        iconNames[iconPackName] = this.flattenIcons([], '', addonIconPackPath)
      }
    }

    const isAddon = this.project.isEmberCLIAddon()

    const localIconPackName = get(this, 'app.options.iconPackOptions.name', isAddon ? 'dummy' : 'app')
    const localIconPackPath = path.join(this.project.root,
      get(this, 'app.options.iconPackOptions.path', isAddon ? 'tests/dummy/svgs' : 'svgs')
    )

    if (fs.existsSync(localIconPackPath)) {
      iconNames[localIconPackName] = this.flattenIcons([], '', localIconPackPath)
    }

    const iconNameJson = JSON.stringify(iconNames, null, 2)
    const iconNameTree = writeFile('modules/ember-frost-core/icon-packs.js', `export default ${iconNameJson}`)

    return mergeTrees([addonTree, iconNameTree], {overwrite: true})
  },
  /* eslint-enable complexity */

  treeForPublic: function (tree) {
    const isAddon = this.project.isEmberCLIAddon()

    const addonPackages = pickBy(this.project.addonPackages, (addonPackage) => {
      return has(addonPackage.pkg, 'ember-frost-icon-pack')
    })

    const iconPacks = Object.keys(addonPackages).map((addonName) => {
      const addonPackage = addonPackages[addonName]
      const iconPack = addonPackage.pkg['ember-frost-icon-pack']
      const iconPackPath = iconPack.path || 'svgs'
      const addonIconPackPath = path.join(addonPackage.path, iconPackPath)

      var svgFunnel = new Funnel(addonIconPackPath, {
        include: [new RegExp(/\.svg$/)]
      })

      return new SVGStore(svgFunnel, {
        outputFile: `/assets/icon-packs/${iconPack.name}.svg`,
        svgstoreOpts: {customSymbolAttrs: ['preserveAspectRatio']}
      })
    })

    const localIconPackName = get(this, 'app.options.iconPackOptions.name', isAddon ? 'dummy' : 'app')
    const localIconPackPath = path.join(this.project.root,
      get(this, 'app.options.iconPackOptions.path', isAddon ? 'tests/dummy/svgs' : 'svgs')
    )

    if (fs.existsSync(localIconPackPath)) {
      const svgFunnel = new Funnel(localIconPackPath, {
        include: [new RegExp(/\.svg$/)]
      })
      iconPacks.push(new SVGStore(svgFunnel, {
        outputFile: `/assets/icon-packs/${localIconPackName}.svg`,
        svgstoreOpts: {customSymbolAttrs: ['preserveAspectRatio']}
      }))
    }

    return mergeTrees(iconPacks, {overwrite: true})
  }
}
