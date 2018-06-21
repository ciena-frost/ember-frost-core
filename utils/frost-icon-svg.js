'use strict'

const fs = require('fs')
const path = require('path')
const resolve = require('resolve')
const VersionChecker = require('ember-cli-version-checker')
const writeFile = require('broccoli-file-creator')

/**
 * Traverse directory structure and build paths to each file
 *
 * @param {String} srcDir
 * @param {String} subDir [empty String]
 * @param {Array} iconNames [empty Array]
 * @returns {Array}
 */
const flattenIcons = function (srcDir, subDir = '', iconNames = []) {
    fs.readdirSync(srcDir).forEach((fileName) => {
        const filePath = path.join(srcDir, fileName)

        if (fs.lstatSync(filePath).isDirectory()) {
            flattenIcons(filePath, `${subDir}${subDir === '' ? '' : '/'}${fileName}`, iconNames)
        } else if (fileName.endsWith('.svg')) {
            iconNames.push(`${subDir === '' ? '' : `${subDir}/`}${fileName.replace('.svg', '')}`)
        }
    })

    return iconNames
}

/**
 * Export all of the icon names so can be used in demo application for display
 *
 * @param {String} [frost-icon-svgs] svgSourceDir Source directory of SVG files
 * @returns {Object} Broccoli tree
 */
const generateIconsForDocumentation = function(svgSourceDir = 'frost-icon-svgs') {
    const iconNameTree = writeFile(
      `modules/${this.name}/icons.js`,
      `export default ${JSON.stringify(flattenIcons(svgSourceDir), null, 2)}`
    )

    let output = iconNameTree

    // The transpiling was done on the output of `treeForAddon` < `ember-cli@2.12.0`
    // We need to manually transpile for >= `embe-cli@2.12.0`
    const checker = new VersionChecker(this)

    if (checker.for('ember-cli').satisfies('>= 2.12.0')) {
      const addonOptions = getAddonOptions.call(this)
      if (addonOptions.babel) {
        const BabelTranspiler = require('broccoli-babel-transpiler')
        output = new BabelTranspiler(iconNameTree, addonOptions.babel)
      }
    }

    return output
}

/**
 * Options that have been set
 *
 * @returns {Object}
 */
const getAddonOptions = function() {
    return (this.parent && this.parent.options) || (this.app && this.app.options) || {}
}

/**
 * Get source directory for SVGs
 *
 * @param {String} svgSourceDir Source directory of SVG files
 * @returns {String}
 */
const getSourceDirectory = function(svgSourceDir) {
    // can use this if are a top-level addon...
    let sourcePath = svgSourceDir

    // ...otherwise need to find correct node_modules location when are...
    if (
        !this.project.isEmberCLIAddon() // ...in an app
        || this.project.pkg.name !== this.moduleName() // ...in a nested addon
    )
    {
        let packagePath = resolve.sync(this.moduleName(), {baseDir: this.project.root})
        sourcePath = path.join(packagePath.substring(0, packagePath.lastIndexOf('/')), svgSourceDir)
    }

    return sourcePath
}

/**
 * Set configuration options for ember-cli-svgstore addon
 * - svgstore.files
 * - svgstore.svgstoreOpts.copyAttrs
 *
 * @param {String} iconPack Name of the master SVG
 * @param {String} [frost-icon-svgs] svgSourceDir Source directory of SVG files
 * @returns {undefined}
 */
const setSvgConfiguration = function (iconPack, svgSourceDir = 'frost-icon-svgs') {
    if(!iconPack) {
        throw new Error(`"iconPack" must be set when configuring SVGs in ${this.name}`)
    }

    this.app.options.svgstore = this.app.options.svgstore || {}

    // svgstore.svgstoreOpts.copyAttrs
    this.app.options.svgstore.svgstoreOpts = this.app.options.svgstore.svgstoreOpts || {}
    this.app.options.svgstore.svgstoreOpts.copyAttrs = this.app.options.svgstore.svgstoreOpts.copyAttrs || []

    if (!this.app.options.svgstore.svgstoreOpts.copyAttrs.includes('preserveAspectRatio')) {
      this.app.options.svgstore.svgstoreOpts.copyAttrs.push('preserveAspectRatio')
    }

    // svgstore.files
    this.app.options.svgstore.files = this.app.options.svgstore.files || []

    this.app.options.svgstore.files.push({
        sourceDirs: getSourceDirectory.call(this, svgSourceDir),
        outputFile: `/assets/icon-packs/${iconPack}.svg`
    })
}

module.exports = {
    flattenIcons,
    generateIconsForDocumentation,
    getAddonOptions,
    getSourceDirectory,
    setSvgConfiguration
}
