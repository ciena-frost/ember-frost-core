import {expect} from 'chai'
import {
  close,
  expectWithState,
  open
} from 'ember-frost-core/test-support/frost-autocomplete'
import Ember from 'ember'
import {keyCodes} from 'ember-frost-core/utils'
import {$hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const {$} = Ember
const {DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW} = keyCodes

const test = integration('frost-autocomplete')
describe(test.label, function () {
  test.setup()

  describe('renders', function () {
    let onChange, onClick, onFocus, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      onChange = sandbox.spy()
      onClick = sandbox.stub()
      onFocus = sandbox.spy()

      this.setProperties({
        hook: 'autocomplete',
        onFocus,
        onChange,
        onClick,
        tabIndex: 0 // This is the default
      })

      this.render(hbs`
        {{frost-select-outlet hook='mySelectOutlet'}}
        {{frost-autocomplete
          data=data
          disabled=disabled
          error=error
          hook=hook
          onChange=onChange
          onClick=onClick
          onFocus=onFocus
          tabIndex=tabIndex
          width=width
          wrapLabels=wrapLabels
        }}
      `)
      return wait()
    })

    afterEach(function () {
      sandbox.restore()
    })

    describe('at correct width', function () {
      const maximumWidth = 330
      const minimumWidth = 175
      const specifiedWidth = 500

      it('should if no width is specified, and container is small', function () {
        this.$().css('width', '100px')
        const actual = Math.floor(this.$('.frost-select')[0].getBoundingClientRect().width)
        expect(actual, 'it has the minimum width').to.equal(minimumWidth)
      })

      it('should if no width is specified, and container is large', function () {
        // simulate some app setting a max-width on .frost-select via CSS (as the dummy demo does)
        this.$('.frost-select').css('max-width', `${maximumWidth}px`)

        // set the container to some large width
        this.$().css('width', `${specifiedWidth}px`)

        // get the actual, factual horizontal space reserved in the layout for this element
        const actual = Math.floor(this.$('.frost-select')[0].getBoundingClientRect().width)

        expect(actual, 'it respects max-width being set').to.equal(maximumWidth)
      })

      describe('when width is set as property', function () {
        beforeEach(function () {
          return this.set('width', specifiedWidth)
        })

        it('should have the specified width regardless of container size', function () {
          // let's check both the element's style attr and what the browser layed out
          const actualCSSValue = this.$('.frost-select').css('width')
          const actualRenderedWidth = this.$('.frost-select')[0].getBoundingClientRect().width
          expect(parseInt(actualCSSValue, 10), 'in the element\'s style attr').to.equal(specifiedWidth)
          expect(parseInt(actualRenderedWidth, 10), 'and in the actual layout').to.equal(specifiedWidth)
        })
      })
    })

    describe('when data not present', function () {
      it('should render as expected', function () {
        expect($hook('autocomplete-dropdown').length).to.equal(0)

        expect(onChange.callCount, 'onChange is not called').to.equal(0)
      })

      describe('click on component', function () {
        beforeEach(function () {
          open('autocomplete-text')
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-dropdown').length).to.equal(0)

          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onClick.callCount, 'onClick is called').to.equal(1)
        })

        describe('when escape key pressed', function () {
          beforeEach(function () {
            onChange.reset()

            $(document)
              .trigger(
                $.Event('keydown', {
                  keyCode: ESCAPE
                })
              )
          })

          it('should render as expected', function () {
            expect($hook('autocomplete-dropdown').length).to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
          })
        })
      })

      describe('focus into component', function () {
        beforeEach(function () {
          return wait().then(function () {
            $hook('autocomplete-text-input').focus()
            return wait()
          })
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-text-input').is(':focus')).to.equal(true)
          expect($hook('autocomplete-dropdown').length).to.equal(0)

          expect(onChange.callCount, 'onChange is not called').to.equal(0)
        })
      })

      describe('when space bar pressed', function () {
        beforeEach(function () {
          onChange.reset()

          $hook('autocomplete-text-input')
            .trigger(
              $.Event('keypress', {
                keyCode: SPACE
              })
            )
          return wait()
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-text-input').text()).to.equal('')
          expect($hook('autocomplete-dropdown').length).to.equal(0)

          expect(onChange.callCount, 'onChange is not called').to.equal(0)
        })
      })
    })
    describe('when data present', function () {
      const data = [
        {
          label: 'Superman',
          value: 'Clark Kent'
        },
        {
          label: 'Spiderman',
          value: 'Peter Parker'
        },
        {
          label: 'Spawn',
          value: 'Al Simmons'
        }
      ]
      beforeEach(function () {
        this.set('data', data)
      })

      it('should render as expected', function () {
        expect($hook('autocomplete-dropdown').length).to.equal(0)

        expect(onChange.callCount, 'onChange is not called').to.equal(0)
      })

      describe('click on component', function () {
        beforeEach(function () {
          open('autocomplete-text')
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-dropdown').length).to.equal(0)

          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onClick.callCount, 'onClick is called').to.equal(1)
        })

        describe('when escape key pressed', function () {
          beforeEach(function () {
            onChange.reset()

            $(document)
              .trigger(
                $.Event('keydown', {
                  keyCode: ESCAPE
                })
              )
          })

          it('should render as expected', function () {
            expect($hook('autocomplete-dropdown').length).to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
          })
        })
      })

      describe('focus into component', function () {
        beforeEach(function () {
          return wait().then(function () {
            $hook('autocomplete-text-input').focus()
            return wait()
          })
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-text-input').is(':focus')).to.equal(true)
          expect($hook('autocomplete-dropdown').length).to.equal(0)

          expect(onChange.callCount, 'onChange is not called').to.equal(0)
        })
      })

      describe('when space bar pressed', function () {
        beforeEach(function () {
          onChange.reset()

          $hook('autocomplete-text-input')
            .trigger(
              $.Event('keypress', {
                keyCode: SPACE
              })
            )
          return wait()
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-text-input').text()).to.equal('')
          expect($hook('autocomplete-dropdown').length).to.equal(0)

          expect(onChange.callCount, 'onChange is not called').to.equal(0)
        })
      })

      describe('when filter present', function () {
        beforeEach(function () {
          $('.frost-autocomplete-text .frost-text-input').val('sp').trigger('input').trigger('keypress')
        })

        it('should render as expect', function () {
          expectWithState('autocomplete', {
            focused: true,
            focusedItem: 'Spiderman',
            items: ['Spiderman', 'Spawn'],
            opened: true
          })
        })

        describe('when focusout', function () {
          beforeEach(function () {
            close()
            return wait()
          })

          it('should be closed', function () {
            expect($('.frost-autocomplete-dropdown').length).to.equal(0)
          })

          describe('when click', function () {
            beforeEach(function () {
              open()
              return wait()
            })

            it('should render as expected', function () {
              expectWithState('autocomplete', {
                focused: true,
                focusedItem: 'Spiderman',
                items: ['Spiderman', 'Spawn'],
                opened: true
              })
            })
          })
        })

        describe('when escape', function () {
          beforeEach(function () {
            $(document)
              .trigger(
                $.Event('keydown', {
                  keyCode: ESCAPE
                })
              )
            return wait()
          })

          it('should be closed', function () {
            expect($('.frost-autocomplete-dropdown').length).to.equal(0)
          })
        })

        describe('when tab', function () {
          beforeEach(function () {
            $(document)
              .trigger(
                $.Event('keydown', {
                  keyCode: TAB
                })
              )
            return wait()
          })

          it('should be closed', function () {
            expect($('.frost-autocomplete-dropdown').length).to.equal(0)
          })
        })

        describe('when arrow keys', function () {
          beforeEach(function () {
            $('.frost-autocomplete-text .frost-text-input').val('s').trigger('input').trigger('keypress')
            return wait()
          })

          describe('when down arrow', function () {
            beforeEach(function () {
              $hook('autocomplete-text-input')
                .trigger(
                  $.Event('keydown', {
                    keyCode: DOWN_ARROW
                  })
                )
              return wait()
            })
            it('should move down as expected', function () {
              // debugger
              expectWithState('autocomplete', {
                focused: true,
                focusedItem: 'Spiderman',
                items: ['Superman', 'Spiderman', 'Spawn'],
                opened: true
              })
            })

            describe('when enter', function () {
              beforeEach(function () {
                $(document)
                  .trigger(
                    $.Event('keydown', {
                      keyCode: ENTER
                    })
                  )
              })

              it('should have have expected value', function () {
                expect($hook('autocomplete-text-input')[0].value).to.equal('Spiderman')
              })
            })

            describe('when up arrow', function () {
              beforeEach(function () {
                $hook('autocomplete-text-input')
                  .trigger(
                    $.Event('keydown', {
                      keyCode: UP_ARROW
                    })
                  )
                return wait()
              })
              it('should move up as expected', function () {
                // debugger
                expectWithState('autocomplete', {
                  focused: true,
                  focusedItem: 'Superman',
                  items: ['Superman', 'Spiderman', 'Spawn'],
                  opened: true
                })
              })
            })
          })
        })

        describe('when mousedown', function () {
          beforeEach(function () {
            $('.frost-select-list-item-focused').trigger('mousedown')
            return wait()
          })

          it('should select item', function () {
            expect($hook('autocomplete-text-input')[0].value).to.equal('Spiderman')
          })
        })

        describe('when mouseenter', function () {
          beforeEach(function () {
            $hook('autocomplete-dropdown-item', {index: 1}).trigger('mouseenter')
            return wait()
          })

          it('should select item', function () {
            expectWithState('autocomplete', {
              focused: true,
              focusedItem: 'Spawn',
              items: ['Spiderman', 'Spawn'],
              opened: true
            })
          })
        })
      })
    })
  })

  describe('wrap labels', function () {
    const veryLongLabel = 'Very very very very very very very very very very very very very very long label'
    const veryNotSoLongLabel = 'Very not long'
    const hook = 'autocompleteWrap'
    const data = [
      {
        label: veryNotSoLongLabel,
        value: 'veryNotSoLongLabel'
      },
      {
        label: veryLongLabel,
        value: 'veryLongLabel'
      }
    ]

    beforeEach(function () {
      this.setProperties({
        hook,
        data,
        wrapLabels: true,
        tabIndex: 0 // This is the default
      })

      this.render(hbs`
        {{frost-select-outlet hook='myWrapSelectOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          tabIndex=tabIndex
          wrapLabels=wrapLabels
        }}
      `)
      wait()

      $('.frost-autocomplete-text .frost-text-input').val('V').trigger('input').trigger('keypress')
      return wait()
    })

    it('should render correctly', function () {
      expect($hook(`${hook}-dropdown-item`, {index: 1}).text().trim()).to.equal(this.get('data')[1].label)
    })
  })

  describe('when isLoading', function () {
    const hook = 'autocompleteIsLoading'
    const data = [
      {
        label: 's',
        value: 's'
      }
    ]

    beforeEach(function () {
      this.setProperties({
        hook,
        data,
        isLoading: true,
        tabIndex: 0 // This is the default
      })

      this.render(hbs`
        {{frost-select-outlet hook='myWrapSelectOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          isLoading=isLoading
        }}
      `)
      wait()

      $('.frost-autocomplete-text .frost-text-input').val('s').trigger('input').trigger('keypress')
      return wait()
    })

    it('should render correctly', function () {
      expect($hook(`${hook}-dropdown-isLoading`).length).to.equal(1)
    })
  })

  describe('when disable', function () {
    const hook = 'autocompleteDisabled'

    beforeEach(function () {
      this.setProperties({
        hook
      })

      this.render(hbs`
        {{frost-select-outlet hook='myDisabledSelectOutlet'}}
        {{frost-autocomplete
          hook=hook
          disabled=true
        }}
      `)
      return wait()
    })

    it('should render correctly', function () {
      expect($hook(`${hook}-text-input`)[0].disabled).to.equal(true)
    })
  })
})
