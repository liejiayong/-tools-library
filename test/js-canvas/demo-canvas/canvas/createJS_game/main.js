/**
 * Created by Administrator on 2016/2/23.
 */
var canvas,img,stage,model,container,txt

model = new createjs.EventDispatcher();
canvas = document.getElementById("mainView");

function init() {
    stage = new createjs.Stage(canvas);

    createjs.Touch.enable(stage);

    txt = new createjs.Text();
    txt.color = "#ffffff";
    txt.text = "%0";
    txt.font = "bold 45px Arial";
    stage.addChild(txt);

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("progress",loadProgressHandler);
    loader.addEventListener("complete", loadCompleteHandler);
    loader.loadManifest([
        {src:"images/woody_0.png", id:"woody_0"},
        {src:"images/woody_1.png", id:"woody_1"},
        {src:"images/woody_2.png", id:"woody_2"},
        {src:"images/freeze_0.png", id:"freeze_0"},
        {src:"images/freeze_1.png", id:"freeze_1"},
        {src:"images/freeze_2.png", id:"freeze_2"},
        {src:"images/guiqizhan.png", id:"guiqizhan"},
        {src:"images/iceBarrage.png", id:"iceBarrage"}
    ]);

    container = new createjs.Container();
    stage.addChild(container);



    createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", stageBreakHandler);
}
function handleFileLoad(evt) {
//    if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}
function loadProgressHandler(event)
{
    txt.text = Math.floor(event.progress*100);
}
var woody;
var freeze;
function loadCompleteHandler(event)
{
    event.currentTarget.removeEventListener("fileload",handleFileLoad);
    event.currentTarget.removeEventListener("progress",loadProgressHandler);
    event.currentTarget.removeEventListener("complete",loadCompleteHandler);


    woody = new cls.Woody()
    woody.x = 200;
    woody.y = 300;
    container.addChild(woody);


    freeze = new cls.Freeze();
    freeze.x = 700;
    freeze.y = 300;
    container.addChild(freeze);

    test1();
    setInterval(test1,12000)

//    var guiqizhan = new cls.Guiqizhan();
//    container.addChild(guiqizhan);
//    guiqizhan.y = 100;
//    guiqizhan.startRun(12,0);



//    setTimeout(function(){woody.changeArrow("left");},500),
//    setTimeout(function(){woody.jump();},1000)
}
function test1()
{
    setTimeout(function (){woody.startWalk(woody.walkSpeedX,0);},1000);
    setTimeout(function(){woody.startRun(woody.runSpeedX,0);},2000);
    setTimeout(function(){woody.startDecelerate();},3000)
    setTimeout(function(){woody.changeArrow("left");},4000);
    setTimeout(function(){woody.startAttack();},5000);
    setTimeout(function(){woody.startAttack();},5300);
    setTimeout(function(){woody.startAttack();},5600);
    setTimeout(function(){woody.startAttack(3);},5900);
    setTimeout(function(){woody.jump();},6500);
    setTimeout(function(){woody.startRun(-woody.runSpeedX,0);},7500);
    setTimeout(function(){woody.runJump();},7700);
    setTimeout(function(){woody.changeArrow("right");},8900);
    setTimeout(function(){woody.startguiqizhan();},9000);

    freeze.changeArrow("left")
    setTimeout(function (){freeze.startWalk(-woody.walkSpeedX,0);},1000);
    setTimeout(function(){freeze.startRun(-woody.runSpeedX,0);},2000);
    setTimeout(function(){freeze.startDecelerate();},3000)
    setTimeout(function(){freeze.changeArrow("right");},4000);
    setTimeout(function(){freeze.startAttack();},5000);
    setTimeout(function(){freeze.startAttack();},5300);
    setTimeout(function(){freeze.startAttack();},5600);
    setTimeout(function(){freeze.startAttack(3);},5900);
    setTimeout(function(){freeze.jump();},6500);
    setTimeout(function(){freeze.startRun(woody.runSpeedX,0);},7500);
    setTimeout(function(){freeze.runJump();},7700);
    setTimeout(function(){freeze.changeArrow("left");},8900);
    setTimeout(function(){freeze.startIceBarrage();},9000);
}
function stageBreakHandler(event)
{
    stage.update();
}

