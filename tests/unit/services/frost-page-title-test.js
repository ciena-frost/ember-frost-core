import {expect} from 'chai'
import {service} from 'ember-test-utils/test-support/setup-test'
import {afterEach, beforeEach, describe, it} from 'mocha'

const test = service('frost-page-title')

describe(test.label, function () {
  let service

  test.setup()

  beforeEach(function () {
    service = this.subject()
  })

  afterEach(function () {
    window.location.hash = ''
    service.updateTitle()
  })

  it('should start with an empty sections array', function () {
    expect(service.get('sections')).to.eql([])
  })

  describe('update', function () {
    it('should use default when sections is empty', function () {
      service.updateTitle()
      expect(document.title).to.equal('ember-frost-core tests')
    })

    it('should use values from sections if not empty', function () {
      service.set('sections', ['Foo'])
      service.updateTitle()
      expect(document.title).to.equal('Foo')
    })

    it('should join values with " | "', function () {
      service.set('sections', ['Foo', 'Bar'])
      service.updateTitle()
      expect(document.title).to.equal('Foo | Bar')
    })
  })

  describe('defaultHandler', function () {
    it('should return empty array when window.location.hash is empty', function () {
      window.location.hash = ''
      expect(service.defaultHandler()).to.eql([])
    })

    it('should return capitalized version of words from window.location.hash', function () {
      window.location.hash = '/foo-bar'
      expect(service.defaultHandler()).to.eql(['Foo Bar'])
    })

    it('should ignore non-wordy things', function () {
      window.location.hash = '/foo/123/bar'
      expect(service.defaultHandler()).to.eql(['Foo', 'Bar'])
    })
  })

  describe('resetSections', function () {
    it('should reset sections as an array of just the value from the defaultHander', function () {
      window.location.hash = '/foo/123/bar-baz'
      service.resetSections()
      expect(service.get('sections')).to.eql(['Foo', 'Bar Baz'])
    })
  })
})
