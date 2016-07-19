/* jshint node:true*/

var stringUtil = require('ember-cli-string-utils')
var pathUtil = require('ember-cli-path-utils')
var validComponentName = require('ember-cli-valid-component-name')
var getPathOption = require('ember-cli-get-component-path-option')
var path = require('path')

var normalizeEntityName = require('ember-cli-normalize-entity-name')

module.exports = {
  description: 'Generates a frost component. Name must contain a hyphen.',

  availableOptions: [
    {
      name: 'path',
      type: String,
      default: 'components',
      aliases: [
        {'no-path': ''}
      ]
    }
  ],
  fileMapTokens: function () {
    return {
      __path__: function (options) {
        if (options.pod) {
          return path.join(options.podPath, options.locals.path, options.dasherizedModuleName)
        }
        return 'components'
      },
      __templatepath__: function (options) {
        if (options.pod) {
          return path.join(options.podPath, options.locals.path, options.dasherizedModuleName)
        }
        return 'templates/components'
      },
      __templatename__: function (options) {
        if (options.pod) {
          return 'template'
        }
        return options.dasherizedModuleName
      }
    }
  },

  normalizeEntityName: function (entityName) {
    entityName = normalizeEntityName(entityName)
    return validComponentName(entityName)
  },
  locals: function (options) {
    var templatePath = ''
    var importTemplate = ''
    var contents = ''
    if (options.project.isEmberCLIAddon() || !options.inDummy) {
      if (options.pod) {
        templatePath = './template'
      } else {
        templatePath = pathUtil.getRelativeParentPath(options.entity.name) +
          'templates/components/' + stringUtil.dasherize(options.entity.name)
      }
      importTemplate = 'import layout from \'' + templatePath + '\';\n'
      contents +=
        '\n\t// == Properties =============================================================' +
        '\n\texcludeEvents: [],' +
        '\n\tclassNames: [\n\t\t\'' + options.entity.name + '\'\n\t],' +
        '\n\tlayout,' +
        '\n\tpropTypes: {},'
      contents +=
        '\n\t// == Functions =============================================================' +
        '\n\tgetDefaultProps () {' +
          '\n\t\treturn {}' +
        '\n\t}'
    }
    return {
      importTemplate,
      contents,
      path: getPathOption(options)
    }
  }
}
