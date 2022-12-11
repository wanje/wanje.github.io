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


/**====================================== 模块定义 ======================================*/
/**
 * 使用 exports 对象导出当前模块的方法或者变量，且exports是导出的唯一出口；
 * 在模块中，还存在一个 module 对象，它代表模块自身，而 exports 是 module 的属性（这与上面提到的node编译JS模块所做的头尾包装有关，包装时传入的exports就已经是module的属性）
 * 我们在添加或修改 exports 上的属性时，exports对象的引用并未改变，故变化也能反映在module.exports上，从而可正确导出；
 * 但是若直接给 exports 进行赋值操作时，其引用就发生变化了，因为其实际是node传入的一个形参，形参改变引用并不能改变其原对应实参的引用，所以module.exports并不会变化，也就导致导出会失败；
 * 若要直接整体导出一个已包含全部要导出属性和方法的对象或者类，这时就可以直接对 module.exports 进行赋值导出该对象或类，因为最终的实际导出本就是要通过  module.exports 反映
 * 在node中，一个文件就是一个模块，将方法或变量挂载在 exports 对象上作为属性即可定义导出的方式
 * */
// module.exports = {props, methods};   //若要直接导出整个对象或类则就要赋值给 module.exports，而不是 exports
exports.add = function (a, b) {
    return a + b;
};