import {expect} from 'chai'
import Ember from 'ember'
const {$, run} = Ember
import {$hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {expectSelectWithState, filterSelect} from 'dummy/tests/helpers/ember-frost-core'
import {close, open, selectItemAtIndex} from 'dummy/tests/helpers/ember-frost-core/frost-select'
import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'
import {keyCodes} from 'ember-frost-core/utils'
const {DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW} = keyCodes

/**
 * Blur element (ensuring it has focus first)
 * @param {jQuery} $element - element to blur
 */
function blur ($element) {
  // For some reason Chrome and the version of Firefox used by CI lose focus
  // between a beforeEach that performs focus and a beforeEach that performs
  // the blur so this method ensures the element has focus before calling blur()
  if (!document.hasFocus || document.hasFocus()) {
    $element.focus()
  } else {
    $element.trigger('focusin')
  }

  $element.focusout().blur()
}

/**
 * Focus on next focusable element
 * @param {jQuery} $element - element to find next focusable sibling of
 */
function focusNext ($element) {
  const $focusableElements = $element.nextAll(':not([tabindex=-1])')
  const $firstFocusableElement = $focusableElements.first()

  // We must use jQuery's focusin() method for Ember event to fire and the
  // HTMLElement's focus() method to ensure the element is actually focused
  $firstFocusableElement.focusin()[0].focus()
}

/**
 * Get HTML for list item
 * @param {Number} index - item index (1 based)
 * @returns {String} list item's HTML
 */
function getItemHtml (index) {
  return $(`.frost-select-dropdown li:nth-child(${index}) .frost-select-list-item-text`)
    .html()
    .replace('<!---->', '')
    .trim()
}

/**
 * Get HTML for list secondary item
 * @param {Number} index - secondary item index (1 based)
 * @returns {String} list secondary item's HTML
 */
function getSecondaryItemHtml (index) {
  return $(`.frost-select-dropdown li:nth-child(${index}) .frost-select-list-secondary-item-text`)
    .html()
    .replace('<!---->', '')
    .trim()
}

const test = integration('frost-select')
describe(test.label, function () {
  test.setup()

  describe('renders', function () {
    let onBlur, onChange, onFocus, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      onBlur = sandbox.spy()
      onChange = sandbox.spy()
      onFocus = sandbox.spy()

      this.setProperties({
        hook: 'select',
        onBlur,
        onFocus,
        onChange,
        tabIndex: 0 // This is the default
      })

      this.render(hbs`
        {{frost-select-outlet hook='mySelectOutlet'}}
        {{input hook='pre'}}
        {{frost-select
          data=data
          disabled=disabled
          error=error
          hook=hook
          onBlur=onBlur
          onChange=onChange
          onFocus=onFocus
          tabIndex=tabIndex
          width=width
          wrapLabels=wrapLabels
        }}
        {{input hook='post'}}
      `)
    })

    afterEach(function () {
      sandbox.restore()
    })

    describe('at correct width', function () {
      const maximumWidth = 330
      const minimumWidth = 175
      const specifiedWidth = 500

      it('if no width is specified, and container is small', function () {
        this.$().css('width', '100px')
        const actual = this.$('.frost-select')[0].getBoundingClientRect().width
        expect(actual, 'it has the minimum width').to.equal(minimumWidth)
      })

      it('if no width is specified, and container is large', function () {
        // simulate some app setting a max-width on .frost-select via CSS (as the dummy demo does)
        this.$('.frost-select').css('max-width', `${maximumWidth}px`)

        // set the container to some large width
        this.$().css('width', `${specifiedWidth}px`)

        // get the actual, factual horizontal space reserved in the layout for this element
        const actual = this.$('.frost-select')[0].getBoundingClientRect().width

        expect(actual, 'it respects max-width being set').to.equal(maximumWidth)
      })

      describe('when width is set as property', function () {
        beforeEach(function () {
          return this.set('width', specifiedWidth)
        })

        it('it has the specified width regardless of container size', function () {
          // let's check both the element's style attr and what the browser layed out
          const actualCSSValue = this.$('.frost-select').css('width')
          const actualRenderedWidth = this.$('.frost-select')[0].getBoundingClientRect().width
          expect(parseInt(actualCSSValue, 10), 'in the element\'s style attr').to.equal(specifiedWidth)
          expect(parseInt(actualRenderedWidth, 10), 'and in the actual layout').to.equal(specifiedWidth)
        })
      })
    })

    describe('when data not present', function () {
      it('renders as expected', function () {
        expectSelectWithState('select', {
          focused: false
        })

        expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
        expect(onChange.callCount, 'onChange is not called').to.equal(0)
        expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
      })

      describe('click on component', function () {
        beforeEach(function () {
          open('select')
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: true,
            items: [],
            opened: true
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is called').to.equal(1)
        })

        describe('when escape key pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $(document)
              .trigger(
                $.Event('keydown', {
                  keyCode: ESCAPE
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })
      })

      // FIXME: tests for tabbing into components isn't working anymore, despite the fact that
      // code changes shouldn't have affected it, AFAIK, probably need to look into alternative ways of
      // testing this (ARM 2016-12-05)
      describe.skip('tab into component', function () {
        beforeEach(function () {
          // In case you are wondering what the hell is going on here there is no
          // way to trigger a generic tab event on the document to move focus on to
          // the next element for browser security reasons. So our approach is to
          // simply bind a keypress event to the element before the select, which
          // adds focus to the next element in the DOM when it receives a tab,
          // simulating what would happen in a real world scenario. We then trigger
          // a tab event on this input and ensure the our select receives focus.

          $hook('pre')
            .on('keypress', function (e) {
              if (e.keyCode === TAB) {
                focusNext($(this))
              }
            })
            .focus()
            .trigger(
              $.Event('keypress', {
                keyCode: TAB
              })
            )
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: true
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is called').not.to.equal(0)
        })
      })

      describe('programatically focus component', function () {
        beforeEach(function () {
          // We must use jQuery's focusin() method for Ember event to fire and the
          // HTMLElement's focus() method to ensure the element is actually focused
          $hook('select').focusin()[0].focus()
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: true
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is called').not.to.equal(0)
        })

        describe('programitcally blur component', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())
            blur($hook('select'))
            return wait()
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: false
            })

            expect(onBlur.callCount, 'onBlur is called').not.to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
          })
        })

        describe('when space bar pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $hook('select')
              .trigger(
                $.Event('keypress', {
                  keyCode: SPACE
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true,
              items: [],
              opened: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })

          describe('programitcally blur component', function () {
            beforeEach(function () {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())
              blur($hook('select'))
              return wait()
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: false
              })

              expect(onBlur.callCount, 'onBlur is called').not.to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
            })
          })

          describe('when escape key pressed', function () {
            beforeEach(function () {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())

              $(document)
                .trigger(
                  $.Event('keydown', {
                    keyCode: ESCAPE
                  })
                )
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true
              })

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when space bar pressed again', function () {
            beforeEach(function () {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())

              $hook('select')
                .trigger(
                  $.Event('keypress', {
                    keyCode: SPACE
                  })
                )
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                opened: false
              })

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })
        })

        describe('when down arrow pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $hook('select')
              .trigger(
                $.Event('keydown', {
                  keyCode: DOWN_ARROW
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true,
              items: [],
              opened: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })

        describe('when up arrow pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $hook('select')
              .trigger(
                $.Event('keydown', {
                  keyCode: UP_ARROW
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true,
              items: [],
              opened: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })
      })

      describe('when input is disabled', function () {
        beforeEach(function () {
          this.set('disabled', true)
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            disabled: true,
            focused: false
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
        })

        describe('click on component', function () {
          beforeEach(function () {
            open('select')
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              disabled: true,
              focused: false
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })

        // FIXME: tests for tabbing into components isn't working anymore, despite the fact that
        // code changes shouldn't have affected it, AFAIK, probably need to look into alternative ways of
        // testing this (ARM 2016-12-05)
        describe.skip('tab into component', function () {
          beforeEach(function () {
            // In case you are wondering what the hell is going on here there is no
            // way to trigger a generic tab event on the document to move focus on to
            // the next element for browser security reasons. So our approach is to
            // simply bind a keypress event to the element before the select, which
            // adds focus to the next element in the DOM when it receives a tab,
            // simulating what would happen in a real world scenario. We then trigger
            // a tab event on this input and ensure the our select is skipped since
            // it is disabled.

            $hook('pre')
              .on('keypress', function (e) {
                if (e.keyCode === TAB) {
                  focusNext($(this))
                }
              })
              .focus()
              .trigger(
                $.Event('keypress', {
                  keyCode: TAB
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              disabled: true,
              focused: false
            })

            expect(
              $hook('post')[0],
              'focuses on element after select'
            )
              .to.equal(document.activeElement)

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })
      })

      describe('when input has custom tab index', function () {
        beforeEach(function () {
          this.set('tabIndex', 3)
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: false,
            tabIndex: 3
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
        })

        describe('when input is disabled', function () {
          beforeEach(function () {
            this.set('disabled', true)
          })

          describe('when input is re-enabled', function () {
            beforeEach(function () {
              this.set('disabled', false)
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: false,
                tabIndex: 3
              })

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when input is re-enabled and tabIndex is set simultaneously', function () {
            beforeEach(function () {
              this.set('disabled', true)
              this.setProperties({
                disabled: false,
                tabIndex: 42
              })
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: false,
                tabIndex: 42
              })

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })
        })
      })

      describe('when input has error', function () {
        beforeEach(function () {
          this.set('error', true)
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            error: true,
            focused: false
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
        })
      })
    })

    describe('when secondary data present', function () {
      beforeEach(function () {
        this.set('data', [
          {label: 'Foo', value: 'foo', secondaryLabels: ['Foo1-1', 'Foo1-2']},
          {label: 'Bar', value: 'bar', secondaryLabels: ['Bar1-1', 'Bar1-2']},
          {label: 'Ba ba', value: 'baba', secondaryLabels: ['Ba', 'Ba', 'Black Sheep']},
          {label: 'Superman', value: 'Clark Kent', secondaryLabels: ['Man of Steel']}
        ])
      })

      describe('click on component', function () {
        beforeEach(function () {
          open('select')
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: true,
            focusedItem: 'Foo',
            items: ['Foo', 'Bar', 'Ba ba', 'Superman'],
            secondaryLabels: ['Foo1-1 | Foo1-2', 'Bar1-1 | Bar1-2', 'Ba | Ba | Black Sheep', 'Man of Steel'],
            opened: true
          })
        })
      })

      describe('programatically focus component', function () {
        beforeEach(function () {
          // We must use jQuery's focusin() method for Ember event to fire and the
          // HTMLElement's focus() method to ensure the element is actually focused
          $hook('select').focusin()[0].focus()
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: true
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is called').not.to.equal(0)
        })

        describe('when space bar pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $hook('select')
              .trigger(
                $.Event('keypress', {
                  keyCode: SPACE
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true,
              focusedItem: 'Foo',
              items: ['Foo', 'Bar', 'Ba ba', 'Superman'],
              opened: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })

          describe('when filter applied with no matches', function () {
            beforeEach(function () {
              filterSelect('asdf')
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                items: [],
                secondaryLabels: [],
                opened: true
              })
            })
          })

          describe('when filter applied with one match for primary label', function () {
            beforeEach(function () {
              filterSelect('Superman')
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                focusedItem: 'Superman',
                items: ['Superman'],
                secondaryLabels: ['Man of Steel'],
                opened: true
              })

              expect(
                getItemHtml(1),
                'underlines matching text'
              )
                .to.eql('<u>Superman</u>')

              expect(
                getSecondaryItemHtml(1),
                'underlines matching text'
              )
                .to.eql('Man of Steel')

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when filter applied with one match for secondary label', function () {
            beforeEach(function () {
              filterSelect('Steel')
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                focusedItem: 'Superman',
                items: ['Superman'],
                secondaryLabels: ['Man of Steel'],
                opened: true
              })

              expect(
                getItemHtml(1),
                'underlines matching text'
              )
                .to.eql('Superman')

              expect(
                getSecondaryItemHtml(1),
                'underlines matching text'
              )
                .to.eql('Man of <u>Steel</u>')

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when filter applied with one match for both labels', function () {
            beforeEach(function () {
              filterSelect('Bar')
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                focusedItem: 'Bar',
                items: ['Bar'],
                secondaryLabels: ['Bar1-1 | Bar1-2'],
                opened: true
              })

              expect(
                getItemHtml(1),
                'underlines matching text'
              )
                .to.eql('<u>Bar</u>')

              expect(
                getSecondaryItemHtml(1),
                'underlines matching text'
              )
                .to.eql('<u>Bar</u>1-1 | <u>Bar</u>1-2')

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when filter applied with more than one match', function () {
            beforeEach(function () {
              filterSelect('ba')
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                focusedItem: 'Bar',
                items: ['Bar', 'Ba ba'],
                secondaryLabels: ['Bar1-1 | Bar1-2', 'Ba | Ba | Black Sheep'],
                opened: true
              })

              expect(
                getItemHtml(1),
                'underlines matching text in first item'
              )
                .to.eql('<u>Ba</u>r')

              expect(
                getSecondaryItemHtml(1),
                'underlines matching text in first item'
              )
                .to.eql('<u>Ba</u>r1-1 | <u>Ba</u>r1-2')

              expect(
                getItemHtml(2),
                'underlines matching text in second item'
              )
                .to.eql('<u>Ba</u> <u>ba</u>')

              expect(
                getSecondaryItemHtml(2),
                'underlines matching text in second item'
              )
                .to.eql('<u>Ba</u> | <u>Ba</u> | Black Sheep')

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when filter is applied and selection is made', function () {
            beforeEach(function (done) {
              onChange.reset()
              filterSelect('b')
              wait().then(() => {
                filterSelect('ba')
                wait().then(() => {
                  filterSelect('bar')
                  wait().then(() => {
                    selectItemAtIndex('select', 0, done)
                  })
                })
              })
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                opened: false,
                text: 'Bar'
              })
            })

            it('should call onChange once', function () {
              expect(onChange).to.have.callCount(1)
            })

            it('should call onChange with the correct value', function () {
              expect(onChange).to.have.been.calledWith(['bar'])
            })
          })
        })
      })
    })

    describe('when data present', function () {
      beforeEach(function () {
        this.set('data', [
          {label: 'Foo', value: 'foo'},
          {label: 'Bar', value: 'bar'},
          {label: 'Baz', value: 'baz'},
          {label: 'Ba ba black sheep', value: 'sheep'}
        ])
      })

      it('renders as expected', function () {
        expectSelectWithState('select', {
          focused: false
        })

        expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
        expect(onChange.callCount, 'onChange is not called').to.equal(0)
        expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
      })

      describe('click on component', function () {
        beforeEach(function () {
          open('select')
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: true,
            focusedItem: 'Foo',
            items: ['Foo', 'Bar', 'Baz', 'Ba ba black sheep'],
            opened: true
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is called').to.equal(1)
        })

        describe('when escape key pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $(document)
              .trigger(
                $.Event('keydown', {
                  keyCode: ESCAPE
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })

        describe('when tab key pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())
            $(document)
              .trigger(
                $.Event('keydown', {
                  keyCode: TAB
                })
              )
            return wait()
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true,
              opened: false
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })
      })

      // FIXME: tests for tabbing into components isn't working anymore, despite the fact that
      // code changes shouldn't have affected it, AFAIK, probably need to look into alternative ways of
      // testing this (ARM 2016-12-05)
      describe.skip('tab into component', function () {
        beforeEach(function () {
          // In case you are wondering what the hell is going on here there is no
          // way to trigger a generic tab event on the document to move focus on to
          // the next element for browser security reasons. So our approach is to
          // simply bind a keypress event to the element before the select, which
          // adds focus to the next element in the DOM when it receives a tab,
          // simulating what would happen in a real world scenario. We then trigger
          // a tab event on this input and ensure the our select receives focus.

          $hook('pre')
            .on('keypress', function (e) {
              if (e.keyCode === TAB) {
                focusNext($(this))
              }
            })
            .focus()
            .trigger(
              $.Event('keypress', {
                keyCode: TAB
              })
            )
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: true
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is called').not.to.equal(0)
        })
      })

      describe('programatically focus component', function () {
        beforeEach(function () {
          // We must use jQuery's focusin() method for Ember event to fire and the
          // HTMLElement's focus() method to ensure the element is actually focused
          $hook('select').focusin()[0].focus()
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: true
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is called').not.to.equal(0)
        })

        describe('programatically blur component', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())
            blur($hook('select'))
            return wait()
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: false
            })

            expect(onBlur.callCount, 'onBlur is called').not.to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
          })
        })

        describe('when escape key pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $(document)
              .trigger(
                $.Event('keydown', {
                  keyCode: ESCAPE
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })

        describe('when space bar pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $hook('select')
              .trigger(
                $.Event('keypress', {
                  keyCode: SPACE
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true,
              focusedItem: 'Foo',
              items: ['Foo', 'Bar', 'Baz', 'Ba ba black sheep'],
              opened: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })

          describe('programitcally blur component', function () {
            beforeEach(function () {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())
              blur($hook('select'))
              return wait()
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: false
              })

              expect(onBlur.callCount, 'onBlur is called').not.to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
            })
          })

          describe('when space bar pressed again', function () {
            beforeEach(function () {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())

              $hook('select')
                .trigger(
                  $.Event('keypress', {
                    keyCode: SPACE
                  })
                )
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                opened: false
              })

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when enter key pressed', function () {
            beforeEach(function (done) {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())

              $(document)
                .trigger(
                  $.Event('keydown', {
                    keyCode: ENTER
                  })
                )

              run.next(() => {
                done()
              })
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                opened: false,
                text: 'Foo'
              })

              expect(onChange.callCount, 'onChange is called').to.equal(1)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)

              expect(
                onChange.lastCall.args[0],
                'informs consumer of selected value'
              )
                .to.eql(['foo'])
            })
          })

          describe('when up arrow key pressed', function () {
            beforeEach(function () {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())

              $(document)
                .trigger(
                  $.Event('keydown', {
                    keyCode: UP_ARROW
                  })
                )
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                focusedItem: 'Foo',
                items: ['Foo', 'Bar', 'Baz', 'Ba ba black sheep'],
                opened: true
              })

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when down arrow key pressed', function () {
            beforeEach(function () {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())

              $(document)
                .trigger(
                  $.Event('keydown', {
                    keyCode: DOWN_ARROW
                  })
                )
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                focusedItem: 'Bar',
                items: ['Foo', 'Bar', 'Baz', 'Ba ba black sheep'],
                opened: true
              })

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })

            describe('when up arrow key pressed', function () {
              beforeEach(function () {
                [onBlur, onChange, onFocus].forEach((func) => func.reset())

                $(document)
                  .trigger(
                    $.Event('keydown', {
                      keyCode: UP_ARROW
                    })
                  )
              })

              it('renders as expected', function () {
                expectSelectWithState('select', {
                  focused: true,
                  focusedItem: 'Foo',
                  items: ['Foo', 'Bar', 'Baz', 'Ba ba black sheep'],
                  opened: true
                })

                expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
                expect(onChange.callCount, 'onChange is not called').to.equal(0)
                expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
              })
            })

            describe('when down arrow key pressed again', function () {
              beforeEach(function () {
                [onBlur, onChange, onFocus].forEach((func) => func.reset())

                $(document)
                  .trigger(
                    $.Event('keydown', {
                      keyCode: DOWN_ARROW
                    })
                  )
              })

              it('renders as expected', function () {
                expectSelectWithState('select', {
                  focused: true,
                  focusedItem: 'Baz',
                  items: ['Foo', 'Bar', 'Baz', 'Ba ba black sheep'],
                  opened: true
                })

                expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
                expect(onChange.callCount, 'onChange is not called').to.equal(0)
                expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
              })
            })

            describe('when enter key pressed', function () {
              beforeEach(function (done) {
                [onBlur, onChange, onFocus].forEach((func) => func.reset())

                $(document)
                  .trigger(
                    $.Event('keydown', {
                      keyCode: ENTER
                    })
                  )

                run.next(() => {
                  done()
                })
              })

              it('renders as expected', function () {
                expectSelectWithState('select', {
                  focused: true,
                  opened: false,
                  text: 'Bar'
                })

                expect(onChange.callCount, 'onChange is called').to.equal(1)
                expect(onFocus.callCount, 'onFocus is not called').to.equal(0)

                expect(
                  onChange.lastCall.args[0],
                  'informs consumer of selected value'
                )
                  .to.eql(['bar'])
              })
            })
          })

          describe('when first item clicked', function () {
            beforeEach(function (done) {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())
              return selectItemAtIndex('select', 0, done)
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                opened: false,
                text: 'Foo'
              })

              expect(onChange.callCount, 'onChange is called').to.equal(1)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)

              expect(
                onChange.lastCall.args[0],
                'informs consumer of selected value'
              )
                .to.eql(['foo'])
            })
          })

          describe('when second item clicked', function () {
            beforeEach(function (done) {
              [onBlur, onChange, onFocus].forEach((func) => func.reset())
              selectItemAtIndex('select', 1, done)
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                opened: false,
                text: 'Bar'
              })

              expect(onChange.callCount, 'onChange is called').to.equal(1)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)

              expect(
                onChange.lastCall.args[0],
                'informs consumer of selected value'
              )
                .to.eql(['bar'])
            })
          })

          describe('when filter applied with no matches', function () {
            beforeEach(function () {
              filterSelect('asdf')
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                items: [],
                opened: true
              })

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when filter applied with one match', function () {
            beforeEach(function () {
              filterSelect('baz')
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                focusedItem: 'Baz',
                items: ['Baz'],
                opened: true
              })

              expect(
                getItemHtml(1),
                'underlines matching text'
              )
                .to.eql('<u>Baz</u>')

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when filter applied with more than one match', function () {
            beforeEach(function () {
              filterSelect('ba')
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                focusedItem: 'Bar',
                items: ['Bar', 'Baz', 'Ba ba black sheep'],
                opened: true
              })

              expect(
                getItemHtml(1),
                'underlines matching text in first item'
              )
                .to.eql('<u>Ba</u>r')

              expect(
                getItemHtml(2),
                'underlines matching text in second item'
              )
                .to.eql('<u>Ba</u>z')

              expect(
                getItemHtml(3),
                'underlines matching text in second item'
              )
                .to.eql('<u>Ba</u> <u>ba</u> black sheep')

              expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
              expect(onChange.callCount, 'onChange is not called').to.equal(0)
              expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
            })
          })

          describe('when filter is applied and selection is made', function () {
            beforeEach(function (done) {
              onChange.reset()
              filterSelect('b')
              wait().then(() => {
                filterSelect('ba')
                wait().then(() => {
                  filterSelect('bar')
                  wait().then(() => {
                    selectItemAtIndex('select', 0, done)
                  })
                })
              })
            })

            it('renders as expected', function () {
              expectSelectWithState('select', {
                focused: true,
                opened: false,
                text: 'Bar'
              })
            })

            it('should call onChange once', function () {
              expect(onChange).to.have.callCount(1)
            })

            it('should call onChange with the correct value', function () {
              expect(onChange).to.have.been.calledWith(['bar'])
            })
          })
        })

        describe('when down arrow pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $hook('select')
              .trigger(
                $.Event('keydown', {
                  keyCode: DOWN_ARROW
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true,
              focusedItem: 'Foo',
              items: ['Foo', 'Bar', 'Baz', 'Ba ba black sheep'],
              opened: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })

        describe('when up arrow pressed', function () {
          beforeEach(function () {
            [onBlur, onChange, onFocus].forEach((func) => func.reset())

            $hook('select')
              .trigger(
                $.Event('keydown', {
                  keyCode: UP_ARROW
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              focused: true,
              focusedItem: 'Foo',
              items: ['Foo', 'Bar', 'Baz', 'Ba ba black sheep'],
              opened: true
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })
      })

      describe('when input is disabled', function () {
        beforeEach(function () {
          this.set('disabled', true)
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            disabled: true,
            focused: false
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
        })

        describe('click on component', function () {
          beforeEach(function () {
            open('select')
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              disabled: true,
              focused: false
            })

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })

        // FIXME: tests for tabbing into components isn't working anymore, despite the fact that
        // code changes shouldn't have affected it, AFAIK, probably need to look into alternative ways of
        // testing this (ARM 2016-12-05)
        describe.skip('tab into component', function () {
          beforeEach(function () {
            // In case you are wondering what the hell is going on here there is no
            // way to trigger a generic tab event on the document to move focus on to
            // the next element for browser security reasons. So our approach is to
            // simply bind a keypress event to the element before the select, which
            // adds focus to the next element in the DOM when it receives a tab,
            // simulating what would happen in a real world scenario. We then trigger
            // a tab event on this input and ensure the our select is skipped since
            // it is disabled.

            $hook('pre')
              .on('keypress', function (e) {
                if (e.keyCode === TAB) {
                  focusNext($(this))
                }
              })
              .focus()
              .trigger(
                $.Event('keypress', {
                  keyCode: TAB
                })
              )
          })

          it('renders as expected', function () {
            expectSelectWithState('select', {
              disabled: true,
              focused: false
            })

            expect(
              $hook('post')[0],
              'focuses on element after select'
            )
              .to.equal(document.activeElement)

            expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
            expect(onChange.callCount, 'onChange is not called').to.equal(0)
            expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
          })
        })
      })

      describe('when input has custom tab index', function () {
        beforeEach(function () {
          this.set('tabIndex', 3)
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            focused: false,
            tabIndex: 3
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
        })
      })

      describe('when input has error', function () {
        beforeEach(function () {
          this.set('error', true)
        })

        it('renders as expected', function () {
          expectSelectWithState('select', {
            error: true,
            focused: false
          })

          expect(onBlur.callCount, 'onBlur is not called').to.equal(0)
          expect(onChange.callCount, 'onChange is not called').to.equal(0)
          expect(onFocus.callCount, 'onFocus is not called').to.equal(0)
        })
      })

      describe('when wrapLabels is true and data includes a long label', function () {
        let longLabel
        beforeEach(function () {
          longLabel = 'Very very very very very very very very very very very very very very long label'
          this.setProperties({
            data: [
              {label: 'Short Label', value: 'foo'},
              {label: longLabel, value: 'bar'},
              {label: 'Baz', value: 'baz'},
              {label: 'Ba ba black sheep', value: 'sheep'}
            ],
            wrapLabels: true
          })

          return open('select')
        })

        it('should show the entire label', function () {
          expect($hook('select-item', {index: 1}).text().trim()).to.have.equal(longLabel)
        })

        it('should give that list item a larger height', function () {
          const regularItemHeight = $hook('select-item', {index: 0}).height()
          const wrappedItemHeight = $hook('select-item', {index: 1}).height()
          expect(wrappedItemHeight).to.be.greaterThan(regularItemHeight)
        })
      })

      describe('when wrapLabels is true and data includes a long secondary label', function () {
        let longLabel
        let longSecondaryLabel
        beforeEach(function () {
          longLabel = 'Very very very very very very very very very very very very very very long label'
          longSecondaryLabel =
            'Very very very very very very very very very very very very very very long secondary label'
          this.setProperties({
            data: [
              {label: 'Short Label', value: 'foo', secondaryLabels: ['secondary label']},
              {label: longLabel, value: 'bar', secondaryLabels: [longSecondaryLabel]}
            ],
            wrapLabels: true
          })

          return open('select')
        })

        it('should show the entire label', function () {
          expect($hook('select-secondaryLabels', {index: 1}).text().trim()).to.have.equal(longSecondaryLabel)
        })

        it('should give that list item a larger height', function () {
          const regularItemHeight = $hook('select-secondaryLabels', {index: 0}).height()
          const wrappedItemHeight = $hook('select-secondaryLabels', {index: 1}).height()
          expect(wrappedItemHeight).to.be.greaterThan(regularItemHeight)
        })
      })
    })

    describe('ember-hook selectors', function () {
      describe('when dropdown is open', function () {
        beforeEach(function () {
          this.set('data', [
            {label: 'Foo', value: 'foo'},
            {label: 'Bar', value: 'bar'},
            {label: 'Baz', value: 'baz'},
            {label: 'Ba ba black sheep', value: 'sheep'}
          ])
          $hook('select').click()
        })

        it('can find dropdown input', function () {
          expect($hook('select-list-input')).to.have.length(1)
        })

        it('can find items by index, label and value', function (done) {
          return wait().then(() => {
            expect($hook('select-item', {index: 0})).to.have.length(1)
            expect($hook('select-item', {label: 'Foo'})).to.have.length(1)
            expect($hook('select-item', {value: 'foo'})).to.have.length(1)
            done()
          })
        })
      })
    })
  })

  describe('renders using spread', function () {
    it('renders as expected', function () {
      this.render(hbs`
        {{frost-select-outlet hook='mySelectOutlet'}}
        {{input hook='pre'}}
        {{frost-select
          options=(hash
            disabled=true
            hook='select'
          )
        }}
        {{input hook='post'}}
      `)

      expectSelectWithState('select', {
        disabled: true
      })
    })
  })
  describe('handles firing of events', function () {
    let onInput, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      onInput = sandbox.spy((value) => {
        expect(value).to.equal('hello')
      })

      this.setProperties({
        hook: 'select',
        onInput,
        debounceInterval: 0
      })

      this.render(hbs`
        {{frost-select-outlet hook='eventSelectOutlet'}}
        {{frost-select
          data=data
          hook=hook
          onInput=onInput
          debounceInterval=debounceInterval
          tabIndex=tabIndex
          wrapLabels=wrapLabels
        }}
      `)
    })

    describe('fires onInput event after debounceInterval', function () {
      beforeEach(function () {
        this.setProperties({
          debounceInterval: 100
        })

        return open().then(function () {
          return filterSelect('hello')
        })
      })

      afterEach(function () {
        return close()
      })

      it('waits until after debounce period before firing', function (done) {
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
