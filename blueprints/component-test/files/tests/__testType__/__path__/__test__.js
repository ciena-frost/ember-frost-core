/**
 * <%= capitalizedTestType %> test for the <%= dasherizedModuleName %> component
 */

import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
<% if (testType === 'integration' ) { %>import hbs from 'htmlbars-inline-precompile'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {afterEach, beforeEach, describe} from 'mocha'<% } else { %>
import {afterEach, beforeEach, describe} from 'mocha'<% } %>
import sinon from 'sinon'

import {<%= testType %>} from '<%= dasherizedPackageName %>/tests/helpers/ember-test-utils/describe-component'

describeComponent(...<%= testType %>('<%= dasherizedModuleName %>'), function () {
  <% if (testType === 'unit' ) { %>let component, sandbox<% } else { %>let sandbox<% } %>

  beforeEach(function () {
    <% if (testType === 'integration') { %>sandbox = sinon.sandbox.create()
    initializeHook()<% } else { %>sandbox = sinon.sandbox.create()<% } %>
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should have real tests', function () {
    expect(true).to.equal(false)
  })

  <% if (testType === 'integration' ) { %>describe('after render', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myThing'
      })

      this.render(hbs`
        {{<%= dasherizedModuleName %>
          hook=myHook
        }}
      `)

      return wait()
    })

    it('should have an element', function () {
      expect(this.$()).to.have.length(1)
    })

    it('should be accessible via the hook', function () {
      expect($hook('myThing')).to.have.length(1)
    })
  })<% } else { %>describe('when hook is given', function () {
    beforeEach(function () {
      component = this.subject({hook: 'myHook'})
    })

    it('should set hookPrefix', function () {
      expect(component.get('hookPrefix')).to.equal('myHook-')
    })
  })<% } %>
})
