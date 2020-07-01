function declarationFn(x, y) {
    return x + y;
}
declarationFn(1, 2);
var expSucFn = function (x, y, symbol) {
    return x + y;
};
var searchFn;
searchFn = function (source, subString) {
    return source.search(subString) !== -1;
};
function nameFn(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
var tomcat = nameFn('Tom', 'Cat');
var tom = nameFn('Tom');
function argumentFn(firstName, lastName) {
    if (firstName === void 0) { firstName = 'Tom'; }
    if (lastName === void 0) { lastName = 'men'; }
    return firstName + ' ' + lastName;
}
var argument = argumentFn();
function pushFn(arr) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (val) { return arr.push(val); });
}
pushFn([1, 2, 3], 'a');
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
//# sourceMappingURL=functionType.js.map