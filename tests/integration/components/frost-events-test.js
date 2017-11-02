import {expect} from 'chai'
import Ember from 'ember'
const {Component, Handlebars} = Ember
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = integration('frost-events')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    const mockComponentTemplate = hbs`
      {{hookable-input
        change=_eventProxy.change
        click=_eventProxy.click
        contextMenu=_eventProxy.contextMenu
        doubleClick=_eventProxy.doubleClick
        drag=_eventProxy.drag
        dragEnd=_eventProxy.dragEnd
        dragEnter=_eventProxy.dragEnter
        dragLeave=_eventProxy.dragLeave
        dragOver=_eventProxy.dragOver
        dragStart=_eventProxy.dragStart
        drop=_eventProxy.drop
        focusIn=_eventProxy.focusIn
        focusOut=_eventProxy.focusOut
        input=_eventProxy.input
        keyDown=_eventProxy.keyDown
        keyPress=_eventProxy.keyPress
        keyUp=_eventProxy.keyUp
        mouseDown=_eventProxy.mouseDown
        mouseEnter=_eventProxy.mouseEnter
        mouseLeave=_eventProxy.mouseLeave
        mouseMove=_eventProxy.mouseMove
        mouseUp=_eventProxy.mouseUp
        submit=_eventProxy.submit
        touchCancel=_eventProxy.touchCancel
        touchEnd=_eventProxy.touchEnd
        touchMove=_eventProxy.touchMove
        touchStart=_eventProxy.touchStart
      }}
    `

    const mockComponent = Component.extend(FrostEventsProxy, {
      layoutName: 'mock-component'
    })

    this.register('template:mock-component', mockComponentTemplate)
    this.register('component:mock-component', mockComponent)

    // Create mock component to test the text support events
    const textSupportComponentTemplate = hbs`
      {{hookable-input
        escape-press=_eventProxy.escape-press
        insert-newline=_eventProxy.enter
      }}
    `

    const textSupportComponent = Component.extend(FrostEventsProxy, {
      layoutName: 'text-support'
    })

    this.register('template:text-support', textSupportComponentTemplate)
    this.register('component:text-support', textSupportComponent)
  })

  describe('Event types', function () {
    const eventTypes = [
      {in: 'onChange', out: 'change'},
      {in: 'onClick', out: 'click'},
      {in: 'onContextMenu', out: 'contextmenu'},
      {in: 'onDoubleClick', out: 'dblclick'},
      {in: 'onDrag', out: 'drag'},
      {in: 'onDragEnd', out: 'dragend'},
      {in: 'onDragEnter', out: 'dragenter'},
      {in: 'onDragLeave', out: 'dragleave'},
      {in: 'onDragOver', out: 'dragover'},
      {in: 'onDragStart', out: 'dragstart'},
      {in: 'onDrop', out: 'drop'},
      {in: 'onFocusIn', out: 'focusin'},
      {in: 'onFocus', out: 'focusin'},
      {in: 'onFocusOut', out: 'focusout'},
      {in: 'onBlur', out: 'focusout'},
      {in: 'onInput', out: 'input'},
      {in: 'onKeyDown', out: 'keydown'},
      {in: 'onKeyPress', out: 'keypress'},
      {in: 'onKeyUp', out: 'keyup'},
      {in: 'onMouseDown', out: 'mousedown'},
      {in: 'onMouseEnter', out: 'mouseenter'},
      {in: 'onMouseLeave', out: 'mouseleave'},
      {in: 'onMouseMove', out: 'mousemove'},
      {in: 'onMouseUp', out: 'mouseup'},
      {in: 'onSubmit', out: 'submit'},
      {in: 'onTouchCancel', out: 'touchcancel'},
      {in: 'onTouchEnd', out: 'touchend'},
      {in: 'onTouchMove', out: 'touchmove'},
      {in: 'onTouchStart', out: 'touchstart'}
    ]

    eventTypes.forEach((test) => {
      it(`calls ${test.in} closure action`, function () {
        const externalActionSpy = sinon.spy()
        const template = Handlebars.compile(`
          {{mock-component ${test.in}=(action 'externalAction')}}
        `)

        this.on('externalAction', externalActionSpy)

        this.render(template)

        this.$('input').trigger(`${test.out}`)

        expect(
          externalActionSpy.called,
          `${test.in} closure action called`
        ).to.equal(true)
      })
    })
  })

  /* trigger pressing the `escape` or the `enter` key
   *
   * keypress doesn't seem to be handled consistently between browsers so using
   *  keyup since it is consistent. Specifying `which: <keycode>` instead of the
   *  `keyCode: <keycode>` did not work though.
   *
   * http://stackoverflow.com/questions/1160008/which-keycode-for-escape-key-with-jquery/28502629#28502629
   */
  describe('Text support event types', function () {
    const eventTypes = [
      {in: 'onEscape', out: '27'},
      {in: 'onEnter', out: '13'}
    ]

    eventTypes.forEach((test) => {
      it(`calls ${test.in} closure action`, function () {
        const externalActionSpy = sinon.spy()
        const template = Handlebars.compile(`
          {{text-support ${test.in}=(action 'externalAction')}}
        `)

        this.on('externalAction', externalActionSpy)

        this.render(template)

        this.$('input').trigger({type: 'keyup', keyCode: `${test.out}`})

        expect(
          externalActionSpy.called,
          `${test.in} closure action called`
        ).to.equal(true)
      })
    })
  })
})
