import {expect} from 'chai'
import Ember from 'ember'
const {ViewUtils} = Ember
import {$hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

/**
 * Helper to streamline tests for onToggle callback
 * Triggers a click on the label and then checks the onToggle stub for expected behavior
 * @param {Object} ctx - the context object for the test
 * @param {Sinon.Stub} ctx.stub - the sinon stub to inspect
 * @param {*} expectedValue - the value expected to be passed into the stub
 */
function itShouldCallOnToggleWithProperValue (ctx, expectedValue) {
  describe('when the label is clicked', function () {
    let stub
    beforeEach(function () {
      stub = ctx.stub
      $hook('myToggle-toggle-label').click()
      return wait()
    })

    it('should call onToggle with the new value', function () {
      expect(stub).to.have.been.calledWith(expectedValue)
    })
  })
}

/**
 * Helper to streamline tests for onToggle callback
 * Triggers a click on the label and then checks the onToggle stub for expected behavior
 * @param {Object} ctx - the context object for the test
 * @param {Sinon.Stub} ctx.stub - the sinon stub to inspect
 */
function itShouldNotCallOnToggle (ctx) {
  describe('when the label is clicked', function () {
    let stub
    beforeEach(function () {
      stub = ctx.stub
      $hook('myToggle-toggle-label').click()
      return wait()
    })

    it('should not call onToggle with the new value', function () {
      expect(stub).to.have.callCount(0)
    })
  })
}

const test = integration('frost-toggle')
describe(test.label, function () {
  test.setup()

  const ctx = {}
  let stub, sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    stub = ctx.stub = sandbox.stub()
    this.set('myActionStub', stub)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when rendered with defaults', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle hook='myToggle'}}
      `)

      return wait()
    })

    it('should default the "type" to "checkbox"', function () {
      expect(this.$('.frost-toggle input')).to.have.prop('type', 'checkbox')
    })

    it('should render a .frost-toggle-input element', function () {
      expect(this.$('.frost-toggle-input')).to.have.length(1)
    })

    it('should put the "frost-toggle-button" class on the label', function () {
      expect(this.$('.frost-toggle label')).to.have.class('frost-toggle-button')
    })

    it('should set proper "for" property on the label', function () {
      const id = this.$('.frost-toggle input').prop('id')
      expect(this.$('.frost-toggle label')).to.have.prop('for', id)
    })
  })

  describe('when trueValue and falseValue are the same', function () {
    let renderIt
    beforeEach(function () {
      renderIt = () => {
        this.render(hbs`
          {{frost-toggle
            hook='myToggle'
            trueValue='testValue'
            falseValue='testValue'
          }}
        `)
      }
    })

    it('should throw an error', function () {
      expect(renderIt).to.throw(/Same value has been assigned/)
    })
  })

  describe('when disabled property is passed in', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          disabled=true
          hook='myToggle'
        }}
      `)

      return wait()
    })

    it('should set the disabled property on the input', function () {
      expect(this.$('.frost-toggle input')).to.have.prop('disabled', true)
    })
  })

  describe('when hook is passed in', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          hook='ft'
        }}
      `)

      return wait()
    })

    it('should add a hook to the input', function () {
      expect($hook('ft-toggle-input')).to.have.class('frost-toggle-input')
    })

    it('should add a hook to the label', function () {
      expect($hook('ft-toggle-label')).to.have.class('frost-toggle-button')
    })

    it('should add a hook to the on text', function () {
      expect($hook('ft-toggle-text-on')).to.have.class('frost-toggle-text on')
    })

    it('should add a hook to the off text', function () {
      expect($hook('ft-toggle-text-off')).to.have.class('frost-toggle-text off')
    })
  })

  describe('when a value is passed in', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          hook='myToggle'
          value='test value'
        }}
      `)

      return wait()
    })

    it('should start out on', function () {
      expect(this.$('.frost-toggle input')).to.have.value('on')
    })
  })

  describe('when passing in a trueLabel', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          hook='myToggle'
          trueLabel='Label On'
          value='on'
        }}
      `)

      return wait()
    })

    it('should use the passed in label text', function () {
      expect($hook('myToggle-toggle-text-on')).to.have.text('Label On')
    })
  })

  describe('when not passing in a trueLabel', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          hook='myToggle'
          value='on'
        }}
      `)

      return wait()
    })

    it('should use the default in label text', function () {
      expect($hook('myToggle-toggle-text-on')).to.have.text('On')
    })
  })

  describe('when passing in a falseLabel', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          hook='myToggle'
          falseLabel='Label Off'
          value='off'
        }}
      `)

      return wait()
    })

    it('should use the passed in label text', function () {
      expect($hook('myToggle-toggle-text-off')).to.have.text('Label Off')
    })
  })

  describe('when not passing in a falseLabel', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          hook='myToggle'
          value='off'
        }}
      `)

      return wait()
    })

    it('should use the default in label text', function () {
      expect($hook('myToggle-toggle-text-off')).to.have.text('Off')
    })
  })

  describe('when trueValue is passed in', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          hook='myToggle'
          trueValue='enabled'
          value='enabled'
        }}
      `)

      return wait()
    })

    it('recognizes the true value and sets the On state', function () {
      expect($hook('myToggle-toggle-input')).to.have.prop('checked')
    })
  })

  describe('when falseValue is passed in', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          hook='myToggle'
          falseValue='disabled'
          value='disabled'
        }}
      `)

      return wait()
    })

    it('recognizes the false value and sets the Off state', function () {
      expect($hook('myToggle-toggle-input')).to.have.prop('checked', false)
    })
  })

  describe('when rendering using spread', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          options=(hash
            disabled=true
            hook='myToggle'
          )
        }}
      `)

      return wait()
    })

    it('should pass along the disabled property', function () {
      expect($hook('myToggle-toggle-input')).to.have.prop('disabled', true)
    })
  })

  describe('when given an onToggle', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          hook='myToggle'
          value='false'
          onToggle=myActionStub
        }}
      `)

      return wait()
    })

    itShouldCallOnToggleWithProperValue(ctx, true)
  })

  describe('when given an onToggle, but disabled', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          disabled=true
          hook='myToggle'
          value='false'
          onToggle=myActionStub
        }}
      `)

      return wait()
    })

    itShouldNotCallOnToggle(ctx)
  })

  // NOTE: this is exercising a bug found in v1.16.0 to make sure it doesn't regress
  // https://github.com/ciena-frost/ember-frost-core/issues/439 (@job13er 2017-04-27)
  describe('When trueValue is falsy, and trueLabel is set', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          trueLabel='True'
          trueValue=false
          falseValue=true
          hook='myToggle'
          value=true
          onToggle=myActionStub
        }}
      `)

      return wait()
    })

    itShouldCallOnToggleWithProperValue(ctx, false)
  })

  // NOTE: this is exercising a bug found in v1.16.0 to make sure it doesn't regress
  // https://github.com/ciena-frost/ember-frost-core/issues/439 (@job13er 2017-04-27)
  describe('When falseValue is falsy, and falseLabel is set', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-toggle
          falseLabel='False'
          trueValue=true
          falseValue=false
          hook='myToggle'
          value='true'
          onToggle=myActionStub
        }}
      `)

      return wait()
    })

    itShouldCallOnToggleWithProperValue(ctx, false)
  })

  // NOTE: just to make sure nothing breaks before the deprecated onClick is removed (@job13er 2017-04-27)
  describe('onClick', function () {
    describe('when given a closure action', function () {
      beforeEach(function () {
        this.on('myAction', stub)

        this.render(hbs`
          {{frost-toggle
            trueValue='enabled'
            falseValue='disabled'
            hook='myToggle'
            value='enabled'
            onClick=(action 'myAction')
          }}
        `)

        return wait()
      })

      describe('when the label is clicked', function () {
        beforeEach(function () {
          this.$('label').click()
          return wait()
        })

        it('should call the action', function () {
          expect(stub).to.have.callCount(1)
        })
      })
    })

    describe('when click is not simple', function () {
      beforeEach(function () {
        sandbox.stub(ViewUtils, 'isSimpleClick').returns(false)
        this.on('myAction', stub)

        this.render(hbs`
          {{frost-toggle
            trueValue='enabled'
            falseValue='disabled'
            hook='myToggle'
            value='enabled'
            onClick=(action 'myAction')
          }}
        `)

        return wait()
      })

      describe('when the label is clicked', function () {
        beforeEach(function () {
          this.$('label').click()
          return wait()
        })

        it('should not call the action', function () {
          expect(stub).to.have.callCount(0)
        })
      })
    })

    describe('when given a closure function', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-toggle
            trueValue='enabled'
            falseValue='disabled'
            hook='myToggle'
            value='disabled'
            onClick=(action myActionStub)
          }}
        `)

        return wait()
      })

      describe('when the label is clicked', function () {
        beforeEach(function () {
          this.$('label').click()
          return wait()
        })

        it('should call the action', function () {
          expect(stub).to.have.callCount(1)
        })
      })
    })

    describe('when using mut helper', function () {
      beforeEach(function () {
        this.set('myValue', 'disabled')

        this.render(hbs`
          {{frost-toggle
            trueValue='enabled'
            falseValue='disabled'
            hook='myToggle'
            value='disabled'
            onClick=(action (mut myValue) value="target.value")
          }}
        `)

        return wait()
      })

      describe('when the label is clicked', function () {
        beforeEach(function () {
          this.$('label').click()
          return wait()
        })

        it('should mutate the value', function () {
          expect(this.get('myValue')).to.equal('enabled')
        })
      })
    })
  })
})
