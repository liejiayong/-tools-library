var canvas,
    stage,
    container,
    w = window.innerWidth,
    h = window.innerHeight,
    s,
    dt = '';

function init() {
    //设置canvas属性
    canvas = document.getElementById('game');
    canvas.width = w;
    canvas.height = h;
    //创建舞台
    stage = new createjs.Stage(canvas);
    container = new createjs.Container();//绘制外部容器
    stage.addChild(container);

    //创建矩形
    s = new DrawPillars();

    //注册事件
    s.on('click', function () {
        alert();
    });
    //PS：Shape 类是没有getBounds这个方法，可以通过setBounds来获得
    var bounds = s.getBounds();

    //右下角控制矩形位置
    s.x = w - bounds.width;
    s.y = h - bounds.height;

    //加入场景
    container.addChild(s);
    stage.update();
}

//绘制矩形 类
function DrawPillars() {
    createjs.Shape.call(this);//继承Shap类
    this.graphics.beginFill("#ff0000").drawRect(0, 0, 50, 50);
    this.setBounds(0,0,50,50);//设置矩形的边界属性，这样可以获得width和height属性
}
DrawPillars.prototype = new createjs.Shape();//获得原型方法


createjs.Ticker.setFPS(60);//设置游戏帧率
createjs.Ticker.on("tick", tick);

function tick() {
    if (s.x > 0 && s.x <= 10 && s.y > 0 && s.y <= 10) {//左上角
        dt = 3;
    } else if (s.x > 0 && s.x <= 10 && s.y > h - s.getBounds().height - 10 && s.y <= h - s.getBounds().height) {//左下角
        dt = 2;
    } else if (s.x > w - s.getBounds().width - 10 && s.x <= w - s.getBounds().width && s.y > 0 && s.y <= 10) {//右上角
        dt = 1;
    } else if (s.x > w - s.getBounds().width - 10 && s.y > h - s.getBounds().height - 10 && s.y <= h - s.getBounds().height) { //右下角
        dt = 0;
    }

    switch (dt) {
        case 0:
            s.x -= 5;
            break;
        case 1:
            s.y += 5;
            break;
        case 2:
            s.y -= 5;
            break;
        case 3:
            s.x += 5;
    }
    stage.update();
}