//1、Promise对象代表一个异步操作，有3种状态：Pending(进行中)、Resolved(已完成，又称Fulfilled)、Rejected(已失败)
//2、状态改变只有两种可能：Pending到Resolved、Pending到Rejected，只要其中之一发生，状态就固定不再改变，就算改变已发生，你再对Promise对象添加回调函数也会立即得到相同的结果
//3、Promise无法取消，一旦创建就会立即执行，无法中途取消；若不设置回调函数，Promise内部抛出的错误不会反应到外部；当处于Pending状态时，无法得知目前进展到哪个阶段(刚开始还是即将完成)

let onePromise = new Promise (function (resolve, reject) {
  /**
   * Promise 构造函数接受一个函数作为参数，该函数有两个内置函数参数resolve和reject，由JS引擎提供，不用自己部署，而后通过实例的then()方法定义实际的相应回调函数
   * resolve 函数的作用是将Promise对象状态由Pending变为Resolved，在异步操作成功时调用，并可将异步操作的结果作为参数传递出去（自定义要传的数据）
   * reject 函数的作用是将Promise对象状态由Pending变为Rejected，在异步操作失败时调用，并可将异步操作报出的错误作为参数传递出去（自定义要传的数据）
   * */
  //...some code
  if ('异步操作成功'){
    /**
     * resolve函数的参数除了正常的数据值外，还可以是另一个Promise实例，表示异步操作的结果也可以是另一个异步操作
     * 当参数是另一Promise实例时，内部实例的状态就会传递给外部，也就是内部实例状态决定外部实例状态，
     * 若内部实例状态是Pending，那么外部实例的回调函数就会等待内部实例的状态改变；若内部状态已经是Resolved或Rejected，那么外部实例的回调函数就会立即执行
     * */
    resolve('value');

  }else {
    /** reject函数的参数通常是Error对象的实例，表示抛出的错误 */
    reject('error');
  }

});
//这里以异步加载图片为例
function loadImageAsync(url) {
  return new Promise(function (resolve, reject) {
    let image = new Image();

    image.onload = function () {
      resolve(image); //图片加载成功就执行成功回调，并将image实例作为成功数据传递给回调函数
    };
    image.onerror = function () {
      reject(new Error('Could not load image at ' + url)); //图片加载失败就执行失败回调，传递一个自定义错误对象过去，也可以将错误事件本身产生的错误对象传递过去
    };
    image.src = url;
  });
}

/**
 * then()
 * 通过Promise实例的then()方法定义实际的状态改变时的相应回调函数，其第一个参数为Resolved状态的回调函数，第二个参数为Rejected状态的回调函数(该参数可选)
 * then()方法是定义在原型对象Promise.prototype上的，且then方法返回的是一个新的Promise实例(注意不是原来那个Promise实例)，因此可以使用链式调用，在then方法后面再调用then方法
 * 链式调用多个then方法时，前面的回调函数执行完后，会将返回的结果作为参数传入下一个then方法中的回调函数，
 * 若前面的回调函数返回的还是一个Promise对象(即有异步操作)，那后一个then中的回调函数就会等待该Promise对象的状态发生变化后再被调用执行。
 * */
onePromise.then(function (value) {
  //resolve回调函数体

}, function (error) {
  //该第二个回调函数可选，reject回调函数体

}).then(function () {
  //链式调用then方法，前面的回调执行完了才会再执行这里的回调，且其接受前面回调的返回值作为参数
});

/**
 * catch()
 * 通过Promise实例的catch()方法可单独只指定Promise实例中发生错误时的回调函数，其也是定义在原型对象Promise.prototype上的
 * catch方法其实是then(null, rejection)的别名，即不指定成功回调，只指定错误回调，作用类似then方法指定一个回调函数时只表示成功回调，而catch用于指定错误回调
 * 因为其本就是then(null, rejection)的别名，所以除了表示捕获Promise中的错误(不是所有错误都能捕获到，见下一条说明)，其他方面都同then方法一样
 * 若Promise状态已变成Resolved后再抛出的错误是无效的[不管是主动throw的还是语法层面的出错]，此时不会被catch捕获到，但Resolved后的代码还是会执行到出现开始出现错误的位置(尽管此时的错误无法捕获也不会传递到外层)
 * Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止，也就是说Promise中的错误(包括最初的实例和前面所有then和catch返回的实例中的错误)总是会被下一个catch语句捕获
 * 因为Promise的链式调用是依次执行的，所以catch捕获的是在它之前出现的错误，在其之后定义的回调出现错误是不会被捕获到的，只能让更后面的catch去捕获，其并不像事件监听一次定义任何时候都能响应
 * 通常我们都不在then中指定第二个参数去定义Rejected状态的回调函数，而总是使用catch方法去捕获所有错误，且尽量将catch设置在后面
 * */
