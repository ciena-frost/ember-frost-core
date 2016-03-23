/* globals module */

'use strict'

const pkg = require('./package.json')
const Funnel = require('broccoli-funnel')

const flatiron = require('broccoli-flatiron')
const fs = require('fs')
const mergeTrees = require('broccoli-merge-trees')
const path = require('path')
const svgstore = require('broccoli-svgstore')

module.exports = {
  name: 'ember-frost-core',

  included: function (app) {
    this._super.included(app)
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
    // Flatten the svgs into js imports with inline svg using flatiron and merge the result into the addon tree
    var svgPaths = []

    var addonSvgRoot = path.join(this.root, 'public', 'svgs')
    if (fs.existsSync(addonSvgRoot)) {
      svgPaths.push(addonSvgRoot)
    }

    if (this.project.name() !== pkg.name) {
      var appSvgRoot = path.join(this.project.root, 'public', 'svgs')
      if (fs.existsSync(appSvgRoot)) {
        svgPaths.push(appSvgRoot)
      }
    }

    var dummySvgRoot = path.join(this.project.root, 'tests', 'dummy', 'public', 'svgs')
    if (fs.existsSync(dummySvgRoot)) {
      svgPaths.push(dummySvgRoot)
    }

    if (svgPaths.length > 0) {
      var svgFunnel = new Funnel(mergeTrees(svgPaths, {overwrite: true}), {
        include: [new RegExp(/\.svg$/)]
      })

      var flattenedSvgs = flatiron(svgFunnel, {
        outputFile: 'svgs.js',
        trimExtensions: true
      })

      tree = mergeTrees([tree, flattenedSvgs], {overwrite: true})
    }

    return this._super.treeForAddon.call(this, tree)
  },

  treeForPublic: function () {
    var svgRoot = path.join(this.root, 'public', 'svgs')
    return svgstore(new Funnel(svgRoot), {outputFile: '/assets/frost-core-icons.svg'})
  }
}
