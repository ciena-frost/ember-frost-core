import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {describeComponent} from 'ember-mocha'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-select',
  'FrostSelectComponent',
  {
    unit: true
  },
  function () {
    let component, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      component = this.subject()
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('should include className frost-select', function () {
      expect(component.classNames).to.include('frost-select')
    })

    describe('when onBlur property is omitted', function () {
      beforeEach(function () {
        run(() => {
          component.set('onBlur', undefined)
        })
      })

      it('should not throw an error when onBlur action is triggered', function () {
        expect(function () {
          component.get('actions.onBlur').call(component)
        }).not.to.throw(Error)
      })
    })

    describe('.didReceiveAttrs()', function () {
      ;[0, 1].forEach((selectedIndex) => {
        describe(`when selected index is ${selectedIndex} and no previous selected index`, function () {
          beforeEach(function () {
            const data = [
              {label: 'Foo', value: 'foo'},
              {label: 'Bar', value: 'bar'}
            ]
            component.set('selected', selectedIndex)
            component.set('data', data)
            const attrs = {
              newAttrs: {
                data: {
                  value: data
                },
                selected: {value: selectedIndex}
              }
            }

            component.didReceiveAttrs(attrs)
          })

          it('should set selected to expected', function () {
            const state = component.get('reduxStore').getState()
            expect(state.selectedItem).to.eql(selectedIndex)
          })
        })
      })

      describe('when previous selected value but no data', function () {
        beforeEach(function () {
          component.setProperties({
            data: [],
            selected: [],
            selectedValue: 'foo'
          })

          sandbox.stub(component, 'selectOptionByValue')

          run(() => {
            component.didReceiveAttrs({
              newAttrs: {
                data: {
                  value: [
                    {label: 'Foo', value: 'foo'},
                    {label: 'Bar', value: 'bar'}
                  ]
                },
                selectedValue: {value: 'foo'}
              },
              oldAttrs: {
                data: {value: []},
                selectedValue: {value: 'foo'}
              }
            })
          })
        })

        it('should call selectOptionByValue()', function () {
          expect(component.selectOptionByValue.lastCall.args).to.eql(['foo'])
        })
      })

      describe('when no selected value', function () {
        beforeEach(function () {
          component.setProperties({
            data: [],
            selected: [],
            selectedValue: 'foo'
          })

          sandbox.stub(component, 'selectOptionByValue')

          run(() => {
            component.didReceiveAttrs({
              newAttrs: {
                data: {value: []},
                selectedValue: {value: undefined}
              },
              oldAttrs: {
                data: {value: []},
                selectedValue: {value: undefined}
              }
            })
          })
        })

        it('should not call selectOptionByValue()', function () {
          expect(component.selectOptionByValue.called).to.be.false
        })
      })
    })
  }
)
