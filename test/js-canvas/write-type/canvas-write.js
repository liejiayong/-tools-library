var canvasWidth = Math.min(800, $(window).width() - 20);
var canvasHeight = canvasWidth;
var strokeColor = 'black';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var isMouseDown = false;
var loc = { x: 0, y: 0 };

drawBackground();

$('.btn').click(function(e) {
  $('.btn').removeClass('btn-selected');
  $(this).addClass('btn-selected');
  strokeColor = $(this).css('background-color');
});
canvas.onmousedown = function(e) {
  e.preventDefault();
  isMouseDown = true;
  //console.log("down");
  loc = windowToCanvas(e.clientX, e.clientY);
  //alert(loc.x+","+loc.y);
};
canvas.onmouseup = function(e) {
  e.preventDefault();
  isMouseDown = false;
  //	console.log("up");
};
canvas.onmouseout = function(e) {
  e.preventDefault();
  isMouseDown = false;
  //	console.log("out");
};
canvas.onmousemove = function(e) {
  e.preventDefault();
  if (isMouseDown) {
    //console.log("move");
    var last = windowToCanvas(e.clientX, e.clientY);
    ctx.beginPath();
    ctx.lineWidth = 30;
    ctx.moveTo(loc.x, loc.y);
    ctx.lineTo(last.x, last.y);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.strokeStyle = strokeColor;
    ctx.stroke();

    loc = last;
  }
};

var btnClear = document.getElementById('btn-clear');
btnClear.onclick = function(e) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawBackground();
};

function windowToCanvas(x, y) {
  var bbox = canvas.getBoundingClientRect();
  return { x: Math.round(x - bbox.left), y: Math.round(y - bbox.top) };
}

function drawBackground() {
  ctx.strokeStyle = 'rgb(230,11,9)';

  ctx.save();
  ctx.beginPath();

  ctx.moveTo(3, 3);
  ctx.lineTo(3, canvasHeight - 3);
  ctx.lineTo(canvasWidth - 3, canvasHeight - 3);
  ctx.lineTo(canvasWidth - 3, 3);
  ctx.lineTo(3, 3);
  ctx.closePath();
  ctx.lineWidth = 10;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.moveTo(canvasWidth, 0);
  ctx.lineTo(0, canvasHeight);
  ctx.moveTo(canvasWidth, canvasHeight / 2);
  ctx.lineTo(0, canvasHeight / 2);
  ctx.closePath();
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.restore();
}

function draw() {}
