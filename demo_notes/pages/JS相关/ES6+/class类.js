/**===================================================================================================================*/
/**====================================================== class ======================================================*/
/**===================================================================================================================*/
//1、类声明不可提升
//2、其内的代码运行在严格模式下
//3、其内的所有方法都不可枚举
//4、默认就存在一个 constructor 构造方法，即使不显式定义
//5、必须以 new 的方式调用类，否者将报错
//6、不可在内部修改类名，外部可以，即假设类名为Foo内部不能直接使用Foo=sth的操作覆盖，而在外部可以

class PersonClass {   //声明一个名为PersonClass的类，其 typeof 类型将返回 function
  /**概念解读
   * 类、构造函数
   * 这两者从方法名上在类中可以理解为同一个东西，对外PersonClass称为类名，对内则是就是类的构造函数名，因为除了constructor其他方法都是定义在原型上的(这里排除静态方法)
   * 就像在es5中一样，PersonClass就是一个构造函数，es6只是用class类将es5中工厂函数各功能定义简化了而已(语法糖，但添加了些特性，如所有方法都不可枚举)
   * */

  // constructor 关键字为构造器方法(构造函数)，其中定义的属性是实例中的私有属性，且在实例化时就会调用该方法；
  // 等同于构造函数实例属性/方法：function Person(name){this.name=name;}
  constructor(name){
    this.name = name    // 若未显示定义name属性值，则name属性值将为该类名‘PersonClass’，就像函数的name属性为函数名一样
  }

  //之间不用逗号隔开
  //除了 constructor 中和static静态方法外，以下其他定义的方法或属性都是在原型上

  // 自定义的原型上的其他方法
  // 等同于构造函数定义的prototype上原型方法：Person.prototype.sayName=foo
  sayName(){
    console.log(this.name)
  }

  // 也支持在原型上定义访问器属性
  // 等同于使用defineProperty方法在Person.prototype上定义nickname属性，并在描述对象中使用get和set
  get nickname(){
    return '小' + this.name
  }
  set nickname(value){
    this.name = value
  }

  //支持使用可计算名称，即使用变量作为方法名或属性名(包括访问器属性)，同es6中对象字面量使用可计算名称一样，用中括号包裹一个表达式：[exp]
  [methodName](){     //这里的 methodName 是前面定义的一个变量，其值将作为这里的方法名
    console.log(this.name)
  }

  /**？？？生成器方法，该部分等研究过es6对象生成器后再来看*/

  // 静态成员，使用关键字 static，可用于类中除构造器外的所有方法和访问器属性的定义，且静态成员不可在实例中访问，必须直接通过类访问
  // 等同于构造函数方法：Person.create=foo
  // 在es5中，直接定义在构造函数上的方法(不是this上)调用不依赖于其实例，被认为是静态方法，像Object.keys()形式；而定义在原型prototype上的方法必须要依赖于实例调用，像obj.toString()形式
  static create(name){
    return new PersonClass(name)    //这里用于调用静态create方法时也能实例化一个类，该方式比较常用
  }

}

/**类的继承，静态方法也会被继承
 * 使用 extends 关键字
 * 子类中的方法总会覆盖父类中的同名方法，可用于屏蔽父类某方法(即不需要父类某方法)，但仍可通过super.methodName()方式调用父类同名方法
 * */
class StudentClass extends PersonClass {    //StudentClass称为PersonClass的派生类或子类，PersonClass成为基类或父类

