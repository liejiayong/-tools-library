var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AnimalDefault = (function () {
    function AnimalDefault(theName) {
        this.name = theName;
    }
    AnimalDefault.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters);
    };
    return AnimalDefault;
}());
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters);
    };
    return Animal;
}());
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
var snake = new Snake("Snake Python");
snake.move(100);
console.log(snake.name);
var Persion = (function () {
    function Persion(age) {
        this.age = age;
    }
    Persion.prototype.behavior = function (style) {
        console.log("behavior");
    };
    return Persion;
}());
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(age) {
        var _this = _super.call(this, age) || this;
        _this.birthdate = new Date();
        _this.uid = Symbol('uid');
        return _this;
    }
    Object.defineProperty(Employee.prototype, "nickname", {
        get: function () {
            return this._nickname;
        },
        set: function (s) {
            if (!s) {
                console.warn("please add some string for your hobby.");
            }
            else {
                this._nickname = s;
            }
        },
        enumerable: false,
        configurable: true
    });
    Employee.getInfo = function () {
        return "Your information is loading.";
    };
    return Employee;
}(Persion));
var employee = new Employee(18);
employee.nickname;
employee.nickname = "boss";
employee.tel;
employee.tel = "18820785794";
//# sourceMappingURL=class.js.map