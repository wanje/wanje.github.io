/**
 * node在编译获取的JS文件内容时，对文件内容进行了如下的头尾包装，
 * 所以才使得每个模块文件中未定义require、exports、module、__filename、__dirname这几个变量，却能直接使用
 * */
(function (exports, require,  module, __filename, __dirname) {
    //exports其实是module的属性也被单独传入可直接使用，但实际导出是反映在module.exports上的，所以一个个导出可使用exports，整体导出则要使用module.exports
    //__filename为当前模块文件的绝对路径
    //__dirname为当前模块文件所在目录的绝对路径

    //JS模块文件内容被放在这里...
});
// console.log(require, exports, module, __filename, __dirname);


/**====================================== 模块引用 ======================================*/
/**
 * 使用 require() 方法引入一个外部模块的API到当前上下文中，其参数为模块标识（就是模块文件）
 * 模块标识参数类型：
 * 1、符合小驼峰命名的字符串（引入的模块会从文件所在位置开始逐级向上查找node_modules文件夹，直到根目录（类似JS中的原型链查找），包括Node自身提供的核心模块和用户自定义模块，其中node核心模块加载时可省略文件定位和编译执行两个步骤）
 * 2、以./、../开头的相对路径，或者绝对路径，此为用户编写的文件模块；加载时需要路径分析、文件定位、编译执行几个过程
 *
 * 模块标识可以不加文件后缀，此时node会按.js、.json、.node三种扩展依次尝试加载，所以若是后两种文件可加上扩展名避免浪费性能，若是这三种扩展的文件都未找到而是找到了一个同名目录，则node会将其当做一个包来处理
 * */
let math = require('./math');     //这里引入了 math.js 模块，之后 math.js 模块中定义导出的方法或属性都可以通过math变量访问到（相当于将math.js中的module.exports赋给了math变量）


/**====================================== 模块定义 ======================================*/
/**
 * 使用 exports 对象导出当前模块的方法或者变量，且exports是导出的唯一出口；
 * 在模块中，还存在一个 module 对象，它代表模块自身，而 exports 是 module 的属性（这与上面提到的node编译JS模块所做的头尾包装有关，包装时传入的exports就已经是module的属性）
 * 在node中，一个文件就是一个模块，将方法或变量挂载在 exports 对象上作为属性即可定义导出的方式
 *
 * 我们在添加或修改 exports 上的属性时，exports对象的引用并未改变，故变化也能反映在module.exports上，从而可正确导出；
 * 但是若直接给 exports 进行赋值操作时，其引用就发生变化了，因为其实际是node传入的一个形参，形参改变引用并不能改变其原对应实参的引用，所以module.exports并不会变化，也就导致导出会失败；
 * 若要直接整体导出一个已包含全部要导出属性和方法的对象或者类，这时就可以直接对 module.exports 进行赋值导出该对象或类，因为最终的实际导出本就是要通过  module.exports 反映
 * */
// module.exports = {props, methods};   //若要直接导出整个对象或类则就要赋值给 module.exports，而不是 exports
exports.increment = function (val) {
    return math.add(val, 1);
};