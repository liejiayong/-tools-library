var rubberbandEl = document.querySelector('#rubberband')
var resetEl = document.querySelector('#reset')
var canvasEl = document.querySelector('#canvas')
var ctx = canvasEl.getContext('2d')
canvasEl.width = canvasEl.height = 500
var spriteSheet = new Image()

var isDrag = false
var mouseInfo = {}
var rubberbandRect = {}

spriteSheet.src = 'sprite.jpg'
spriteSheet.onload = function() {
  drawSpriteSheet(ctx, spriteSheet)
}

function drawSpriteSheet(ctx, image) {
  ctx.drawImage(image, 0, 0)
}

function showRubberband() {
  rubberbandEl.style.display = 'inline'
}
function hideRubberband() {
  rubberbandEl.style.display = 'none'
}

function moveRubberband() {
  rubberbandEl.style.top = `${rubberbandRect.top}px`
  rubberbandEl.style.left = `${rubberbandRect.left}px`
}

function resizeRubberband() {
  rubberbandEl.style.width = `${rubberbandRect.width}px`
  rubberbandEl.style.height = `${rubberbandRect.height}px`
}

function resetRubberband() {
  rubberbandRect = { top: 0, left: 0, width: 0, height: 0 }
}

function rubberbandStart(x, y) {
  mouseInfo.x = x
  mouseInfo.y = y

  rubberbandRect.left = x
  rubberbandRect.top = y

  moveRubberband()
  showRubberband()

  isDrag = true
}

function rubberbandStretch(x, y) {
  rubberbandRect.left = x < mouseInfo.left ? x : mouseInfo.left
  rubberbandRect.top = y < mouseInfo.top ? y : mouseInfo.top

  rubberbandRect.width = Math.abs(x - mouseInfo.x)
  rubberbandRect.height = Math.abs(y - mouseInfo.y)

  moveRubberband()
  resizeRubberband()
}

function rubberbandEnd() {
  var box = canvasEl.getBoundingClientRect()
  const { left, top, width, height } = rubberbandRect
  const { widthEl, heightEl } = canvasEl
  try {
    ctx.drawImage(canvasEl, left - box.left, top - box.top, width, height, 0, 0, widthEl, heightEl)
  } catch (e) {

  }

  resetRubberband()

  rubberbandEl.style.width = 0
  rubberbandEl.style.height = 0

  hideRubberband()

  isDrag = false
}

canvasEl.addEventListener('mousedown', (e) => {
  e.preventDefault()
  const { clientX, clientY } = e
  const offset = canvasOffset(canvasEl, clientX, clientY)
  rubberbandStart(offset.x, offset.y)
})

canvasEl.addEventListener('mousemove', (e) => {
  e.preventDefault()
  const { clientX, clientY } = e
  const offset = canvasOffset(canvasEl, clientX, clientY)

  if (isDrag) rubberbandStretch(offset.x, offset.y)
})

canvasEl.addEventListener('mouseup', (e) => {
  e.preventDefault()
  rubberbandEnd()
})

resetEl.addEventListener('click', (e) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.drawImage(spriteSheet, 0, 0, spriteSheet.width, spriteSheet.height)
})