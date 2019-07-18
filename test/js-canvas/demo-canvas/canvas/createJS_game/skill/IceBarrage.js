/**
 * 技能冰弹
 */
//IceBarrage
(function (){
    "use strict";
    function IceBarrage() {
        this.Barrage_constructor();
    }
    var p = createjs.extend(IceBarrage,cls.Barrage);
    p.setSpriteData = function () {
        if (this.animation) {
            if (this.animation.parent) {
                this.animation.parent.removeChild(this.animation);
            }
        }
        this.data = {
            images: ["images/iceBarrage.png"],
            frames: {width: 82, height: 83, regX: 41, regY: 41.5},
            animations: {
                run: [0, 3, "run", 0.3],
                hit: [4, 7, "", 0.3]
            }
        };
        this.spriteSheet = new createjs.SpriteSheet(this.data);
        this.animation = new createjs.Sprite(this.spriteSheet, "run");
        this.addChild(this.animation);
    }
    cls.IceBarrage = createjs.promote(IceBarrage, "Barrage");
}())