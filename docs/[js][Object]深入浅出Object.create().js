/**
 * @description: Object.create() 的使用
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-09 17:41:32
 */
var org = { type: 'human' }
var persion = Object.create(org)
var persionSelf = Object.create(org, {
    name: {
        value: 'NvWa',
        configurable: false,
        enumerable: true,
        writable: false
        // 注意不能同时制定get/set和writable
        // get() {
        //     return '-'
        // },
        // set(val) {
        //     console.log("persionSelf Setting name", val);
        // }
    }
})
console.log('first visit: ', persion, Object.getPrototypeOf(persion), persionSelf, Object.getPrototypeOf(persionSelf))

/**
 * @description: 对比 Object.create() 和 new Object()
 * @param {type}
 * @return {type}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-09 17:41:39
 */
var objNull = new Object()
var Obj = new Object(org)
console.log('create by new Object()', Obj) // { type: 'human' }
console.log(Obj.__proto__) // {} -> built-in
console.log(Obj.type) // human
console.log(Object.getOwnPropertyDescriptors(Obj)) // {type: {configurable: true,enumerable: true,value: "human",writable: true}}

var objCreNull = Object.create(null)
var ObjCre = Object.create(org, { name: { value: 'JyLie' } })
console.log('create by Object.create', ObjCre) // {name: 'JyLie'}
console.log(ObjCre.__proto__) // { type: 'human' }
console.log(ObjCre.type) // human
console.log(Object.getOwnPropertyDescriptors(ObjCre)) // {type: {configurable: false,enumerable: false,value: "human",writable: false}}
console.log(ObjCre.name) // JyLie
ObjCre.name = "SuperJyLie" // JyLie。不可修改
delete ObjCre.name // false。不可删除
ObjCre.__proto__ === org // true

/**
 * @description: 传统方法设置原型链
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-09 19:21:41
 */
var Person = function () { this.type = "human" }
Person.prototype.age = 18
Person.prototype.name = "JyLie"
Person.prototype.show = function () { }
Object.assign(Person.prototype, { objAssign: true }) // 为原型链添加属性objAssign
//通过构造函数创建实例
var traditionPserion = new Person();
traditionPserion.__proto__ === Person.prototype // true
// 设置 get/set，测试对象继承的get/set
Object.defineProperty(traditionPserion, 'getType', {
    enumerable: true, // 设为可枚举，不然 Object.assign 方法会过滤该属性
    get() {
        return "Could get: " + this.type
    },
    set(val) {
        this.type = val
    }
});

// 设置情景继承对象实例traditionPserion
var traditionPserionObjAs = Object.assign({}, traditionPserion)
// 此时traditionPserionObjAs只会继承traditionPserion的实例属性和set/get属性（但失去get/set的功能），但不能继承traditionPserion的原型属性和方法
traditionPserionObjAs.show //  不能拷贝到原型上的方法
traditionPserionObjAs.type = 'Alient'
traditionPserionObjAs.getType //  getType不会动态改变
traditionPserionObjAs.name //  能拷贝到原型上的方法

// 如果你不需要设置get/set，那么可以对上面实现小改也可以达到目的
var traditionPserionProto = Object.getPrototypeOf(traditionPserion)
var traditionPserionProtoNew = Object.create(traditionPserionProto);
var traditionPserionByProtoAndObjAss = Object.assign(traditionPserionProtoNew, traditionPserion)

// 使用Object.getOwnPropertyDescriptors 和 Object.getPrototypeOf() 可以正确拷贝原型对象的方法和属性、实例属性的方法和属性（包括get/set）
var traditionPserionProto = Object.getPrototypeOf(traditionPserion)
var traditionPserionOwnPropDesc = Object.getOwnPropertyDescriptors(traditionPserion)
var traditionPserionByProtoAndOwnPropDesc = Object.create(traditionPserionProto, traditionPserionOwnPropDesc)



/**
 * @description: Object.setPrototypeOf()
 * @param {type}
 * @return {type}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-09 19:27:25
 */
var setPrototype = { sex: '女' };
Object.setPrototypeOf(setPrototype, person);
setPrototype.__proto__ === person // true
Object.getPrototypeOf(setPrototype) === person // true
