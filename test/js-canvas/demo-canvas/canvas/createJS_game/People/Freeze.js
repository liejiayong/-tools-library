/**
 * 角色Freeze
 */
//Freeze
(function() {
    function Freeze(){
        this.BasePeople_constructor();
    }
    var p = createjs.extend(Freeze,cls.BasePeople);
    p.setSpriteData = function (){
        if(this.animation)
        {
            if(this.animation.parent)
            {
                this.animation.parent.removeChild(this.animation);
            }
        }
        this.data = {
            images: ["images/freeze_0.png","images/freeze_1.png","images/freeze_2.png"],
            frames: {width:80, height:80, regX: 40, regY:40},
            animations: {
                stop:[0],
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
                attack1:[10,11,"stand",0.3],
                attack2:[12,13,"stand",0.3],
                attack3:{
                    frames: [17,18,19],
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
                iceBarrage:[140,145,"stand",0.3]
            }
        };
        this.spriteSheet = new createjs.SpriteSheet(this.data);
        this.animation = new createjs.Sprite(this.spriteSheet, "stand");
        this.addChild(this.animation);
    }
    p.startIceBarrage = function (){
        this.changeStop();
        this.animation.gotoAndPlay("iceBarrage");
        var _this = this;
        this.addEventListener("tick",this._iceBarrageing = function (){_this.iceBarrageing()});
    }
    p.iceBarrageing = function (){
        if(this.animation.currentFrame == 142)
        {
            if(this.iceBarrage != 1)
            {
                var iceBarrageing = new cls.IceBarrage();
                this.parent.addChild(iceBarrageing);
                iceBarrageing.x = this.x + (this.arrow == "left"?-30:30);
                iceBarrageing.y = this.y;
                iceBarrageing.scaleX =  Math.abs(iceBarrageing.scaleX) * (this.arrow == "left"?-1:1)
                var num = (this.arrow == "left"?-12:12);
                iceBarrageing.startRun(num,0);

                this.iceBarrage = 1;
            }


        }
        else if(this.animation.currentFrame == 145)
        {
            this.stoptIceBarrage();
            this.iceBarrage = 0;
        }
    }
    p.stoptIceBarrage= function (){
        this.animation.gotoAndPlay("stand");
        this.removeEventListener("tick",this.iceBarrageing);
    }
    cls.Freeze = createjs.promote(Freeze, "BasePeople");
}());
