export default {
  'enter': ['onEnter'],
  // 'insert-newline': duplicate of 'enter'
  'escape-press': ['onEscape'],
  // 'focus-in': duplicate of 'focusIn'
  // 'focus-out': duplicate of 'focusOut'
  // 'key-up': duplicate of 'keyUp'
  // 'key-press': duplicate of 'keyPress'

  'touchStart': ['onTouchStart'],
  'touchMove': ['onTouchMove'],
  'touchEnd': ['onTouchEnd'],
  'touchCancel': ['onTouchCancel'],

  'keyDown': ['onKeyDown'],
  'keyUp': ['onKeyUp'],
  'keyPress': ['onKeyPress'],

  'mouseDown': ['onMouseDown'],
  'mouseUp': ['onMouseUp'],
  'contextMenu': ['onContextMenu'],
  'click': ['onClick'],
  'doubleClick': ['onDoubleClick'],
  'mouseMove': ['onMouseMove'],
  'focusIn': ['onFocusIn', 'onFocus'], // onFocus is actually incorrect and should be deprecated
  'focusOut': ['onFocusOut', 'onBlur'], // onBlur is actually incorrect and should be deprecated
  'mouseEnter': ['onMouseEnter'],
  'mouseLeave': ['onMouseLeave'],

  'submit': ['onSubmit'],
  'change': ['onChange'],
  // 'focusIn': duplicate of 'focusIn'
  // 'focusOut': duplicate of 'focusIn'
  'input': ['onInput'],

  'dragStart': ['onDragStart'],
  'drag': ['onDrag'],
  'dragEnter': ['onDragEnter'],
  'dragLeave': ['onDragLeave'],
  'dragOver': ['onDragOver'],
  'dragEnd': ['onDragEnd'],
  'drop': ['onDrop']
}
