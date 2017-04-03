module.exports = {
  /**
   * Get the existing consumer dependencies.
   * @param {Object} options the blueprint options
   * @returns {Object} all the consumer dependencies
   */
  getPackages: function (options) {
    return Object.assign(options.project.pkg.devDependencies, options.project.pkg.dependencies)
  }
}
