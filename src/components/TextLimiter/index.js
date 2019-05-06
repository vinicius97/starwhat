export const TextLimiter = (text, limit) => {
  if(text !== null) {
    let textSize = text.length
    let cutText = (textSize > limit)
    let visibleText = cutText ? text.slice(0, limit) : text

    return visibleText + (cutText ? '...' : '')
  } else {
    return ''
  }
}

export default TextLimiter