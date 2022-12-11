/**
 * ES6中规定：
 * 1、var 命令和 function 命令声明的全局变量依旧像ES5中一样属于全局对象 window 的属性(浏览器环境)
 * 2、let 命令、const 命令和 class 命令声明的全局变量不属于全局对象的属性
 * */
{
  var a = 1;
  console.log(window.a);   //1

  let b = 2;
  console.log(window.b);   //undefined
}

/**===================================================================================================================*/
/**======================================================= let =======================================================*/
/**===================================================================================================================*/
//1、具备块级作用域
//2、不允许在相同作用域重复声明（包括用其他变量声明方式声明同名变量）
//3、没有变量提升，只能先声明再使用
//4、暂时性死区，即其将接管所在区域内的该变量的所有引用，作用域外的同名变量无法进入其内部
let methodName = 'talkName';

/*特点：
 * 1、块级作用域，声明的变量只在其所在代码块有效，一个花括号即可视为一个代码块
 * 2、不存在变量提升，先使用后声明会报is not defined语法错误(跟后面也未声明一样)，不像var先使用后声明只是值为undefined，但不会报错，所以let一定要先声明再使用
 * 3、暂时性死区，即只要块级作用域中存在let声明的变量，那这个变量将接管该作用域中所有区域，不受外部影响，外部有同名变量时是无法进入该区域的
 * 4、不允许重复声明，该特点适用于同一块级作用域(同一级，即使使用var或const声明)
 * */
{
  let a = 5;
  {
    console.log(a);    //报错，在声明前访问会报未定义语法错误，即使外部有同名变量(暂时性死区特性)
    let a = 3;
  }
}

/**===================================================================================================================*/
/**====================================================== const ======================================================*/
/**===================================================================================================================*/
//1、声明常量，不允许修改其值（指只能进行一次赋值操作，若存储的是对象或数组这样的是可以修改属性的）
//2、不允许在相同作用域重复声明（包括用其他变量声明方式声明同名变量）
//3、没有变量提升，只能先声明再使用
//4、暂时性死区，即其将接管所在区域内的该变量的所有引用，作用域外的同名变量无法进入其内部

/*特点：
 * 1、块级作用域，声明一个常量，声明的同时必须立即初始化，不能留到后面赋值，赋值操作只能有一次
 * 2、不存在变量提升，先使用后声明会报is not defined语法错误(跟后面也未声明一样)，不像var先使用后声明只是值为undefined，但不会报错，所以let一定要先声明再使用
 * 3、暂时性死区，即只要块级作用域中存在let声明的变量，那这个变量将接管该作用域中所有区域，不受外部影响，外部有同名变量时是无法进入该区域的
 * 4、不允许重复声明，该特点适用于同一块级作用域(同一级，即使使用var或const声明)
 * 5、常量名存储复合类型变量时，存储的是一个地址，指向一个数据（如对象、数组)，不可变的只是这个地址，但数据本身是可以改变值的，
 *    若要使一个对象值不可修改，应使用 const obj = Object.freeze({a:1,b:2}) 方法冻结对象，注意 Object.freeze 方法冻结的只是对象的一级，若属性中有嵌套的对象的则需要遍历出来都冻结上才能使整个对象无法修改
 * */
{
  const a = 5;
  // a = 3;  //报错

  const b = {one:1};
  b.one = 2;  //可以修改，不会报错
}
function constantize(obj) {     //实际这里只考虑了对象嵌套，但若属性值还存在数组的情况就不适用了
  Object.freeze(obj);
  Object.keys(obj).forEach( (key) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
}

/**===================================================================================================================*/
/**================================================== Object对象扩展 ==================================================*/
/**===================================================================================================================*/
{
  let name = 'wanje';
  let age = 26;
  let obj = {
    //属性简写，当属性名与属性值变量名相同时，可只写一个
    name,       //等同于 name: name
    age,         //等同于 age: age
    //name方法简写，可省略 function 关键字和‘:’冒号
    sayName(){      //等同于 sayName: function(){ }
      //通过该简写方式创建的方法有一个 name 属性，值为小括号前的名称及sayName，就像返回的 name 属性返回函数名一样
      console.log(this.name, obj.sayName.name);    //'wanje' sayName
      return this.name
    },
    [name]: 'handsome'   //使用计算属性名，在es5中只能在对象实例中通过方括号使用计算属性名，而对象字面量{}中无法定义计算属性名，但es6中已支持，用来定义属性和方法名都可以
  };

  /** Object对象上新增的方法 */
  //比较两个参数是否相等，只要两个参数数据类型相同，且具有相同的值就返回true，否则false。其作用是用于弥补全等运算符的不准确运算
  //其运行结果大部分情况与全等===运算符相同，唯一区别在于：+0和-0被识别为不相等，且NaN与NaN等价，而全等运算对着两个情况的结果刚好相反
  Object.is(name, age);
  //合并对象，接受至少两个对象参数，第一个为接收对象，后面的都为源对象，将源对象上的所有属性都浅拷贝到接收对象中，同名属性后面的将覆盖前面的，最终返回接收对象
  //注意该方法在合并时是使用的浅拷贝，也就是说对于引用类型属性值拷贝的只是地址指向，且只进行一层合并
  //且该方法不能直接将源对象中的访问器属性拷贝到接收对象中，而会将其转变为接收对象中的一个数据属性(即将get定义的属性直接将返回的结果复制过去，而不是将get定义复制过去)
  Object.assign(obj1, ...obj2);   //将后面所有对象的属性都合并到obj1中，一般都将一个空对象{}作为接收对象，以免破坏参数
  //设置或改变对象的原型指向，es6语法，而与之对应的 getPrototypeOf(obj) 获取对象obj的原型是es5方法
  Object.setPrototypeOf(obj1, obj2);  //将对象obj1的原型设置或改变为obj2

  let obj2 = {
    sayName(){
      /**使用 super 关键字引用原型对象，且super总能正确指向原型*/
      //注意该 super 引用必须在使用简写方法(即省略function关键字和冒号的方法)的对象中使用，其他方法声明中将报错
      return 'Hello' + super.sayName();   //相当于es5中 Object.getPrototypeOf(this).sayName.call(this)，但该getPrototypeOf方式在多层继承中将出问题
      //super关键字在这里作为对象使用指向对象的原型(对象)，而在class类中super作为函数调用，相当于基类的构造函数constructor
    }
  };
  Object.setPrototypeOf(obj2, obj);
  obj2.sayName();     //'Hello wanje'
}
