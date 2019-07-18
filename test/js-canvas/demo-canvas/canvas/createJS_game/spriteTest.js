/**
 * Created by Administrator on 2016/7/14.
 */
var canvas,stage,container;
canvas = document.getElementById("mainView");
function init()
{
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", loadCompleteHandler);
    loader.loadManifest([
        {src:"images/woody_0.png", id:"woody_0"},
        {src:"images/woody_1.png", id:"woody_1"},
        {src:"images/woody_2.png", id:"woody_2"}
    ]);
    container = new createjs.Container();
    stage.addChild(container);

    createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", stageBreakHandler);
}
function loadCompleteHandler(event)
{
    event.currentTarget.removeEventListener("complete",loadCompleteHandler);

    var spriteData = {
        images: ["images/woody_0.png","images/woody_1.png","images/woody_2.png"],
        frames: {width:80, height:80, regX: 40, regY:40},  //frames是截取的宽高，regX，regY是中心点
		/*
			而animations是我给角色定义的一些动作，其中如果是数组，
			第一个参数代表起始帧，
			第二个参数代表结束帧，
			第三个参数代表结束后跳到哪个动作，
			第四个参数代表帧频。
			如果是对象那frames代表的是动作帧的顺序， next代表结束后跳转的动作， speed代表帧频.
		*/
        animations: {
            stand:[0,3,"stand",0.3],
            walk:{
                frames: [4,5,6,7,6,5],
                next: "walk",
                speed: 0.3
            },
            run:{
                frames: [20,21,22,21],
                next: "run",
                speed: 0.3
            },
            somersault:{
                frames: [58,59,69],
                next: "stand",
                speed: 0.3
            },
            attack1:[10,13,"stand",0.3],
            attack2:[14,17,"stand",0.3],
            attack3:{
                frames: [8,9,19],
                next: "stand",
                speed: 0.3
            },
            jump:{
                frames: [60,61,62],
                next: "jumpSky",
                speed: 0.3
            },
            jumpSky:{
                frames: [62],
                speed: 0.3
            },
            crouch:{
                frames: [61],
                next: "stand",
                speed: 0.3
            },
            runJump:{
                frames: [112],
                speed: 0.3
            }
        }
    };
    var spriteSheet = new createjs.SpriteSheet(spriteData);
    var sprite = new createjs.Sprite(spriteSheet,"stand");
	//上面代码中sprite的第二个参数代表默认的动作，最后gotoAndPlay就是你要跳转的动作，如果做游戏的话，你就可以按下按钮后执行这个动作。
    container.addChild(sprite);
    sprite.x = 200;
    sprite.y = 200;
    sprite.gotoAndPlay("run")
}
function stageBreakHandler(event)
{
    stage.update();
}
