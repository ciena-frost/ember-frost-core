/**
 * Blueprint for generating a frosty helper
 */

'use strict'

var normalizeEntityName = require('ember-cli-normalize-entity-name')

module.exports = {
  description: 'Generates a frosty helper function',
  normalizeEntityName: function (entityName) {
    return normalizeEntityName(entityName)
  }
}
