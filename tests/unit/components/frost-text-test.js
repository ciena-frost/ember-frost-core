import chai from 'chai'
const expect = chai.expect
import sinon from 'sinon'
import {describeComponent} from 'ember-mocha'
import {beforeEach, afterEach, describe, it} from 'mocha'

function testPassthroughEventHandlers (ctx, eventName, handlerName, event) {
  describe('when no handler defined', function () {
    beforeEach(function () {
      ctx.component.set(handlerName, undefined)
    })

    it(`does not throw an error when ${eventName} is fired`, function () {
      expect(() => {
        ctx.component[eventName](event)
      }).not.to.throw(Error)
    })
  })

  describe('when handler is defined', function () {
    let handler
    beforeEach(function () {
      handler = ctx.sandbox.stub()
      ctx.component.set(handlerName, handler)
      ctx.component[eventName](event)
    })

    it('passes the event to the handler', function () {
      expect(handler.lastCall.args).to.be.eql([event])
    })
  })
}

describeComponent(
  'frost-text',
  'FrostTextComponent',
  {
    unit: true
  },
  function () {
    let component, sandbox

    beforeEach(function () {
      component = this.subject()
      sandbox = sinon.sandbox.create()
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('includes className frost-text', function () {
      expect(component.classNames).to.include('frost-text')
    })

    it('defaults to zero tabindex', function () {
      expect(component.tabindex).to.equal(0)
      expect(this.$('input').prop('tabindex')).to.equal(0)
    })

    it('passes tabindex to the underlying field', function () {
      component.set('tabindex', -1)
      expect(component.tabindex).to.equal(-1)
      expect(this.$('input').prop('tabindex')).to.equal(-1)
    })

    describe('computed properties', function () {
      describe('align/center', function () {
        describe('when "align" is "right"', function () {
          beforeEach(function () {
            component.set('align', 'right')
          })

          it('computes "right" to be true', function () {
            expect(component.get('right')).to.be.true
          })

          it('computes "center" to be false', function () {
            expect(component.get('center')).to.be.false
          })
        })

        describe('when "align" is "center"', function () {
          beforeEach(function () {
            component.set('align', 'center')
          })

          it('computes "right" to be false', function () {
            expect(component.get('right')).to.be.false
          })

          it('computes "center" to be true', function () {
            expect(component.get('center')).to.be.true
          })
        })
      })

      describe('showClear', function () {
        describe('when enabled with a value', function () {
          beforeEach(function () {
            component.setProperties({
              disabled: false,
              value: 'foo-bar'
            })
          })

          it('sets "showClear" to true', function () {
            expect(component.get('showClear')).to.be.true
          })
        })
      })
    })

    describe('Events', function () {
      let ctx = {}
      beforeEach(function () {
        ctx.component = component
        ctx.sandbox = sandbox
      })

      describe('focusIn', function () {
        let focusInEvent
        beforeEach(function () {
          focusInEvent = {
            name: 'my-focus-in-event',
            target: {
              select: sandbox.stub()
            }
          }
        })
        describe('when no handlers defined', function () {
          beforeEach(function () {
            component.setProperties({
              onFocus: undefined,
              onFocusIn: undefined
            })

            component.focusIn(focusInEvent)
          })

          it('calls select() on event.target', function () {
            expect(focusInEvent.target.select.callCount).to.equal(1)
          })
        })

        describe('when handler defined', function () {
          let onFocus, onFocusIn
          beforeEach(function () {
            onFocus = sandbox.stub()
            onFocusIn = sandbox.stub()
            component.setProperties({onFocus, onFocusIn})

            component.focusIn(focusInEvent)
          })

          it('calls select() on event.target', function () {
            expect(focusInEvent.target.select.callCount).to.equal(1)
          })

          it('passes the event to onFocus', function () {
            expect(onFocus.lastCall.args).to.be.eql([focusInEvent])
          })

          it('passes the event to onFocusIn', function () {
            expect(onFocusIn.lastCall.args).to.be.eql([focusInEvent])
          })
        })
      })

      describe('focusOut', function () {
        testPassthroughEventHandlers(ctx, 'focusOut', 'onBlur', {name: 'my-focus-out-event'})
        testPassthroughEventHandlers(ctx, 'focusOut', 'onFocusOut', {name: 'my-focus-out-event'})
      })

      describe('input', function () {
        let inputEvent, id
        beforeEach(function () {
          inputEvent = {
            target: {
              value: 'my-text'
            }
          }

          id = 'my-id'
          component.set('id', id)
        })

        describe('when no handler defined', function () {
          beforeEach(function () {
            component.set('onInput', undefined)
          })

          it('does not throw an error when focusOut event is fired', function () {
            expect(() => {
              component.input(inputEvent)
            }).not.to.throw(Error)
          })
        })

        describe('when handler defined', function () {
          let onInput
          beforeEach(function () {
            onInput = sandbox.stub()
            component.set('onInput', onInput)
            component.input(inputEvent)
          })

          it('passes the event to onInput', function () {
            expect(onInput.lastCall.args).to.be.eql([{
              id,
              value: inputEvent.target.value
            }])
          })
        })
      })

      describe('keyDown', function () {
        testPassthroughEventHandlers(ctx, 'keyDown', 'onKeyDown', {name: 'my-key-down-event'})
      })

      describe('keyUp', function () {
        testPassthroughEventHandlers(ctx, 'keyUp', 'onKeyUp', {name: 'my-key-up-event'})
      })
    })
  }
)
