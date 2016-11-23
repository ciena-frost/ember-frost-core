module.exports = {
  coverageEnvVar: 'COVERAGE',
  coverageFolder: 'coverage',
  excludes: [
    'tests/dummy/**/*',
    '**/mirage/**/*'
  ],
  useBabelInstrumenter: true,
  reporters: [
    'lcov'
  ]
}
