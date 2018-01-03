import Ember from 'ember'
const {deprecate} = Ember

export default {
  addProperty: function (event, frostEvent) {
    if (!this[event] && this[frostEvent]) {
      this[event] = () => {
        this[frostEvent](...arguments)
      }
    }
  },

  addProxy: function (event, frostEvent) {
    if (!this._eventProxy) {
      this._eventProxy = {}
    }

    // Can't use => if we want to get ...arguments from the inner function
    const component = this

    this._eventProxy[event] = function () {
      if (component[frostEvent]) {
        component[frostEvent](...arguments)
      }
    }
  },

  init: function (eventMap, add) {
    Object.keys(eventMap).forEach((event) => {
      eventMap[event].forEach((frostEvent, i) => {
        if (this[frostEvent]) {
          // Event mappings higher than the 0 index are deprecated
          deprecate(`
            Event handler '${frostEvent}' is deprecated.
            Please use '${eventMap[event][0]}' event instead`,
          i === 0,
          {
            id: 'event-deprecated',
            until: '2.0.0'
          }
          )
          add.call(this, event, frostEvent)
        }
      })
    })
  },

  map: {
    'change': ['onChange'],
    'click': ['onClick'],
    'contextMenu': ['onContextMenu'],
    'doubleClick': ['onDoubleClick'],
    'drag': ['onDrag'],
    'dragEnd': ['onDragEnd'],
    'dragEnter': ['onDragEnter'],
    'dragLeave': ['onDragLeave'],
    'dragOver': ['onDragOver'],
    'dragStart': ['onDragStart'],
    'drop': ['onDrop'],
    'enter': ['onEnter'],
    'escape-press': ['onEscape'],
    'focusIn': ['onFocusIn', 'onFocus'], // onFocus is actually incorrect and should be deprecated
    'focusOut': ['onFocusOut', 'onBlur'], // onBlur is actually incorrect and should be deprecated
    'input': ['onInput'],
    // 'insert-newline': ['onEnter'], Duplicates 'enter'
    'keyDown': ['onKeyDown'],
    'keyPress': ['onKeyPress'],
    'keyUp': ['onKeyUp'],
    'mouseDown': ['onMouseDown'],
    'mouseEnter': ['onMouseEnter'],
    'mouseLeave': ['onMouseLeave'],
    'mouseMove': ['onMouseMove'],
    'mouseUp': ['onMouseUp'],
    'submit': ['onSubmit'],
    'touchCancel': ['onTouchCancel'],
    'touchEnd': ['onTouchEnd'],
    'touchMove': ['onTouchMove'],
    'touchStart': ['onTouchStart']
  }
}
