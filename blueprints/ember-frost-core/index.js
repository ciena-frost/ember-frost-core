const blueprintHelper = require('ember-frost-core/blueprint-helper')

module.exports = {
  afterInstall: function (options) {
    const addonsToAdd = [
      {name: 'ember-cli-frost-blueprints', target: '^2.0.0'},
      {name: 'ember-concurrency', target: '~0.8.10'},
      {name: 'ember-elsewhere', target: '1.0.2'},
      {name: 'ember-hook', target: '^1.4.2'},
      {name: 'ember-prop-types', target: '^4.0.0'},
      {name: 'ember-spread', target: '^2.0.0'},
      {name: 'ember-truth-helpers', target: '^1.3.0'}
    ]

    // Get the packages installed in the consumer app/addon. Packages that are already installed in the consumer within
    // the required semver range will not be re-installed or have blueprints re-run.
    const consumerPackages = blueprintHelper.consumer.getPackages(options)

    // Get the packages to install (not already installed) from a list of potential packages
    return blueprintHelper.packageHandler.getPkgsToInstall(addonsToAdd, consumerPackages).then((pkgsToInstall) => {
      if (pkgsToInstall.length !== 0) {
        // Call the blueprint hook
        return this.addAddonsToProject({
          packages: pkgsToInstall,
          blueprintOptions: {
            saveDev: true
          }
        })
      }
    })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter to us)
  }
}