  // 若在子类中指定了构造函数则必须要调用 super()，否则会报错；若选择不使用构造函数则当创建新的类实例时会自动调用 super()并传入所有参数
  // 一般子类要传入额外的参数(或参数个数减少)，或者在实例化时就要做父类构造函数中没有的操作时就要指定自己的构造函数添加额外的内容
  constructor(name,grade){
    //super关键字代表父类，super()表示调用父类构造函数，若要调用父类方法可通过super.methodName()方式，子类中存在父类同名方法时就可以这样调用父类同名方法
    super(name);            //等同于es5中 PersonClass.call(this, name)
    this.grade = grade;     //只有调用了 super 才能在该子类建立 this
    // new.target 检测函数或构造方法(包括类)是否是通过new运算符被调用的，属于ES6规范
    // 在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是undefined
    // 在类中 new.target 可用于创建一个抽象基类只用于继承而不能直接实例化（可在基类中限定 new.target 指向基类本身时就抛出错误），但可以通过其他类去实例化它(非new方式，如继承中调用super)
    console.log(new.target === StudentClass)     //因为类必须通过new方式调用，所以这里将为 true
  }

}
/**类还可以使用extends继承任何能被解析为一个函数且具有 [[Construct]] 属性和原型的表达式，总结三条件：
 * 1、可被解析为函数
 * 2、具有[[Construct]]属性；
 * 3、具有原型
 *
 * 如es5中的工厂函数，若将下面extends后面的FactoryFn换成一个返回满足上面三个条件的表达式的函数，还可以给函数传入参数来动态创建继承目标，
 * 在该函数中还可以用Object.assign等方式来mixin混合多个其他有相关方法或属性的对象，达到功能拆分解耦复用等目的，具体例子可参考《深入ES6中P202》
 *
 * 此外，类还可以用于继承内建对象(如Array、String、Function、Math、Date、RegExp等)，具体例子可参考《深入ES6中P204》
 * 例如数组Array(es5中只能使用apply或call改变Array上某个方法的this指向，而做不到一次继承Array上的所有属性/方法且又能保留其之间的影响关系[如length与一些方法间的互相影响])，再扩展成属于自己的特殊数组
 * */
function FactoryFn(name) {  //1、解析为函数
  //2、作为构造函数，具有[[Construct]]属性
  this.name = name;
}
FactoryFn.prototype.spellName = function () {       //3、具有原型
  console.log(this.name)
};
class Boy extends FactoryFn {   //这里的 Boy 类继承自上面的 FactoryFn 工厂函数
  constructor(){
    super()
    //code ...
  }
}
//继承 Array 内建对象
class MyArr extends Array {
  // 在继承自内建对象的类中，原本在内建对象中返回实例自身的方法将自动返回派生类的实例，而浏览器引擎背后就是通过 Symbol.species 属性实现的（Array、Array Buffer、Typed arrays、Map、Set、Promise、RegExp中默认已定义该属性）
  // 这些内建对象中类似下面方式定义了 Symbol.species 属性返回this当前构造函数，每当在实例的方法中创建自身类时就必须使用这个构造函数
  // 举例说就是：
  // 像数组的 slice 方法原本返回的是一个Array实例，在被 MyArr 继承后，MyArr的实例调用该slice方法时返回并不是Array实例，而是MyArr实例，
  // 因为slice方法内部在创建新实例返回时使用的构造函数是继承自父类中 Symbol.species 属性的定义，返回的构造函数(this)，此时this指向的就是 MyArr 本身构造函数，
  // 若将this改为其他类，那么将使用其他类的构造函数创建类实例返回
  // 默认子类会继(若有)父类的 Symbol.species 属性定义，但也可在子类中重写(自定义)
  static get [Symbol.species](){
    return this;        //若此处改为 Array，则下面clone方法返回的将是Array实例而非MyArr实例
  }
  clone(){
    return new this.constructor[Symbol.species](args)   //this.constructor[Symbol.species]会返回上面[Symbol.species]定义中返回的内容
  }
}


// 类表达式，设计初衷是为了声明相应变量或传入函数作为参数
// 上面的类声明与这里的类表达式，在功能上是等价的，二者最重要的区别在于 name 属性不同，匿名类表达式的name属性值为空字符串
let Person2Class = class {      //这里也可以给class类命名，但没有意义，同函数表达式一样
  constructor(name){
    this.name = name
  }
  sayName(){console.log(this.name)}
};


// 通过立即调用类构造函数的方式可以创建单例
let person = new class {
  constructor(name){
    this.name = name
  }
  sayName(){console.log(this.name)}
}('wanje');

person.sayName();   //logs：'wanje'