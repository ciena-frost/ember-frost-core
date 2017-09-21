/* eslint-env node */
'use strict'

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    babel6: {
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties'
      ]
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    'ember-cli-mocha': {
      useLintTree: false
    },
    sassOptions: {
      includePaths: [
        'addon/styles'
      ]
    },
    snippetPaths: [
      'code-snippets'
    ],
    snippetSearchPaths: [
      'tests/dummy'
    ]
    // Add options here
  })

  app.import('bower_components/highlightjs/styles/github.css')
  app.import(app.project.addonPackages['ember-source']
  ? 'vendor/ember/ember-template-compiler.js' : 'bower_components/ember/ember-template-compiler.js')

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree()
}
