/**
 * Integration test for the frost-expand component
 */

import {expect} from 'chai'
import {$hook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const componentClass = 'frost-expand'
const labelClass = componentClass + '-label'
const labelTextClass = componentClass + '-label-text'
const contentClass = componentClass + '-content'

const test = integration('frost-expand')
describe(test.label, function () {
  test.setup()

  describe('when hook is passed in', function () {
    let changeStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      changeStub = sandbox.stub()
      this.on('myChangeAction', changeStub)
      this.render(hbs`
        {{frost-expand
          hook="fe"
          expanded=false
          onChange=(action 'myChangeAction')
        }}
      `)
    })

    it('should add hook to label', function () {
      expect($hook('fe-label')).to.have.class(labelClass)
    })

    it('should add hook to label text', function () {
      expect($hook('fe-label-text')).to.have.class(labelTextClass)
    })

    it('should add hook to content', function () {
      expect($hook('fe-content')).to.have.class(contentClass)
    })
  })

  describe('when using default properties', function () {
    let changeStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      changeStub = sandbox.stub()
      this.on('myChangeAction', changeStub)
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          expanded=false
          onChange=(action 'myChangeAction')
        }}
      `)
    })

    it('should have the expand label text set correctly', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Expand')
    })

    it('should not show content', function () {
      expect(this.$('.' + componentClass)).to.have.class('collapsed')
    })
  })

  describe('when using expression form', function () {
    let changeStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      changeStub = sandbox.stub()
      this.on('myChangeAction', changeStub)
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          expanded=true
          onChange=(action 'myChangeAction')
          content="Content would be displayed here."
        }}
      `)
    })

    it('should have the content text set correctly', function () {
      expect($hook('myExpand-content').text().trim()).to.equal('Content would be displayed here.')
    })
  })

  describe('when using block form', function () {
    let changeStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      changeStub = sandbox.stub()
      this.on('myChangeAction', changeStub)
      this.render(hbs`
        {{#frost-expand
          hook="myExpand"
          expanded=true
          onChange=(action 'myChangeAction')
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
      this.setProperties({
        expanded: false
      })
      this.on('myChangeAction', function (e) {
        this.setProperties({
          expanded: e
        })
      })
      this.render(hbs`
        {{#frost-expand
          hook="myExpand"
          animationDuration=0
          expanded=expanded
          onChange=(action 'myChangeAction')
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
      expect(this.$('.' + componentClass)).to.have.class('expanded')
      expect($hook('myExpand-content').text().trim()).to.equal('Content would be displayed here.')
    })
  })

  describe('when starting in expanded state', function () {
    beforeEach(function () {
      this.setProperties({
        expanded: true
      })
      this.on('myChangeAction', function (e) {
        this.setProperties({
          expanded: e
        })
      })
      this.render(hbs`
        {{#frost-expand
          hook="myExpand"
          expanded=expanded
          onChange=(action 'myChangeAction')
        }}
          Content would be displayed here.
        {{/frost-expand}}
      `)
    })

    it('should have the expand label text set correctly', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Collapse')
    })

    it('should show content', function () {
      expect(this.$('.' + componentClass)).to.have.class('expanded')
      expect($hook('myExpand-content').text().trim()).to.equal('Content would be displayed here.')
    })
  })

  describe('when changing to collapsed state', function () {
    beforeEach(function () {
      this.setProperties({
        expanded: true
      })
      this.on('myChangeAction', function (e) {
        this.setProperties({
          expanded: e
        })
      })
      this.render(hbs`
        {{#frost-expand
          hook="myExpand"
          expanded=expanded
          onChange=(action 'myChangeAction')
          animationDuration=0
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
      expect(this.$('.' + componentClass)).to.have.class('collapsed')
    })
  })

  describe('when changing to expanded state then back to collapsed state', function () {
    beforeEach(function () {
      this.setProperties({
        expanded: false
      })
      this.on('myChangeAction', function (e) {
        this.setProperties({
          expanded: e
        })
      })
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          animationDuration=0
          expanded=expanded
          onChange=(action 'myChangeAction')
        }}
      `)

      $hook('myExpand-label').click()
      $hook('myExpand-label').click()
    })

    it('should have the collapse label text set correctly', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Expand')
    })

    it('should not show details', function () {
      expect(this.$('.' + componentClass)).to.have.class('collapsed')
    })
  })

  describe('when overwriting default expand label', function () {
    let changeStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      changeStub = sandbox.stub()
      this.on('myChangeAction', changeStub)
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          expandLabel="View information"
          expanded=false
          onChange=(action 'myChangeAction')
        }}
      `)
    })

    it('should have the overwritten expand label text set correctly and content hidden', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('View information')
      expect(this.$('.' + componentClass)).to.have.class('collapsed')
    })
  })

  describe('when overwriting default collapse label', function () {
    let changeStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      changeStub = sandbox.stub()
      this.on('myChangeAction', changeStub)
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          animationDuration=0
          expanded=true
          onChange=(action 'myChangeAction')
          collapseLabel="Hide information"
          content="Content would be displayed here."
        }}
      `)
    })

    it('should have the overwritten collapse label text set correctly and content visible', function () {
      expect($hook('myExpand-label-text').text().trim()).to.equal('Hide information')
      expect(this.$('.' + componentClass)).to.have.class('expanded')
      expect($hook('myExpand-content').text().trim()).to.equal('Content would be displayed here.')
    })
  })

  describe('when expanding, event handler should be called passing true', function () {
    let changeStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      changeStub = sandbox.stub()
      this.on('myChangeAction', changeStub)
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          animationDuration=0
          expanded=false
          onChange=(action 'myChangeAction')
        }}
      `)

      $hook('myExpand-label').click()
    })

    it('should only call collapse event handler', function () {
      expect(changeStub).to.have.been.calledWith(true)
    })
  })

  describe('when collapsing, event handler should be called passing false', function () {
    let changeStub, sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      changeStub = sandbox.stub()
      this.on('myChangeAction', changeStub)
      this.render(hbs`
        {{frost-expand
          hook="myExpand"
          animationDuration=0
          expanded=true
          onChange=(action 'myChangeAction')
        }}
      `)

      $hook('myExpand-label').click()
    })

    it('should only call collapse event handler', function () {
      expect(changeStub).to.have.been.calledWith(false)
    })
  })

  describe('when isChevronOnlyClickTrigger property is set', function () {
    beforeEach(function () {
      this.setProperties({
        expanded: false
      })
      this.on('myChangeAction', function (e) {
        this.setProperties({
          expanded: e
        })
      })
      this.render(hbs`
        {{#frost-expand
          hook="myExpand"
          expanded=expanded
          onChange=(action 'myChangeAction')
          animationDuration=0
          isChevronOnlyClickTrigger=true
        }}
          Content would be displayed here.
        {{/frost-expand}}
      `)
    })

    it('should not show content on label click', function () {
      $hook('myExpand-label').click()
      expect(this.$('.' + componentClass)).to.have.class('collapsed')
    })

    it('should show content on chevron click', function () {
      $hook('myExpand-label-chevron').click()
      expect(this.$('.' + componentClass)).to.have.class('expanded')
    })
  })
})
