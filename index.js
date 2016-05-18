/* globals module */

// 'use strict'

var Funnel = require('broccoli-funnel')

var flatiron = require('broccoli-flatiron')
var fs = require('fs')
var mergeTrees = require('broccoli-merge-trees')
var path = require('path')
var svgstore = require('broccoli-svgstore')

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
      app.import(path.join('vendor', 'google', 'fonts', 'roboto', 'Roboto-LightItalic.woff2'), { destDir: 'assets/fonts' })
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
  },

  treeForAddon: function (tree) {
    var addonTree = this._super.treeForAddon.call(this, tree)

    var svgPaths = [
      path.join(this.root, 'public', 'svgs'),
      path.join(this.project.root, 'public', 'svgs'),
      path.join(this.project.root, 'tests', 'dummy', 'public', 'svgs')
    ]
      .filter((svgPath) => fs.existsSync(svgPath))

    if (svgPaths.length === 0) {
      return addonTree
    }

    var svgFunnel = new Funnel(mergeTrees(svgPaths, {overwrite: true}), {
      include: [new RegExp(/\.svg$/)]
    })

    var flattenedSvgs = flatiron(svgFunnel, {
      outputFile: 'modules/ember-frost-core/svgs.js',
      trimExtensions: true
    })

    return mergeTrees([addonTree, flattenedSvgs], {overwrite: true})
  },

  treeForPublic: function () {
    var svgRoot = path.join(this.root, 'public', 'svgs')
    return svgstore(new Funnel(svgRoot), {outputFile: '/assets/frost-core-icons.svg'})
  }
}
