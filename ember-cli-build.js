/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      optional: ['es7.decorators']
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
  })

  app.import('bower_components/highlightjs/styles/github.css')
  app.import('bower_components/ember/ember-template-compiler.js')

  if (app.env === 'test') {
    ;[
      'bower_components/sinon-chai/lib/sinon-chai.js',
      'bower_components/chai-jquery/chai-jquery.js'
    ].forEach((path) => {
      app.import(path, {type: 'test'})
    })
  }

  return app.toTree()
}
