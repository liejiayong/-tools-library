/**
 * 技能鬼气斩
 */
//Guiqizhan
(function (){
    "use strict";
    function Guiqizhan() {
        this.Barrage_constructor();
    }
    var p = createjs.extend(Guiqizhan,cls.Barrage);
    p.setSpriteData = function () {
        if (this.animation) {
            if (this.animation.parent) {
                this.animation.parent.removeChild(this.animation);
            }
        }
        this.data = {
            images: ["images/guiqizhan.png"],
            frames: {width: 82, height: 83, regX: 41, regY: 41.5},
            animations: {
                run: [0, 3, "run", 0.3],
                hit: [4, 7, "", 0.3],
                run2: [8, 11, "run2", 0.3]
            }
        };
        this.spriteSheet = new createjs.SpriteSheet(this.data);
        this.animation = new createjs.Sprite(this.spriteSheet, "run");
        this.addChild(this.animation);
    }
    p.run2 = function (sx,sy){
        this.animation.gotoAndPlay("run2");
        this.sx = sx;
        this.sy = sy;
        var _this = this;
        this.addEventListener("tick",this._runing = function (){_this.runing()})
    }
    cls.Guiqizhan = createjs.promote(Guiqizhan, "Barrage");
}())