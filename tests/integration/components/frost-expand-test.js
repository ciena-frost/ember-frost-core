/**
 * Integration test for the frost-expand component
 */

import {expect} from 'chai'
import {$hook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = integration('frost-expand')
describe(test.label, function () {
  test.setup()

  describe('when hook is passed in', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-expand
          hook="fe"
        }}
      `)
    })

    it('should add hook to label', function () {
      expect($hook('fe-label')).to.have.class('frost-expand-label')
    })

    it('should add hook to label text', function () {
      expect($hook('fe-label-text')).to.have.class('frost-expand-label-text')
    })

    it('should add hook to content', function () {
      expect($hook('fe-content')).to.have.class('frost-expand-content')
    })
  })

  describe('when using default properties', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
        }}
      `)
    })

    it('should have the expand label text set correctly', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Expand')
    })

    it('should not show content', function () {
      expect($hook('myExpand-content')).to.be.hidden
    })
  })

  describe('when using expression form', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          expanded=true
          content="Content would be displayed here."
        }}
      `)
    })

    it('should have the content text set correctly', function () {
      expect($hook('myExpand-content').text().trim()).to.equal('Content would be displayed here.')
    })
  })

  describe('when using block form', function () {
    beforeEach(function () {
      this.render(hbs`
        {{#frost-expand
          hook="myExpand"
          expanded=true
        }}
          Content would be displayed here.
        {{/frost-expand}}
      `)
    })

    it('should have the content text set correctly', function () {
      expect($hook('myExpand-content').text().trim()).to.equal('Content would be displayed here.')
    })
  })

  describe('when changing to expanded state', function () {
    beforeEach(function () {
      this.render(hbs`
        {{#frost-expand
          hook="myExpand"
          duration="none"
        }}
          Content would be displayed here.
        {{/frost-expand}}
      `)

      $hook('myExpand-label').click()
    })

    it('should have the collapse label text set correctly', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Collapse')
    })

    it('should show content', function () {
      expect($hook('myExpand-content')).to.be.visible
      expect($hook('myExpand-content').text().trim()).to.equal('Content would be displayed here.')
    })
  })

  describe('when starting in expanded state', function () {
    beforeEach(function () {
      this.render(hbs`
        {{#frost-expand
          hook="myExpand"
          expanded=true
        }}
          Content would be displayed here.
        {{/frost-expand}}
      `)
    })

    it('should have the expand label text set correctly', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Collapse')
    })

    it('should show content', function () {
      expect($hook('myExpand-content')).to.be.visible
      expect($hook('myExpand-content').text().trim()).to.equal('Content would be displayed here.')
    })
  })

  describe('when changing to collapsed state', function () {
    beforeEach(function () {
      this.render(hbs`
        {{#frost-expand
          hook="myExpand"
          expanded=true
          duration="none"
        }}
          Content would be displayed here.
        {{/frost-expand}}
      `)

      $hook('myExpand-label').click()
    })

    it('should have the expand label text set correctly', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Expand')
    })

    it('should not show content', function () {
      expect($hook('myExpand-content')).to.be.hidden
    })
  })

  describe('when changing to expanded state then back to collapsed state', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          duration="none"
        }}
      `)

      $hook('myExpand-label').click()
      $hook('myExpand-label').click()
    })

    it('should have the collapse label text set correctly', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Expand')
    })

    it('should not show details', function () {
      expect($hook('myExpand-content')).to.be.hidden
    })
  })

  describe('when overwriting default expand label', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          duration="none"
          expandLabel="View information"
        }}
      `)
    })

    it('should have the overwritten expand label text set correctly and content hidden', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('View information')
      expect($hook('myExpand-content')).to.be.hidden
    })
  })

  describe('when overwriting default collapse label', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          duration="none"
          expanded=true
          collapseLabel="Hide information"
          content="Content would be displayed here."
        }}
      `)
    })

    it('should have the overwritten collapse label text set correctly and content visible', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Hide information')
      expect($hook('myExpand-content')).to.be.visible
      expect($hook('myExpand-content').text().trim()).to.equal('Content would be displayed here.')
    })
  })

  describe('when setting expand event handler', function () {
    let expandStub, collapseStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      expandStub = sandbox.stub()
      collapseStub = sandbox.stub()
      this.on('myExpandAction', expandStub)
      this.on('myCollapseAction', collapseStub)
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          duration="none"
          onExpand=(action 'myExpandAction')
          onCollapse=(action 'myCollapseAction')
        }}
      `)

      $hook('myExpand-label').click()
    })

    it('should only call expand event handler', function () {
      expect(expandStub).to.have.callCount(1)
      expect(collapseStub).to.have.callCount(0)
    })
  })

  describe('when setting collapse event handler', function () {
    let expandStub, collapseStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      expandStub = sandbox.stub()
      collapseStub = sandbox.stub()
      this.on('myExpandAction', expandStub)
      this.on('myCollapseAction', collapseStub)
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          duration="none"
          expanded=true
          onExpand=(action 'myExpandAction')
          onCollapse=(action 'myCollapseAction')
        }}
      `)

      $hook('myExpand-label').click()
    })

    it('should only call collapse event handler', function () {
      expect(expandStub).to.have.callCount(0)
      expect(collapseStub).to.have.callCount(1)
    })
  })
})
