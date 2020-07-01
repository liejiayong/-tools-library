var Color;
(function (Color) {
    Color[Color["blue"] = 0] = "blue";
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
})(Color || (Color = {}));
var blue = Color.blue;
var color = [Color.blue, Color.red, Color.green];
console.log("color :", blue);
console.log("color:", color);
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
var direction = [
    Direction.Up,
    Direction.Down,
    Direction.Left,
    Direction.Right,
];
console.log("direction :", direction);
var pcSys;
(function (pcSys) {
    pcSys[pcSys["window"] = 1] = "window";
    pcSys[pcSys["imac"] = 3] = "imac";
    pcSys[pcSys["linux"] = 8] = "linux";
})(pcSys || (pcSys = {}));
var sys = [pcSys.window, pcSys.imac, pcSys.linux];
console.log("sys :", sys);
var httpStatus;
(function (httpStatus) {
    httpStatus[httpStatus["no"] = 0] = "no";
    httpStatus[httpStatus["yes"] = 0] = "yes";
})(httpStatus || (httpStatus = {}));
function response(recipient, message) { }
response("suc", httpStatus.yes);
var Gesture;
(function (Gesture) {
    Gesture["Up"] = "UP";
    Gesture["Down"] = "DOWN";
    Gesture["Left"] = "LEFT";
    Gesture["Right"] = "RIGHT";
})(Gesture || (Gesture = {}));
var gesture = [
    Gesture.Up,
    Gesture.Down,
    Gesture.Left,
    Gesture.Right,
];
console.log("gesture: ", gesture);
var BooleanLikeHeterogeneousEnum;
(function (BooleanLikeHeterogeneousEnum) {
    BooleanLikeHeterogeneousEnum[BooleanLikeHeterogeneousEnum["No"] = 0] = "No";
    BooleanLikeHeterogeneousEnum["Yes"] = "YES";
})(BooleanLikeHeterogeneousEnum || (BooleanLikeHeterogeneousEnum = {}));
var E;
(function (E) {
    E[E["X"] = 0] = "X";
})(E || (E = {}));
var E1;
(function (E1) {
    E1[E1["X"] = 0] = "X";
    E1[E1["Y"] = 1] = "Y";
    E1[E1["Z"] = 2] = "Z";
})(E1 || (E1 = {}));
var E2;
(function (E2) {
    E2[E2["A"] = 1] = "A";
    E2[E2["B"] = 2] = "B";
    E2[E2["C"] = 3] = "C";
})(E2 || (E2 = {}));
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
var EU;
(function (EU) {
    EU[EU["Foo"] = 0] = "Foo";
    EU[EU["Bar"] = 1] = "Bar";
})(EU || (EU = {}));
function f(x) {
    if (x !== EU.Foo) {
    }
}
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var en = Enum.A;
var nameOfA = Enum[en];
var constEnum;
(function (constEnum) {
    constEnum[constEnum["A"] = 1] = "A";
    constEnum[constEnum["B"] = 2] = "B";
})(constEnum || (constEnum = {}));
//# sourceMappingURL=enumType.js.map