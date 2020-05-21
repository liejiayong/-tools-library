/**
 *
 * Class
 *
 * 传统JavaScript程序使用 **函数** 和 **基于原型** 的继承来创建可重用的组件，
 * 但对于熟悉使用面向对象方式的程序员来讲就有些刺手，
 * 因为他们用的是 **基于类** 的继承并且对对象是由类构建出来的。
 *
 * 从ECMAScript 2015，也就是ECMAScript 6开始，
 * JavaScript程序员将能够使用基于类的面向对象的方式。
 *
 * 使用TypeScript，开发者现在就可以使用ECMAScript 6的特性，
 * 并且编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本。
 *
 * 派生类 通过使用 extends 来继承基类的 成员属性 与 成员方法
 *
 * 修饰符：
 * public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
 * private: 修饰的属性或方法是私有的，不能在声明它的类的外部访问(只能在类内，通过this.xxx访问与赋值),也不能被派生类访问,也不能被extends
 * protected: 修饰的属性或方法是受保护的，跟private相似。区别是protected的属性与方法可以通过extends,在派生类内部仍然可以访问，派生类外部不可访问（此特性可以用于修饰constructor，类不能new创建，从而起到保护作用）。
 * readonly修饰符：将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
 * static: 静态属性，被声明的 变量和方法 只能使用其构造函数来调用
 *
 * 存取器：存取器要求你将编译器设置为输出ECMAScript 5或更高。
 *  不支持降级到ECMAScript 3。 其次，只带有 get不带有 set的存取器自动被推断为 readonly。
 * get xx(){}
 * set xx(){}
 *
 */

//  默认不写public ,跟下面的Animal一样
class AnimalDefault {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }
  public move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}`);
  }
}

class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters: number = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

var snake = new Snake("Snake Python");
snake.move(100);
console.log(snake.name);

// 模板
class Persion {
  age: number;
  // 构造函数也可以被标记为protected。这意味着这个类不能再包含它的类外被实例化，但是能被继承，也就是可以在派生类中被super执行
  protected constructor(age: number) {
    this.age = age;
  }
  behavior(style: string) {
    console.log("behavior");
  }
}
class Employee extends Persion {
  readonly birthdate: Date = new Date();

  public tel: string;

  protected IQ: number;

  private uid: symbol = Symbol('uid');

  private _nickname: string;
  get nickname(): string {
    return this._nickname;
  }
  set nickname(s: string) {
    if (!s) {
      console.warn("please add some string for your hobby.");
    } else {
      this._nickname = s;
    }
  }

  constructor(age: number) {
    super(age);
  }

  static getInfo() {
    return `Your information is loading.`;
  }
}
const employee = new Employee(18);
// getter/setter
employee.nickname;
employee.nickname = "boss";
// public
employee.tel;
employee.tel = "18820785794";
// protected
// new Persion() // 报错，constructor被protected修饰，外部不可访问，不能被实例化
// employee.IQ // 报错，可用被派生类访问设置，不能被实例访问
// private
// employee.uid // 报错，因为private只能在构造函数内使用
