import $ from 'jquery'

const ctx = document.createElement('canvas').getContext('2d')

/**
 * Get width of text for a specific font
 *
 * @param {String} text - text to measure width of
 * @param {String} [font] - font to measure text in
 * @returns {Number} width of text using font
 */
export function getTextWidth (text, font) {
  if (font) {
    ctx.font = font
  }

  return Math.ceil(ctx.measureText(text).width)
}

/**
 * Trim text to fit within a specified width by removing characters from the center out and replacing with an ellipsis
 * Note: Replaces just enough characters from the center so that the text fills the width to the best of its ability
 *
 * @param {String} text - text to trim
 * @param {Number} width - width trimmed text needs to fit within in pixels
 * @param {String} [font] - font to measure text in
 * @returns {String} trimmed text
 */
export function trimDataToFit (text, width, font) {
  if (!text) {
    return text
  }

  // Start at two end characters
  let leftIndex = 0
  let rightIndex = text.length - 1

  if (getTextWidth(text, font) <= width) {
    return text
  }

  // Start total width as width of ellipsis since it will be added to the middle of the text
  let total = getTextWidth('…', font)

  while (leftIndex < rightIndex) {
    // Determine width of next two characters inward
    let current = getTextWidth(text[leftIndex]) + getTextWidth(text[rightIndex], font)

    // Determine total width including next two characters inward
    let newTotal = total + current

    // If adding next two characters makes string too long let's go ahead and stop
    if (newTotal > width) {
      leftIndex -= 1
      rightIndex += 1
      break
    }

    total = newTotal
    leftIndex += 1
    rightIndex -= 1
  }

  // Get trimmed text
  return text.slice(0, leftIndex + 1) + '…' + text.slice(rightIndex, text.length)
}

/**
 * If data is too long for element without wrapping trim with ellipsis in middle
 * Note: expects data-text attribute to be on element with full text
 *
 * @param {HTMLElement} element - HTML element to trim data within
 * @returns {Object} updated text and tooltip
 */
export function trimLongDataInElement (element) {
  const $element = $(element)
  const fullText = $(element).data('text')
  const width = $element.width()

  const fontFamily = $element.css('font-family')
  const fontSize = $element.css('font-size')
  ctx.font = `${fontSize} ${fontFamily}`

  const text = trimDataToFit(fullText, width)
  const tooltip = text === fullText ? '' : fullText

  // If rendered text has changed, update it
  if (element.textContent.trim() !== text) {
    return {text, tooltip}
  }

  return null
}
