const expect = chai.expect
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import {afterEach, beforeEach, describe, it} from 'mocha'

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

    it('includes className frost-select', function () {
      expect(component.classNames).to.include('frost-select')
    })

    describe('when onBlur property is omitted', function () {
      beforeEach(function () {
        run(() => {
          component.set('onBlur', undefined)
        })
      })

      it('does not throw an error when onBlur action is triggered', function () {
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

          it('sets selected to expected', function () {
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

        it('sets selected to expected', function () {
          expect(component.selectOptionByValue.lastCall.args).to.eql(['foo'])
        })
      })
    })
  }
)
