export const TextLimiter = (text, limit) => {
  let textSize = text.length
  let cutText = (textSize > limit)
  let visibleText = cutText ? text.slice(0, limit) : text

  return visibleText + (cutText ? '...' : '')
}

export default TextLimiter