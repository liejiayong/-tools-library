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
 * public: 公共修饰符，允许成员被访问。默认模式，可以不写。
 * private: 私有修饰符，不能在声明它的类的外部访问
 * protected: 保护修饰符，跟private相似，却别是protected成员在派生类中仍然可以访问。
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
  constructor(age: number) {
    this.age = age;
  }
  behavior(style: string) {
    console.log("behavior");
  }
}
class Employee extends Persion {
  readonly birthdate: Date;

  protected IQ: number;

  private uid: string;

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
