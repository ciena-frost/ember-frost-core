const Promise = require('promise')
const sinon = require('sinon')
const expect = require('chai').expect

const npmModuleLocation = '../../../../lib/utils/npm'
const packageHandlerModuleLocation = '../../../../lib/utils/package-handler'
const semverModuleLocation = 'semver'

describe('Unit / Lib / Utils / Package Handler', function () {
  let sandbox
  let packageHandler
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    packageHandler = require(packageHandlerModuleLocation)
  })

  afterEach(function () {
    sandbox.restore()
    delete require.cache['packageHandler']
  })

  describe('getPkgsToInstall', function () {
    beforeEach(function () {
      sandbox.stub(packageHandler, '_getPackagesVersions').callsFake((pkgs) => {
        const promises = []
        pkgs.forEach((pkg) => {
          promises.push(Promise.resolve({
            pkg: pkg,
            result: ['0.0.1', '0.0.2']
          }))
        })
        return Promise.all(promises)
      })
    })

    describe('package not installed', function () {
      beforeEach(function () {
        sandbox.stub(packageHandler, '_isPkgInstalled').callsFake(() => {
          return false
        })
      })

      it('should single package', function () {
        const pkg1 = {name: 'pkg1', target: '0.0.1'}

        const promise = packageHandler.getPkgsToInstall([pkg1], {})
        return promise.then((result) => {
          expect(result).to.length(1)
          expect(result[0]).to.eql(pkg1)
        })
      })

      it('should multiple packages', function () {
        const pkg1 = {name: 'pkg1', target: '0.0.1'}
        const pkg2 = {name: 'pkg2', target: '0.0.1'}

        const promise = packageHandler.getPkgsToInstall([pkg1, pkg2], {})
        return promise.then((result) => {
          expect(result).to.length(2)
          expect(result[0]).to.eql(pkg1)
          expect(result[1]).to.eql(pkg2)
        })
      })
    })

    describe('package installed', function () {
      let consoleOutputs = []
      beforeEach(function () {
        sandbox.stub(packageHandler, '_isPkgInstalled').callsFake(() => {
          return true
        })
        sandbox.stub(console, 'log').callsFake((output) => {
          consoleOutputs.push(output)
        })
      })

      afterEach(function () {
        consoleOutputs = []
      })

      it('should single package', function () {
        const pkg1 = {name: 'pkg1', target: '0.0.1'}

        const promise = packageHandler.getPkgsToInstall([pkg1], {'pkg1': '0.0.1'})
        return promise.then((result) => {
          expect(consoleOutputs).to.length(1)
          const consoleOutput = consoleOutputs[0]
          expect(consoleOutput).to.contains('Package already installed')
          expect(consoleOutput).to.contains('pkg1@0.0.1')
        })
      })

      it('should multiple packages', function () {
        const pkg1 = {name: 'pkg1', target: '0.0.1'}
        const pkg2 = {name: 'pkg2', target: '0.0.1'}

        const promise = packageHandler.getPkgsToInstall([pkg1, pkg2], {'pkg1': '0.0.1', 'pkg2': '0.0.2'})
        return promise.then((result) => {
          expect(consoleOutputs).to.length(2)

          const consoleOutput1 = consoleOutputs[0]
          expect(consoleOutput1).to.contains('Package already installed')
          expect(consoleOutput1).to.contains('pkg1@0.0.1')

          const consoleOutput2 = consoleOutputs[1]
          expect(consoleOutput2).to.contains('Package already installed')
          expect(consoleOutput2).to.contains('pkg2@0.0.1')
        })
      })
    })
  })

  describe('_isPkgInstalled', function () {
    beforeEach(function () {
      sandbox.stub(packageHandler, '_getTargetVersion').callsFake((target) => {
        return target
      })
    })

    it('should package not installed', function () {
      const pkg = {name: 'pkg1', target: '0.0.1'}
      const result = packageHandler._isPkgInstalled(pkg, ['0.0.1'], {})
      expect(result).to.eql(false)
    })

    it('should installed package > target package', function () {
      const pkg = {name: 'pkg1', target: '0.0.1'}
      const result = packageHandler._isPkgInstalled(pkg, ['0.0.1'], {'pkg1': '0.0.2'})
      expect(result).to.eql(true)
    })

    it('should installed package < target package', function () {
      const pkg = {name: 'pkg1', target: '0.0.1'}
      const result = packageHandler._isPkgInstalled(pkg, ['0.0.1'], {'pkg1': '0.0.0'})
      expect(result).to.eql(false)
    })

    it('should installed package == target package', function () {
      const pkg = {name: 'pkg1', target: '0.0.1'}
      const result = packageHandler._isPkgInstalled(pkg, ['0.0.1'], {'pkg1': '0.0.1'})
      expect(result).to.eql(true)
    })
  })

  describe('_getPackagesVersions', function () {
    let npm
    let packageHandlerMock
    beforeEach(function () {
      npm = require(npmModuleLocation)
      sandbox.stub(npm, 'getVersions').callsFake((pkg) => {
        return Promise.resolve({
          pkg: pkg,
          result: ['0.0.1', '0.0.2']
        })
      })
      packageHandlerMock = require(packageHandlerModuleLocation)
    })

    afterEach(function () {
      delete require.cache['npm']
      delete require.cache['packageHandler']
    })

    it('should single package', function () {
      const pkg1 = {name: 'pkg1', target: '0.0.1'}
      const promise = packageHandlerMock._getPackagesVersions([pkg1])
      return promise.then((result) => {
        expect(result).to.have.length(1)
        expect(result[0]).to.eql({pkg: pkg1, result: ['0.0.1', '0.0.2']})
      })
    })

    it('should multiple packages', function () {
      const pkg1 = {name: 'pkg1', target: '0.0.1'}
      const pkg2 = {name: 'pkg2', target: '0.0.1'}

      const promise = packageHandlerMock._getPackagesVersions([pkg1, pkg2])
      return promise.then((result) => {
        expect(result).to.have.length(2)
        expect(result[0]).to.eql({pkg: pkg1, result: ['0.0.1', '0.0.2']})
        expect(result[1]).to.eql({pkg: pkg2, result: ['0.0.1', '0.0.2']})
      })
    })
  })

  describe('_getTargetVersion', function () {
    let semver
    let packageHandlerMock

    beforeEach(function () {
      semver = require(semverModuleLocation)
      sandbox.stub(semver, 'maxSatisfying').callsFake((target) => {
        return '0.0.1'
      })
      sandbox.stub(semver, 'valid').callsFake((target) => {
        return target
      })
    })

    afterEach(function () {
      delete require.cache['packageHandler']
      delete require.cache['semver']
    })

    describe('not a range', function () {
      beforeEach(function () {
        sandbox.stub(semver, 'validRange').callsFake((target) => {
          return undefined
        })
        packageHandlerMock = require(packageHandlerModuleLocation)
      })

      it('should valid target', function () {
        const result = packageHandlerMock._getTargetVersion('0.0.1')
        expect(result).to.eql('0.0.1')
      })
    })

    describe('range', function () {
      beforeEach(function () {
        sandbox.stub(semver, 'validRange').callsFake((target) => {
          return target
        })
        packageHandlerMock = require(packageHandlerModuleLocation)
      })

      it('should valid target', function () {
        const result = packageHandlerMock._getTargetVersion('~0.0.1', ['0.0.1'])
        expect(result).to.eql('0.0.1')
      })
    })
  })
})
