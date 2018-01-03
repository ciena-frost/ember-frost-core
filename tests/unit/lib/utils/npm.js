const expect = require('chai').expect
const sinon = require('sinon')
const childProcessPromise = require('child-process-promise')
const Promise = require('promise')

const npmModuleLocation = '../../../../lib/utils/npm'

describe('Unit / Lib / Utils / Npm', function () {
  let sandbox
  let npm
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
    delete require.cache['npm']
  })

  describe('_run', function () {
    beforeEach(function () {
      sandbox.stub(childProcessPromise, 'exec').callsFake((cmd) => {
        return Promise.resolve(cmd)
      })
      npm = require(npmModuleLocation)
    })

    it('should no args', function () {
      const promise = npm._run('test')
      return promise.then((result) => {
        expect(result).to.eql('npm test')
      })
    })

    it('should with a single arg', function () {
      const promise = npm._run('test', ['1'])

      return promise.then((result) => {
        expect(result).to.eql('npm test 1')
      })
    })

    it('should with multiple args', function () {
      const promise = npm._run('test', ['1', '2'])
      return promise.then((result) => {
        expect(result).to.eql('npm test 1 2')
      })
    })
  })

  describe('view', function () {
    const packageJson = `{
      "name": "pkg1",
      "version": "1.12.0",
      "devDependencies": {
        "broccoli-asset-rev": "^2.5.0"
      },
      "keywords": [
        "ember-addon"
      ],
      "dependencies": {
        "broccoli-file-creator": "^1.1.0"
      }
    }`

    beforeEach(function () {
      npm = require(npmModuleLocation)
      sandbox.stub(npm, '_run').callsFake(() => {
        return Promise.resolve({stdout: packageJson})
      })
    })

    it('should no params', function () {
      const pkg = {name: 'pkg1', target: '0.0.1'}
      const promise = npm.view(pkg)

      return promise.then((result) => {
        expect(result.pkg).to.eql(pkg)
        expect(result.result).to.eql(JSON.parse(packageJson))
      })
    })
  })

  describe('getVersions', function () {
    beforeEach(function () {
      npm = require(npmModuleLocation)
      sandbox.stub(npm, 'view').callsFake(() => {
        return 'test'
      })
    })

    it('should call view', function () {
      const result = npm.view({})
      expect(result).to.eql('test')
    })
  })

  describe('install', function () {
    beforeEach(function () {
      sandbox.stub(childProcessPromise, 'exec').callsFake((cmd) => {
        return cmd
      })
      npm = require(npmModuleLocation)
    })

    it('should single pkg', function () {
      const promise = npm.install([{name: 'pkg1', target: '0.0.1'}])

      return promise.then((result) => {
        expect(result).to.eql('npm install --save-dev pkg1@0.0.1')
      })
    })

    it('should multiple pkg', function () {
      const promise = npm.install([
        {name: 'pkg1', target: '0.0.1'},
        {name: 'pkg2', target: '0.0.2'}
      ])

      return promise.then((result) => {
        expect(result).to.eql('npm install --save-dev pkg1@0.0.1 pkg2@0.0.2')
      })
    })
  })
})
