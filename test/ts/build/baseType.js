var isDone = false;
var isboolean = Boolean(1);
var isBoolean = new Boolean(1);
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
var username = "Gene";
var sentence = "Hello, my name is " + username + ".\nI'll be " + (decLiteral + 1) + " years old next month.";
var tuple1;
tuple1 = ['ljy', 18];
var anyTest = 4;
anyTest = true;
anyTest = Object;
var noDecribe;
noDecribe = 'seven';
noDecribe = 7;
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