var readoutEl = document.querySelector('#readout')
var canvasEl = document.querySelector('#canvas')
var ctx = canvasEl.getContext('2d')
canvasEl.width = canvasEl.height = 500
var spriteSheet = new Image()


function drawBG(ctx) {
  var VERTICAL_LINE_SPACING = 12,
  i = ctx.canvas.height

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.strokeStyle = 'lightgray'
  ctx.lineWidth = 0.5

  while(i > VERTICAL_LINE_SPACING * 4) {
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(ctx.canvas.width, i)
    ctx.stroke()
    i -=VERTICAL_LINE_SPACING
  }
}

function drawSpriteSheet(ctx, image) {
  ctx.drawImage(image, 0, 0)
}

function drawGuideline(ctx, x, y) {
  ctx.strokeStyle = 'rgga(0, 0, 230, 0.8)'
  ctx.lineWidth = 0.5
  drawVerticalLine(ctx, x)
  drawHorizontalLine(ctx, y)
}

function drawHorizontalLine(ctx, y) {
  ctx.beginPath()
  ctx.moveTo(0, y + 0.5)
  ctx.lineTo(ctx.canvas.width, y + 0.5)
  ctx.stroke()
}

function drawVerticalLine(ctx, x) {
  ctx.beginPath()
  ctx.moveTo(x + 0.5 , 0)
  ctx.lineTo(x + 0.5, ctx.canvas.height)
  ctx.stroke()
}

function updateReadout(x, y) {
  readoutEl.innerHTML = `(${x.toFixed(0)}, ${y.toFixed(0)})`
}

canvasEl.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e
  const offset = canvasOffset(canvasEl, clientX, clientY)
  
  drawBG(ctx)
  drawSpriteSheet(ctx, spriteSheet)
  drawGuideline(ctx, offset.x, offset.y)
  updateReadout(offset.x, offset.y)
})

spriteSheet.src = 'sprite.jpg'
spriteSheet.onload = function() {
  drawSpriteSheet(ctx, spriteSheet)
}
drawBG(ctx)