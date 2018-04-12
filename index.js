/* eslint-env node */

'use strict'

const autoprefixer = require('broccoli-autoprefixer')
const mergeTrees = require('broccoli-merge-trees')
const path = require('path')
const {
  generateIconsForDocumentation,
  getAddonOptions,
  setSvgConfiguration
} = require('./utils/frost-icon-svg')

module.exports = {
  name: 'ember-frost-core',

  included: function (app) {
    this.app = app = this._findHost.call(this) // eslint-disable-line no-useless-call

    // Set ember-cli-svgstore options so that consuming applications don't have to
    setSvgConfiguration.call(this, 'frost')

    this._super.included.apply(this, arguments)

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
    this.options.babel = this.options.babel || {}
    this.options.babel.optional = this.options.babel.optional || []

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators')
    }

    this._super.init.apply(this, arguments)
  },

  // Present purely to allow programmatic access to the icon packs and icon names (for demo purposes)
  treeForAddon: function (tree) {
    return mergeTrees(
      [
        this._super.treeForAddon.apply(this, arguments),
        generateIconsForDocumentation.call(this)
      ],
      {
        overwrite: true
      }
    )
  },

  /**
   * Post process a given addon tree
   *
   * @param {String} type Type of tree being processed
   * @param {Tree} tree Current tree being processed
   * @returns {Tree} Autoprefixed css tree
   */
  postprocessTree (type, tree) {
    if (type === 'css') {
      const options = getAddonOptions.call(this).autoprefixer || {
        browsers: ['last 2 versions']
      }
      tree = autoprefixer(tree, options)
    }
    return tree
  }
}
