/* globals blanket, module */

var options = {
  modulePrefix: 'ember-frost-core',
  filter: '//.*ember-frost-core/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['lcov'],
    autostart: true,
    lcovOptions: {
      outputFile: 'coverage/lcov.info',
      renamer: function (fileName) {
        return fileName.replace('ember-frost-core', 'addon') + '.js'
      }
    }
  }
}

if (typeof exports === 'undefined') {
  blanket.options(options)
} else {
  module.exports = options
}
