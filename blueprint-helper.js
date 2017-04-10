var consumer = require('ember-frost-core/lib/utils/consumer')
var npm = require('ember-frost-core/lib/utils/npm')
var packageHandler = require('ember-frost-core/lib/utils/package-handler')

/**
 * This helper is to facilite operations in blueprints. It's providing a set of functionalities like:
 * - Getting all the installed packages in the blueprint consumer app/addon (packageHandler)
 * - Get the packages to install (not already installed) from a list of potential packages to install (consumer)
 * - Running npm view or install command for one or multiple packages (npm)
 *
 * Example:
 * ```javascript
 *  afterInstall: function (options) {
 *    const addonsToAdd = [
 *      {name: 'ember-computed-decorators', target: '~0.2.0'}
 *    ]
 *
 *    // Get the packages installed in the consumer app/addon
 *    const consumerPackages = blueprintHelper.consumer.getPackages(options) *
 *
 *    // Get the packages to install (not already installed) from a list of potential packages
 *    return blueprintHelper.packageHandler.getPkgsToInstall(addonsToAdd, consumerPackages).then((pkgsToInstall) => {
 *      if (pkgsToInstall.length !== 0) {
 *        // Call the blueprint hook
 *        return this.addAddonsToProject({packages: pkgsToInstall})
 *      }
 *   })
 * ```
 */
module.exports = {
  consumer,
  npm,
  packageHandler
}
