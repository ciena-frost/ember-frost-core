module.exports = {
  excludes: [
    'tests/dummy/**/*',
    '**/mirage/**/*'
  ],
  useBabelInstrumenter: false,
  reporters: [
    'lcov'
  ]
}
