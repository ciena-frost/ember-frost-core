const expect = require('chai').expect
const sinon = require('sinon')
const childProcessPromise = require('child-process-promise')
const Promise = require('promise')

const npmModuleLocation = '../../../../lib/utils/npm'

describe('Unit / Lib / Utils / Npm', () => {
  let sandbox
  let npm
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
    delete require.cache['npm']
  })

  describe('_run', () => {
    beforeEach(() => {
      sandbox.stub(childProcessPromise, 'exec', (cmd) => {
        return Promise.resolve(cmd)
      })
      npm = require(npmModuleLocation)
    })

    it('no args', () => {
      const promise = npm._run('test')
      return promise.then((result) => {
        expect(result).to.eql('npm test')
      })
    })

    it('with a single arg', () => {
      const promise = npm._run('test', ['1'])

      return promise.then((result) => {
        expect(result).to.eql('npm test 1')
      })
    })

    it('with multiple args', () => {
      const promise = npm._run('test', ['1', '2'])
      return promise.then((result) => {
        expect(result).to.eql('npm test 1 2')
      })
    })
  })

  describe('view', () => {
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

    beforeEach(() => {
      npm = require(npmModuleLocation)
      sandbox.stub(npm, '_run', () => {
        return Promise.resolve({stdout: packageJson})
      })
    })

    it('no params', () => {
      const pkg = {name: 'pkg1', target: '0.0.1'}
      const promise = npm.view(pkg)

      return promise.then((result) => {
        expect(result.pkg).to.eql(pkg)
        expect(result.result).to.eql(JSON.parse(packageJson))
      })
    })
  })

  describe('getVersions', () => {
    beforeEach(() => {
      npm = require(npmModuleLocation)
      sandbox.stub(npm, 'view', () => {
        return 'test'
      })
    })

    it('view is called', () => {
      const result = npm.view({})
      expect(result).to.eql('test')
    })
  })

  describe('install', () => {
    beforeEach(() => {
      sandbox.stub(childProcessPromise, 'exec', (cmd) => {
        return cmd
      })
      npm = require(npmModuleLocation)
    })

    it('single pkg', () => {
      const promise = npm.install([{name: 'pkg1', target: '0.0.1'}])

      return promise.then((result) => {
        expect(result).to.eql('npm install --save-dev pkg1@0.0.1')
      })
    })

    it('multiple pkg', () => {
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