new Promise (function (resolve, reject) {
  resolve('ok');  //这里使得Promise状态变为Resolved
  console.log('resolve0');  //会执行，但其实际会比‘ok’先输出，因为这里是立即执行的，而resolve是这里的函数体内容执行完才执行的回调，除非这里也是异步操作才会比resolve晚执行
  console.log('resolve'+x); //语法错误，x未定义，但因是Resolved后抛出的错误所以不会被捕获也不会传递到外界，实际从这里开始下面的代码都不会再执行
  console.log('resolve2');  //不会执行，实际上状态变为Resolved后从出现错误的第一条语句开始之后的所有语句都不会再执行
  throw new Error('test error');  //主动抛出错误，与上一条一样因是Resolved后抛出的错误所以不会被捕获也不会传递到外界，throw的作用同return一样在同级作用域中只能作为程序结束语句
  //这里不能再放代码，因为与throw处于同一级作用域，throw之后的代码无意义，就像return之后的代码无意义一样

}).then(function (value) {
  //指定成功回调
  console.log(value);   //这里例子中将输出'ok'
  //若这里显式return一个数据，将会作为参数被传给下一个then方法中的函数，默认为undefined

}).catch(function (error) {
  //指定错误回调
  console.log(error);   //这里例子中将不会有输出，因为Resolved后的错误无法被捕获

}).then(function (value) {
  //这里的回调若出现错误是不会被前面的catch捕获的，只能在更后面去设置catch捕获
  console.log(value);   //这里例子中将输出 undefined，因为前面的方法未return数据过来
});

/**
 * Promise.all()
 * Promise.all()方法用于将多个Promise实例包装成一个新的Promise实例(理解成合并)
 * all()方法可接受一个数组作为参数，数组项都是Promise对象的实例，若不是，就会先调用Promise.resolve()方法将其转为Promise实例，再进一步处理
 * 须注意，Promise.all方法的参数不一定是数组，但必须是具有Iterator接口的数据类型，且返回的每个成员都要是Promise实例
 * 包装后的新Promise实例的状态由参数项中的所有Promise实例的状态共同决定，有一下两种情况：
 * 1、只有参数项中所有Promise实例的状态变为Resolved时，合并后的新实例状态才会变为Resolved，此时参数项中所有实例的返回值组成的数组将作为参数传递给合并后新实例的回调函数
 * 2、只要参数项内Promise实例中有一个的状态变为了Rejected，那合并后的新实例状态就会也变为Rejected，此时参数项中第一个变为Rejected的实例的返回值将作为参数传递给新实例的回调函数
 * */
//例如创建一个全是Promise实例的数组
let ps = [1,3,5,7].map(function (id) {
  return new Promise (function (resolve, reject) {
    axios.get('api/news/' + id);
    //more
  });
});
//将上面的Promise实例的数组通过Promise.all()方法合并为一个新的Promise实例
Promise.all(ps).then(function (data) {
  //指定成功回调，只有ps中的所有实例都成功时才代表这个新实例也成功了
  console.log(data);  //data是个数组，包含ps中每个实例返回的成功数据

}).catch(function (error) {
  //指定错误回调，只要ps中有一个实例出错就代表这个新实例也出错了
  console.log(error); //error是ps中最先出错的那个实例返回的错误信息

});

/**
 * Promise.race()
 * Promise.race()方法类似all方法同样是将多个Promise实例包装成一个新的Promise实例(理解成合并)，且其与all方法可接受的参数一样
 * race()方法与all方法的不同之处在于：
 * 用race()方法包装的的新实例只要其参数实例中有一个实例的状态改变了，那么新实例的状态就跟着改变了，那个最先改变状态的Promise实例的返回值就将作为参数传递给合并后的新实例的回调函数
 * 注意，这里说的是参数中只要有一个实例的状态改变了新实例的状态就跟着改变，不管状态是变为Resolved还是Rejected
 * */
//将上面的Promise实例的数组通过Promise.all()方法合并为一个新的Promise实例
Promise.race(ps).then(function (data) {
  //指定成功回调，只要ps中有一个实例成功了就代表这个新实例也成功了
  console.log(data);  //data是ps中最先成功那个实例返回的成功数据

}).catch(function (error) {
  //指定错误回调，只要ps中有一个实例出错就代表这个新实例也出错了
  console.log(error); //error是ps中最先出错的那个实例返回的错误信息

});

