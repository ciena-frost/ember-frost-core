/* globals module */

// 'use strict'

const writeFile = require('broccoli-file-creator')
const Funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees')
const SVGStore = require('broccoli-svgstore')
const fs = require('fs')
const _ = require('lodash')
const path = require('path')

module.exports = {
  name: 'ember-frost-core',

  included: function (app) {
    // Addons - see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      this.app = app = app.app
    }

    this._super.included(app)

    if (app) {
      app.import(path.join('vendor', 'google', 'fonts', 'roboto', 'Roboto-Bold.woff2'), { destDir: 'assets/fonts' })
      app.import(path.join('vendor', 'google', 'fonts', 'roboto', 'Roboto-Light.woff2'), { destDir: 'assets/fonts' })
      app.import(path.join('vendor', 'google', 'fonts', 'roboto', 'Roboto-LightItalic.woff2'),
       { destDir: 'assets/fonts' })
      app.import(path.join('vendor', 'google', 'fonts', 'roboto', 'Roboto-Medium.woff2'), { destDir: 'assets/fonts' })
      app.import(path.join('vendor', 'google', 'fonts', 'roboto', 'Roboto-Regular.woff2'), { destDir: 'assets/fonts' })
      app.import(path.join('vendor', 'google', 'fonts', 'roboto', 'stylesheet.css'))
    }

    if (typeof app.import === 'function') {
      app.import(app.bowerDirectory + '/perfect-scrollbar/js/perfect-scrollbar.js')
      app.import(app.bowerDirectory + '/perfect-scrollbar/css/perfect-scrollbar.css')
    }
  },

  init: function (app) {
    this.options = this.options || {}
    this.options.babel = this.options.babel || {}
    this.options.babel.optional = this.options.babel.optional || []

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators')
    }
    this._super.init && this._super.init.apply(this, arguments)
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

  // Present purely to allow programmatic access to the icon packs and icon names (for demo purposes)
  treeForAddon: function (tree) {
    var addonTree = this._super.treeForAddon.call(this, tree)

    var iconNames = {}

    _.chain(this.project.addonPackages)
      .pickBy((addonPackage) => {
        if (_.has(addonPackage.pkg, 'ember-frost-icon-pack')) {
          return true
        }
      })
      .map((addonPackage) => {
        const iconPack = addonPackage.pkg['ember-frost-icon-pack']
        const iconPackName = iconPack.name
        const iconPackPath = iconPack.path || 'svgs'
        const addonIconPackPath = path.join(addonPackage.path, iconPackPath)
        iconNames[iconPackName] = this.flattenIcons([], '', addonIconPackPath)
      })
      .value()

    const isAddon = this.project.isEmberCLIAddon()

    const localIconPackName = _.get(this, 'app.options.iconPackOptions.name', isAddon ? 'dummy' : 'app')
    const localIconPackPath = path.join(this.project.root,
      _.get(this, 'app.options.iconPackOptions.path', isAddon ? 'tests/dummy/svgs' : 'svgs')
    )

    // No icon pack path defined and an app = legacy case where the app icons must be merged into the 'frost' icon pack
    const isLegacy = !_.has(this, 'app.options.iconPackOptions.path') && !isAddon

    if (isLegacy && fs.existsSync(path.join(this.project.root, 'public/svgs'))) {
      iconNames['frost'] = _.concat(iconNames['frost'], this.flattenIcons([], '',
       path.join(this.project.root, 'public/svgs')))
    } else if (fs.existsSync(localIconPackPath)) {
      iconNames[localIconPackName] = this.flattenIcons([], '', localIconPackPath)
    }

    const iconNameTree = writeFile('modules/ember-frost-core/icon-packs.js', 'export default ' +
     JSON.stringify(iconNames, null, 2))

    return mergeTrees([addonTree, iconNameTree], {overwrite: true})
  },

  treeForPublic: function (tree) {
    const isAddon = this.project.isEmberCLIAddon()

    // No icon pack path defined and an app = legacy case where the app icons must be merged into the 'frost' icon pack
    const isLegacy = !_.has(this, 'app.options.iconPackOptions.path') && !isAddon

    const iconPacks = _.chain(this.project.addonPackages)
      .pickBy((addonPackage) => {
        if (_.has(addonPackage.pkg, 'ember-frost-icon-pack')) {
          return true
        }
      })
      .map((addonPackage) => {
        const iconPack = addonPackage.pkg['ember-frost-icon-pack']
        const iconPackPath = iconPack.path || 'svgs'
        const addonIconPackPath = path.join(addonPackage.path, iconPackPath)

        var svgFunnel
        if (iconPack.name === 'frost' && isLegacy && fs.existsSync(path.join(this.project.root, 'public/svgs'))) {
          svgFunnel = mergeTrees([
            new Funnel(addonIconPackPath, {
              include: [new RegExp(/\.svg$/)]
            }),
            new Funnel(path.join(this.project.root, 'public/svgs'), {
              include: [new RegExp(/\.svg$/)]
            })
          ])
        } else {
          svgFunnel = new Funnel(addonIconPackPath, {
            include: [new RegExp(/\.svg$/)]
          })
        }

        return new SVGStore(svgFunnel, { outputFile: `/assets/icon-packs/${iconPack.name}.svg`, flatten: false })
      })
      .value()

    const localIconPackName = _.get(this, 'app.options.iconPackOptions.name', isAddon ? 'dummy' : 'app')
    const localIconPackPath = path.join(this.project.root,
      _.get(this, 'app.options.iconPackOptions.path', isAddon ? 'tests/dummy/svgs' : 'svgs')
    )

    if (!isLegacy && fs.existsSync(localIconPackPath)) {
      const svgFunnel = new Funnel(localIconPackPath, {
        include: [new RegExp(/\.svg$/)]
      })
      iconPacks.push(new SVGStore(svgFunnel, { outputFile: `/assets/icon-packs/${localIconPackName}.svg`,
       flatten: false }))
    }

    return mergeTrees(iconPacks, {overwrite: true})
  }
}
