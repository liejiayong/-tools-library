/**
因为每个人的动画都不一样，所以动画的实现要在子类中，
 * 角色Woody
 */
//Woody
(function() {
    "use strict";
    function Woody(){
        this.BasePeople_constructor();
        this.runSpeedX = 6;
    }
    var p = createjs.extend(Woody,cls.BasePeople);
    p.setSpriteData = function (){
        if(this.animation)
        {
            if(this.animation.parent)
            {
                this.animation.parent.removeChild(this.animation);
            }
        }
        this.data = {
            images: ["images/woody_0.png","images/woody_1.png","images/woody_2.png"],
            frames: {width:80, height:80, regX: 40, regY:40},
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
                },
                runJumpAttack:{
                    frames: [107,108,109],
                    speed: 0.3
                },
                guiqizhan:{
                    frames: [140,141,142,143,144,145,146,147,148,149,150,151],
                    next: "stand",
                    speed: 0.3
                }
            }
        };
        this.spriteSheet = new createjs.SpriteSheet(this.data);
        this.animation = new createjs.Sprite(this.spriteSheet, "stand");
        this.addChild(this.animation);
    }
    p.startguiqizhan = function (){
        this.changeStop();
        this.animation.gotoAndPlay("guiqizhan");
        var _this = this;
        this.addEventListener("tick",this._guiqizhaning = function (){_this.guiqizhaning()});
    }
    p.guiqizhaning = function (){
        if(this.animation.currentFrame == 144)
        {
            if(this.guiqizhan1 != 1)
            {
                var guiqizhan1 = new cls.Guiqizhan();
                this.parent.addChild(guiqizhan1);
                guiqizhan1.x = this.x + (this.arrow == "left"?-30:30);
                guiqizhan1.y = this.y;
                guiqizhan1.scaleX =  Math.abs(guiqizhan1.scaleX) * (this.arrow == "left"?-1:1);
                var num = (this.arrow == "left"?-10:10);
                guiqizhan1.startRun(num,0.5);
                this.guiqizhan1 = 1;
            }


        }
        else if(this.animation.currentFrame == 147)
        {
            if(this.guiqizhan2 != 1)
            {
                var guiqizhan2 = new cls.Guiqizhan();
                this.parent.addChild(guiqizhan2);
                guiqizhan2.x = this.x + (this.arrow == "left"?-30:30);
                guiqizhan2.y = this.y;
                guiqizhan2.scaleX =  Math.abs(guiqizhan2.scaleX) * (this.arrow == "left"?-1:1);
                var num = (this.arrow == "left"?-10:10);
                guiqizhan2.startRun(num,-0.5);

                this.guiqizhan2 = 1
            }

        }
        else if(this.animation.currentFrame == 151)
        {
            this.stopguiqizhan();
            this.guiqizhan1 = 0;
            this.guiqizhan2 = 0;
        }
    }
    p.stopguiqizhan = function (){
        this.animation.gotoAndPlay("stand");
        this.removeEventListener("tick",this._guiqizhaning);
    }
    cls.Woody = createjs.promote(Woody, "BasePeople");
}());