/**
 * Promise.resolve()
 * Promise.resolve()方法的作用是将传入的参数转换为一个Promise对象
 * 该方法的参数有以下4种情况：
 * 1、参数是一个Promise实例：此时Promise.resolve(onePromise)方法将不做任何修改，原封不动地返回这个实例
 * 2、参数是一个具有then方法的对象：此时Promise.resolve(obj)方法会将该对象转换为Promise对象返回，并立即执行原obj对象的then()方法
 * 3、参数是不具有then方法的对象或根本就不是对象：此时Promise.resolve(var)方法会返回一个新的Promise对象，且状态为Resolved，其参数也会直接传递给回调函数
 *    Promise.resolve('foo') 等价于 new Promise(resolve => resolve('foo'))，可看出是一个立即变为Resolved状态的Promise对象，且将参数直接传递给了resolve回调
 * 4、不带任何参数：此时Promise.resolve()方法会直接返回一个Resolved状态的Promise对象，其类似上面第3条，只是没传参的区别
 *    需要注意的是，立即resolve的Promise对象是在本轮‘事件循环’(event loop)的结束时，而不是下一轮‘事件循环’的开始时，即其是放在当前所有同步代码的最后执行
 * */
Promise.resolve(onePromise);  //直接返回onePromise对象
Promise.resolve({   //将该对象转换为一个Promise对象返回，并立即调用下面的原始对象的then方法
  then: function (resolve, reject) {
    resolve(7);
  }
}).then(function (value) {
  console.log(value); //输出7，因为调用了上面原始对象的then方法，而其then方法里执行了resolve回调，所以这里输出7
});
Promise.resolve('foo').then(function (value) {
  console.log(value); //在本轮事件循环最后输出foo
});
Promise.resolve().then(function () {
  console.log(7); //在本轮事件循环最后输出7
});

/**
 * Promise.reject()
 * Promise.reject()方法返回一个状态为Rejected的Promise实例，所以也会立即触发回调(本轮事件循环结束时)，Promise.reject('出错了') 等价于 new Promise((resolve, reject) => reject('出错了'))
 * 该方法的参数不像resolve方法分几种情况处理，其所有类型参数都只有一种处理方法：将参数原封不动地作为reject回调的reason参数传递给后面的回调函数
 * */
Promise.reject({   //返回一个状态为Rejected的Promise实例，这里带then方法的对象只会原封不动地传给后面的回调函数，而不是像resolve()那样处理先执行对象内的then方法
  then: function (resolve, reject) {
    resolve(7);
  }
}).catch(function (reason) {
  console.log(reason); //不会输出7，这里的reason是接受的上面reject()的完整参数，所以是输出上面整个参数对象
});

/*====================================================================================================================*/
/*================================== 有用的附加方法(用已有方法自定义封装的，不在ES6标准中) ==================================*/
/*====================================================================================================================*/

/**
 * done()
 * done()方法的主要目的是解决Promise对象链式调用中最后一个方法抛出的错误无法捕获的问题，使得即使最后一个catch方法中抛出的错误也能被捕获到并将其暴露到全局
 * */
//实现
Promise.prototype.done = function (resolvedCall, rejectedCall) {  //可以跟then方法一样传入成功和失败回调，也可以只传入成功回调或是不传参
  this.then(resolvedCall, rejectedCall).catch(function (reason) {   //这里的catch将始终能捕获到前面业务代码中可能出现的错误，并将其抛向全局（因为这里的catch中回调是一条不会出错的语句所以可以作为结尾）
    setTimeout(() => {throw reason}, 0);  //抛出一个全局错误，这里通过定时器将错误信息暴露到全局中去
  })
};
//使用
onePromise.then(f1).catch(f2).done();   //将done方法放在最后，也与then方法一样使用，也可以不传入参数，其都会捕获到任何一个错误并向全局抛出

/**
 * finally()
 * finally()方法用于指定不管Promise对象最后的状态变为成功还是失败都会执行的操作
 * */
//实现
Promise.prototype.finally = function (callback) {  //可以跟then方法一样传入成功和失败回调，也可以只传入成功回调或是不传参
  let P = this.constructor;
  return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => {throw reason})
  )
};
//使用
onePromise.then(f1).catch(f2).finally(f3);   //f3始终会在最后执行