const blueprintHelper = require('ember-frost-core/blueprint-helper')

module.exports = {
  afterInstall: function (options) {
    const addonsToAdd = [
      {name: 'ember-computed-decorators', target: '~0.2.0'},
      {name: 'ember-concurrency', target: '~0.7.15'},
      {name: 'ember-elsewhere', target: '~0.4.1'},
      {name: 'ember-hook', target: '^1.4.1'},
      {name: 'ember-prop-types', target: '^3.0.0'},
      {name: 'ember-spread', target: '^1.1.1'},
      {name: 'ember-truth-helpers', target: '^1.2.0'}
    ]

    // Get the packages installed in the consumer app/addon
    const consumerPackages = blueprintHelper.consumer.getPackages(options)

    // Get the packages to install (not already installed) from a list of potential packages
    return blueprintHelper.packageHandler.getPkgsToInstall(addonsToAdd, consumerPackages).then((pkgsToInstall) => {
      if (pkgsToInstall.length !== 0) {
        // Call the blueprint hook
        return this.addAddonsToProject({packages: pkgsToInstall})
      }
    })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter to us)
  }
}
