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

const {$, run} = Ember
const {BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW} = keyCodes

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
        {{frost-autocomplete-outlet hook='myAutocompleteOutlet'}}
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

      it('should be min-width if width is specified and container is small', function () {
        this.$().css('width', '100px')
        const actual = Math.floor(this.$('.frost-autocomplete')[0].getBoundingClientRect().width)
        expect(actual, 'it has the minimum width').to.equal(minimumWidth)
      })

      it('should be max-width if width is specified, and container is large', function () {
        // simulate some app setting a max-width on .frost-autocomplete via CSS (as the dummy demo does)
        this.$('.frost-autocomplete').css('max-width', `${maximumWidth}px`)

        // set the container to some large width
        this.$().css('width', `${specifiedWidth}px`)

        // get the actual, factual horizontal space reserved in the layout for this element
        const actual = Math.floor(this.$('.frost-autocomplete')[0].getBoundingClientRect().width)

        expect(actual, 'it respects max-width being set').to.equal(maximumWidth)
      })

      describe('when width is set as property', function () {
        beforeEach(function () {
          return this.set('width', specifiedWidth)
        })

        it('should have the specified width regardless of container size', function () {
          // let's check both the element's style attr and what the browser layed out
          const actualCSSValue = this.$('.frost-autocomplete').css('width')
          const actualRenderedWidth = this.$('.frost-autocomplete')[0].getBoundingClientRect().width
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
          open('autocomplete-autocompleteText')
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
            $hook('autocomplete-autocompleteText-input').focus()
            return wait()
          })
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-dropdown').length).to.equal(0)

          expect(onChange.callCount, 'onChange is not called').to.equal(0)
        })
      })

      describe('when space bar pressed', function () {
        beforeEach(function () {
          onChange.reset()

          $hook('autocomplete-autocompleteText-input')
            .trigger(
              $.Event('keypress', {
                keyCode: SPACE
              })
            )
          return wait()
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-autocompleteText-input').text()).to.equal('')
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
          open('autocomplete-autocompleteText')
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
            $hook('autocomplete-autocompleteText-input').focus()
            return wait()
          })
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-dropdown').length).to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
        })
      })

      describe('when space bar pressed', function () {
        beforeEach(function () {
          onChange.reset()

          $hook('autocomplete-autocompleteautocompleteText-input')
            .trigger(
              $.Event('keypress', {
                keyCode: SPACE
              })
            )
          return wait()
        })

        it('should render as expected', function () {
          expect($hook('autocomplete-autocompleteText-input').text()).to.equal('')
          expect($hook('autocomplete-dropdown').length).to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
        })
      })

      describe('when not useful filter present', function () {
        beforeEach(function () {
          $hook('autocomplete-autocompleteText-input').val('nothing').trigger('input').trigger('keypress')
          return wait()
        })

        it('should render empty message', function () {
          expect($('.frost-autocomplete-dropdown-empty-msg').length).to.equal(1)
        })
      })

      describe('when filter with no data', function () {
        beforeEach(function () {
          this.set('data', null)
          wait()
          $hook('autocomplete-autocompleteText-input').val('nothing').trigger('input').trigger('keypress')
          return wait()
        })

        it('should render empty message', function () {
          expect($('.frost-autocomplete-dropdown-empty-msg').length).to.equal(1)
        })
      })

      describe('when filter present', function () {
        beforeEach(function () {
          $hook('autocomplete-autocompleteText-input').val('sp').trigger('input').trigger('keypress')
        })

        it('should render as expect', function () {
          expectWithState('autocomplete', {
            focused: true,
            focusedItem: 'Spiderman',
            items: ['Spiderman', 'Spawn'],
            opened: true
          })
        })

        describe('when close', function () {
          beforeEach(function () {
            close()
            return wait()
          })

          it('should be closed', function () {
            expect($('.frost-autocomplete-dropdown').length).to.equal(0)
          })

          describe('when disabled', function () {
            beforeEach(function () {
              this.set('disabled', true)
              wait()

              $hook('autocomplete-autocompleteText-input')
                .val('sp')
                .trigger('input')
                .trigger('keypress')
                .trigger('focusin')
              return wait()
            })

            it('should render as expected', function () {
              expect($('.frost-autocomplete-dropdown').length).to.equal(0)
            })
          })
          describe('when backspace', function () {
            beforeEach(function () {
              $hook('autocomplete-autocompleteText-input')
                .trigger('focusin')
                .trigger($.Event('keydown', {keyCode: BACKSPACE}))
              return wait()
            })

            it('should render as expected', function () {
              expect($('.frost-autocomplete-dropdown').length).to.equal(1)
            })
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

          describe('focus into component', function () {
            beforeEach(function () {
              $hook('autocomplete-autocompleteText-input').focusin()
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
            $hook('autocomplete-autocompleteText-input').val('s').trigger('input').trigger('keypress')
            return wait()
          })

          describe('when down arrow', function () {
            beforeEach(function () {
              $hook('autocomplete-autocompleteText-input')
                .trigger(
                  $.Event('keydown', {
                    keyCode: DOWN_ARROW
                  })
                )
              return wait()
            })
            it('should move down as expected', function () {
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
                expect($hook('autocomplete-autocompleteText-input')[0].value).to.equal('Spiderman')
              })
            })

            describe('when up arrow', function () {
              beforeEach(function () {
                $hook('autocomplete-autocompleteText-input')
                  .trigger(
                    $.Event('keydown', {
                      keyCode: UP_ARROW
                    })
                  )
                return wait()
              })
              it('should move up as expected', function () {
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
            $('.frost-autocomplete-list-item-focused').trigger('mousedown')
            return wait()
          })

          it('should select item', function () {
            expect($hook('autocomplete-autocompleteText-input')[0].value).to.equal('Spiderman')
          })
          it('should have onChange', function () {
            expect(onChange.callCount, 'onChange is called').to.equal(1)
            expect(onChange.args.length, 'onChange arguments length').to.equal(1)
            expect(onChange.args[0][0], 'onChange argument').to.equal('Peter Parker')
          })
        })

        describe('when mouseenter', function () {
          beforeEach(function () {
            $hook('autocomplete-autocompleteDropdown-item', {index: 1}).trigger('mouseenter')
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

  describe('default tabIndex', function () {
    const hook = 'tabIndex'

    beforeEach(function () {
      this.setProperties({
        hook
      })

      this.render(hbs`
        {{frost-autocomplete-outlet hook='myDefaultTabIndexOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
        }}
      `)
    })

    it('should have default tabIndex', function () {
      expect($hook(hook).find('input')[0].tabIndex).to.equal(0)
    })
  })

  describe('when selectedValue', function () {
    const hook = 'selectedValue'
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
    const selectedValue = data[1].value

    beforeEach(function () {
      this.setProperties({
        hook,
        data,
        selectedValue,
        tabIndex: 0
      })

      this.render(hbs`
        {{frost-autocomplete-outlet hook='myWrapOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          selectedValue=selectedValue
          tabIndex=tabIndex
        }}
      `)
      wait()

      $hook(`${hook}-autocompleteText-input`).val('s').trigger('input').trigger('keypress')
      return wait()
    })

    it('should render as expected', function () {
      expect($('.frost-autocomplete-list-item-selected').text().trim()).to.equal(data[1].label)
    })
  })

  describe('when contains', function () {
    const hook = 'contains'
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
      this.setProperties({
        hook,
        data,
        filterType: 'contains',
        tabIndex: 0
      })

      this.render(hbs`
        {{frost-autocomplete-outlet hook='myContainsOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          filterType=filterType
          tabIndex=tabIndex
        }}
      `)
      wait()

      $hook(`${hook}-autocompleteText-input`).val('ider').trigger('input').trigger('keypress')
      return wait()
    })

    it('should render as expected', function () {
      expectWithState(hook, {
        focused: true,
        focusedItem: 'Spiderman',
        items: ['Spiderman'],
        opened: true
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
        {{frost-autocomplete-outlet hook='myWrapOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          tabIndex=tabIndex
          wrapLabels=wrapLabels
        }}
      `)
      wait()

      $hook(`${hook}-autocompleteText-input`).val('V').trigger('input').trigger('keypress')
      return wait()
    })

    it('should render correctly', function () {
      expect($hook(`${hook}-autocompleteDropdown-item`, {index: 1}).text().trim()).to.equal(this.get('data')[1].label)
    })
  })

  describe('long labels', function () {
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
        width: 300,
        tabIndex: 0 // This is the default
      })

      this.render(hbs`
        {{frost-autocomplete-outlet hook='myWrapOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          tabIndex=tabIndex
          width=width
        }}
      `)
      wait()

      $hook(`${hook}-autocompleteText-input`).val('V').trigger('input').trigger('keypress')
      return wait()
    })

    it('should render correctly', function () {
      expect($hook(`${hook}-autocompleteDropdown-item`, {index: 1}).text().trim())
        .to.not.equal(this.get('data')[1].label)
      expect($hook(`${hook}-autocompleteDropdown-item`, {index: 1}).text().trim()).to.contain('…')
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
        {{frost-autocomplete-outlet hook='myWrapOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          isLoading=isLoading
        }}
      `)
      wait()

      $hook(`${hook}-autocompleteText-input`).val('s').trigger('input').trigger('keypress')
      return wait()
    })

    it('should render correctly', function () {
      expect($hook(`${hook}-autocompleteDropdown-isLoading`).length).to.equal(1)
    })
  })

  describe('when disable', function () {
    const hook = 'autocompleteDisabled'

    beforeEach(function () {
      this.setProperties({
        hook
      })

      this.render(hbs`
        {{frost-autocomplete-outlet hook='myDisabledOutlet'}}
        {{frost-autocomplete
          hook=hook
          disabled=true
        }}
      `)
      return wait()
    })

    it('should render correctly', function () {
      expect($hook(`${hook}-autocompleteText-input`)[0].disabled).to.equal(true)
    })
  })

  describe('onClear', function () {
    let onClear, sandbox
    const hook = 'autocompleteClear'

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      onClear = sandbox.spy()

      this.setProperties({
        hook,
        onClear
      })

      this.render(hbs`
        {{frost-autocomplete-outlet hook='myClearOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          filter='s'
          onClear=onClear
          autofocus=true
        }}
      `)
      wait()

      $hook(`${hook}-autocompleteText-clear`).click()
      return wait()
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('should trigger onClear', function () {
      expect(onClear.callCount, 'onClear is called').to.equal(1)
    })
  })

  describe('error', function () {
    const hook = 'autocompleteError'

    beforeEach(function () {
      this.setProperties({
        hook,
        error: true
      })

      this.render(hbs`
        {{frost-autocomplete-outlet hook='myErrorOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          error=error
          autofocus=true
        }}
      `)
      return wait()
    })

    it('should have error class', function () {
      expect($hook(`${hook}-autocompleteText`).hasClass('error')).to.equal(true)
    })
  })

  describe('destroy', function () {
    let onClear, sandbox
    let showComponent = true
    const hook = 'autocompleteDestroy'

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      onClear = sandbox.spy()

      this.setProperties({
        hook,
        onClear,
        showComponent
      })

      this.render(hbs`
        {{frost-autocomplete-outlet hook='myClearOutlet'}}
        {{#if showComponent}}
          {{frost-autocomplete
            data=data
            hook=hook
            filter='s'
            onClear=onClear
            autofocus=true
          }}
        {{/if}}
      `)
      wait()

      $hook(`${hook}-autocompleteText-clear`).click()
      this.set('showComponent', false)
      return wait()
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('should not trigger onClear', function () {
      expect(onClear.callCount, 'onClear is called').to.equal(0)
    })
  })

  describe('events', function () {
    let onClick, onFocus, onBlur, onInput, sandbox
    const hook = 'autocompleteEvents'

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      onClick = sandbox.stub()
      onFocus = sandbox.spy()
      onBlur = sandbox.spy()
      onInput = sandbox.stub()

      this.setProperties({
        hook,
        onClick,
        onFocus,
        onBlur,
        onInput,
        tabIndex: 0 // This is the default
      })

      this.render(hbs`
        {{frost-autocomplete-outlet hook='myEventOutlet'}}
        {{frost-autocomplete
          data=data
          hook=hook
          onClick=onClick
          onFocus=onFocus
          onBlur=onBlur
          onInput=onInput
          debounceInterval=debounceInterval
        }}
      `)
      return wait()
    })

    afterEach(function () {
      sandbox.restore()
    })

    describe('onClick', function () {
      beforeEach(function () {
        $hook(`${hook}-autocompleteText-input`).click()
        return wait()
      })

      it('should trigger onClick', function () {
        expect(onClick.callCount, 'onClick is called').to.equal(1)
        expect(onClick.args.length, 'onClick arguments').to.equal(1)
      })
    })

    describe('onFocus', function () {
      beforeEach(function () {
        $hook(`${hook}-autocompleteText-input`).trigger('focusin')
        return wait()
      })

      it('should trigger onFocus', function () {
        expect(onFocus.callCount, 'onFocus is called').to.equal(1)
      })
    })

    describe('onBlur', function () {
      beforeEach(function () {
        $hook(`${hook}-autocompleteText-input`).trigger('focusout')
        return wait()
      })

      it('should trigger onBlur', function () {
        expect(onBlur.callCount, 'onBlur is called').to.equal(1)
      })
    })

    describe('onInput', function () {
      const inputString = 's'
      beforeEach(function () {
        $hook(`${hook}-autocompleteText-input`).val(inputString).trigger('input')
        return wait()
      })

      it('should trigger onInput', function () {
        expect(onInput.callCount, 'onInput is called').to.equal(1)
        expect(onInput.args.length, 'onInput arguments').to.equal(1)
        expect(onInput.args[0].toString(), 'onInput filter').to.equal(inputString)
      })

      describe('debounceInterval', function () {
        const debounceInterval = 100

        beforeEach(function () {
          onInput.reset()
          this.set('debounceInterval', debounceInterval)
          $hook(`${hook}-autocompleteText-input`).val(inputString).trigger('input')
        })

        it('should trigger onInput', function (done) {
          run.later(() => {
            expect(onInput.called).to.equal(false)

            run.later(() => {
              expect(onInput.called).to.equal(true)
              done()
            }, 100)
          }, 50)
        })
      })
    })
  })

  describe('scroll', function () {
    const hook = 'autocompleteScroll'

    const data = [
      {label: '101', value: '1'},
      {label: '102', value: '2'},
      {label: '103', value: '3'},
      {label: '104', value: '4'},
      {label: '105', value: '5'},
      {label: '106', value: '6'},
      {label: '107', value: '7'},
      {label: '108', value: '8'},
      {label: '109', value: '9'},
      {label: '110', value: '10'},
      {label: '111', value: '11'},
      {label: '112', value: '12'},
      {label: '113', value: '13'},
      {label: '114', value: '14'},
      {label: '115', value: '15'},
      {label: '116', value: '16'},
      {label: '117', value: '17'},
      {label: '118', value: '18'},
      {label: '119', value: '19'},
      {label: '120', value: '20'}
    ]
    beforeEach(function () {
      this.setProperties({
        hook,
        data
      })
    })

    describe('dropdown below', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-autocomplete-outlet hook='myScrollOutlet'}}
          {{frost-autocomplete
            data=data
            hook=hook
          }}
        `)
        wait()

        $hook(`${hook}-autocompleteText-input`).val('1').trigger('input').trigger('keypress')
        wait()

        $('.frost-autocomplete-dropdown-container').trigger('resize')
        return wait()
      })

      it('should be below', function () {
        const dropdownTop = $('.frost-autocomplete-dropdown-container')[0].getBoundingClientRect().top
        const inputTop = $hook(`${hook}-autocompleteText-input`)[0].getBoundingClientRect().top
        expect(inputTop, 'onClick is called').to.below(dropdownTop)
      })
    })
  })
})
