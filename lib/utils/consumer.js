module.exports = {
  /**
   * Get the existing consumer dependencies.
   * @param {Object} options the blueprint options
   * @returns {Object} all the consumer dependencies
   */
  getPackages: function (options) {
    if (options && options.project && options.project.pkg) {
      const devDependencies = options.project.pkg.devDependencies || {}
      const dependencies = options.project.pkg.dependencies || {}
      return Object.assign(devDependencies, dependencies)
    }
    return {}
  }
}
