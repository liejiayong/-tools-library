let p = new Promise.resolve(21);
let p2 = p.then(function (d) {
    console.log(d);
    return 2 * d;
});
p2.then(function (v) {
    console.log(v);
})