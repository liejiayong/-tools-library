var isDone = false;
var isBoolean = new Boolean(1);
var decLiteral = 6;
var hexLiteral = 0xf00d;
var octalLiteral = 484;
var binaryLiteral = 10;
var username = "Gene";
var sentence = "Hello, my name is " + username + ".\nI'll be " + (decLiteral + 1) + " years old next month.";
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
var tuple1;
tuple1 = ['ljy', 18];
var Color;
(function (Color) {
    Color[Color["blue"] = 0] = "blue";
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
})(Color || (Color = {}));
var blue = Color.blue;
console.log('color:', blue);
var pcSys;
(function (pcSys) {
    pcSys[pcSys["window"] = 1] = "window";
    pcSys[pcSys["imac"] = 3] = "imac";
    pcSys[pcSys["linux"] = 8] = "linux";
})(pcSys || (pcSys = {}));
var win10 = pcSys.window;
console.log('pcSys:', pcSys, win10);
var anyTest = 4;
anyTest = true;
anyTest = Object;
function voidFun() {
    anyTest = Array;
}
var unusable = undefined;
unusable = null;
var u = undefined;
var n = null;
function error(message) {
    throw new Error(message);
}
function fail() {
    return error('Something failed');
}
function infiniteLoop() {
    while (true) { }
}
create({ prop: 0 });
create(null);
var someValue = 'this is a string';
var strLength = someValue.length;
var strAsLength = someValue.length;
//# sourceMappingURL=baseType.js.map