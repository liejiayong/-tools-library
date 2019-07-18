/**
 * 弹道技能基类 所有弹道技能均继承与此类
 */
//Barrage
(function (){
    "use strict";
    function Barrage() {
        this.Container_constructor();
        this.arrow = "right";
        this.setSpriteData();
    }
    var p = createjs.extend(Barrage,createjs.Container);
    p.move = function (x,y){
        this.x +=x;
        this.y +=y;
    }
    p.setSpriteData = function (){

    }
    p.startRun = function (sx,sy){
        this.animation.gotoAndPlay("run");
        this.sx = sx;
        this.sy = sy;
        var _this = this;
        this.addEventListener("tick",this._runing = function (){_this.runing()})
    }
    p.runing = function (){
        this.move(this.sx,this.sy);
        if(this.x > (1206 + 100)||this.x < -100||this.y < -100||this.y > 1206)
        {
            this.stopRun()
        }
    }
    p.stopRun = function (){
        this.removeEventListener("tick",this._runing)
        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }
    p.startHit = function (){
        this.changeStop();
        this.animation.gotoAndPlay("hit");
        var _this = this;
        this.addEventListener("tick",this._hitting = function (){_this.hitting()})
    }
    p.hitting = function (){
        var list = this.data.animations.hit.frames;
        if( this.animation.currentFrame == list[list.length - 1] )
        {
            this.stopHit();
        }
    }
    p.stopHit = function (){
        this.removeEventListener("tick",this._hitting);
        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }
    p.changeStop = function (){//因需要切换动作而停止当前的动作侦听
        this.removeEventListener("tick",this._runing);
        this.removeEventListener("tick",this._hitting)
    }
    cls.Barrage = createjs.promote(Barrage, "Container");
}())