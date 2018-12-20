function canvasOffset(el, x, y) {
  var rect = el.getBoundingClientRect()
  return {
    x: x - rect.left * (el.width / rect.width),
    y: y - rect.top * (el.height / rect.height)
  }
}