/**
 * Created by wangjie_ac on 2016/12/9.
 * Update: 2016/12/9.
 */
// gulp中文API参考：https://www.gulpjs.com.cn/docs/api/
// 以 https://www.cnblogs.com/kmweb/p/6497531.html 中实例为例
// 安装gulp(-g为全局安装)：npm install gulp -g
// 安装需要的gulp插件
// gulp-connect : 创建一个webserver 方便实时预览
// gulp-autoprefixer：css自动添加前缀，以适应多浏览器
// gulp-cache：gulp的文件缓存服务，尤其是任务处理过程中的中间文件特别有效
// gulp-filter：文件匹配神器
// gulp-imagemin：图片压缩神器
// gulp-jshint：js语法检测
// gulp-load-plugins：gulp插件(默认以gulp-开头的，可通过配置项自定义匹配更多)自动加载神器，可以自动加载package.json中依赖(默认项目依赖，可配置开发依赖等)的gulp插件，https://www.npmjs.com/package/gulp-load-plugins#options
// gulp-plumber：修复了pipe处理异常的bug，让任务执行更平滑
// gulp-clean-css：压缩css的神器，替换旧版的gulp-minify-css
// gulp-minify-html：压缩html文件
// gulp-rev：校订命名神器，将文件名附加文件内容hash后的重新命名，对于发布新版本静态资源的时候有效解决浏览器缓存问题
// gulp-rev-replace：重写被rev命名后的文件索引，尤其是你使用了manifest离线缓存后这个非常有效
// gulp-uglify：js压缩神器
// gulp-useref：处理html中js或css占位符替换成真正的资源索引
// gulp-util：这是gulp执行的界面工具，方便你输出执行过程中的信息(log)
// gulp-watch：监听文件变化，并执行默认更新任务
// gulp-sass：sass文件编译
// gulp-postcss：postcss文件编译
// wiredep：bower插件的依赖插入神器
// lazypipe：pipe可复用的强大神器
// open：主动打开某个网址，在编译预览时，方便！
// jshint-stylish：js语法检测的格式化输出
// rimraf：文件以及文件夹的操作

// 假设我们当前的目录结构是：
// --app            //项目源代码文件夹，我们所有gulp任务都是针对该文件夹处理的
// --package.json
// --gulpfile.js

//============================定义加载的插件，加载gulp，以及gulp的插件（以gulp-开头所有的插件），和其他相关插件
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();   //加载并执行gulp-load-plugins返回的方法后，package.json中依赖的gulp-开头的gulp插件的返回值将自动绑定到这里返回的对象上
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');

//=============================定义全局路径
var workflow = {
  app: 'app',   //用app或src等属性指向我们源文件夹
  dist: 'dist'  //dist是我们要打包输出的文件夹（没有会自动创建）
};

//定义css，js路径以及视图文件等路径（根据自己的项目结构定义）
var paths = {
  scripts: [workflow.app + '/scripts/**/*.js'], //匹配指定位置的js脚本文件，数组表示包含多个文件
  styles: [workflow.app + '/styles/**/*.scss'], //匹配指定位置的样式文件（这里使用scss编写样式）
  views: {
    main: workflow.app + '/index.html',     //主页，字符串表示只有这一个指定文件
    files: [workflow.app + '/views/**/*.html']  //其他视图页
  }
};

//==========================定义可复用的pipe
//lintScripts预设了js语法检测的参数设置，以及语法检测日志的输出使用jshint-stylish
//styles预设了css样式处理的过程，使用sass编译，使用autoprefixer自动添加前缀，并指定了输出的文件夹
var lintScripts = lazypipe()
      .pipe($.jshint, '.jshintrc')
      .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
      .pipe($.sass, {
        outputStyle: 'expanded',
        precision: 10
      })
    .pipe($.autoprefixer, 'last 1 version')
    .pipe(gulp.dest, '.tmp/styles');

/**
 * gulp.task(name[, deps, fn])，创建任务
 * @name    任务名
 * @deps    依赖的任务，可选，数组结构，执行当前任务时会将依赖任务执行完才执行当前任务，默认为同步型任务
 * @fn      具体任务内容，函数，fn也接受一个回调，若该任务为异步操作，任务完成后就会调用该回调以表明任务完成，也可以通过返回stream(pipe输出流)或Promise对象来处理异步操作
 * 执行创建的任务：gulp taskName
 * */
//默认执行的任务
gulp.task('default', function () {
  // 默认任务代码
  console.log('gulp works!');
});

//styles任务将我们的样式文件按照上述预制的styles执行
gulp.task('styles', function () {
  /**
   * gulp.src( globs[, options] )，指定待处理资源文件路径
   * @globs     需要处理的源文件的匹配路径，可用的通配符路径匹配间见下面的示例
   * @options   配置对象(可选)，包含3个属性设置：buffer、read、base
   *      {
   *        buffer: 默认为true，设为false将返回file.content的流并且不缓冲文件，处理大文件时非常有用；
   *        read:   默认为true，设为false将不执行读取文件操作，返回null；
   *        base:   设置最后的dest输出路径的基础路径分割点，此时上面globs中的路径将以这里base路径为分割，将分隔后的后半部分拼接在gulp.dest中的输出路径后作为处理文件的最终输出位置，
   *                默认的分割点为globs中前面的确切路径部分（不包含通配符的部分）
   *      }
   * */

  /** 可用的通配符路径匹配示例 */
  // "src/a.js"：指定具体文件；
  // "*"：       匹配所有文件，例：src/*.js(包含src下的所有js文件)；
  // "**"：      匹配0个或多个子文件夹，例: src/**/*.js(包含src的0个或多个子文件夹下的js文件)
  // "{}"：      匹配多个属性，例: src/{a,b}.js(包含a.js和b.js文件)；src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)
  // "!"：       排除文件，例：!src/a.js(不包含src下的a.js文件)；
  /**
   * gulp的 .pipe() 方法是一种管道化处理思想，前一级的处理结果将直接作为下一级的数据输入源，类似jQuery的链式调用
   * pipe的参数可以第一个指明处理方法，第二个给前面方法传递参数，也可以直接在其中按照方法的常用执行传参方式写
   * */
  return gulp.src('src/styles/**/*.scss')   //这里base将默认从"src/styles"分割，将后半部分拼接到dest中的路径后作为文件输出路径
      .pipe($.sass, {
        outputStyle: 'expanded',
        precision: 10
      })
      .pipe($.autoprefixer, 'last 1 version')
      .pipe(gulp.dest('build/styles'));    //上面的相关scss文件编译后将对应到：'build//styles/**/*.css'
  /**
   * gulp.dest( path[, options] )，指定相关处理完成后文件的输出位置路径
   * @path      文件的输出路径字符串，或一个返回文件输出路径的函数
   * @options   配置对象(可选)，包含2个属性设置：cwd、mode
   *      {
   *        cwd:   默认：process.cwd()[当前脚本的工作目录路径]，当文件输出路径为相对路径时有效
   *        mode:  默认：0777 指定被创建文件夹的权限；
   *      }
   * */
});

//lint:scripts任务负责检测我们的js语法的合法性
gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
      .pipe(lintScripts());
});

//clean:tmp任务负责清理.tmp文件夹，注意这里有了一个cb回调，意味着其他任务需要等待该任务执行完成后才能执行（异步操作方式1）
gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

//启动客户端，调用启动服务器，格式化样式，并在浏览器中打开指定网址，该任务依赖另外两个任务，执行前会先执行依赖任务
gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('http://localhost:9000');
});

//启动服务器，使用connect创建一个webserver
gulp.task('start:server', function () {
  $.connect.server({
    root: [yeoman.app, '.tmp'],
    livereload: true,
    hostname: 'localhost',
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000
  });
});

//添加监听任务，并执行相关的任务
gulp.task('watch', function () {
  /**
   * gulp.watch( glob [, opts], tasks ) 或 gulp.watch( glob [, opts, cb] )，监听文件变化，并作出相应响应，它总会返回一个EventEmitter来发射(emit) change 事件，可用on方法监听
   * @glob    监听文件的匹配路径
   * @opts    配置对象(可选)，具体参看https://github.com/shama/gaze；
   * @tasks   执行的任务队列数组
   * @cb      每个文件变化执行的回调函数(可选)，cb(event)，默认会传入一个事件对象，该event对象包含两个属性：
   *          event.type：发生的变动的类型：added, changed 或者 deleted
   *          event.path：触发了该事件的文件的路径
   * */
  $.watch(paths.styles)
      .pipe($.plumber())
      .pipe(styles())
      .pipe($.connect.reload());

  $.watch(paths.views.files)
      .pipe($.plumber())
      .pipe($.connect.reload());

  $.watch(paths.scripts)
      .pipe($.plumber())
      .pipe(lintScripts())
      .pipe($.connect.reload());

  $.watch(paths.test)
      .pipe($.plumber())
      .pipe(lintScripts());

  var watcher = gulp.watch('bower.json', ['bower']);

  //通过on可以监听change事件
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

//编译启动服务器，注册了一个按序执行的任务列表，清除.tmp, 检测js语法，启动客户端（启动webserver，编译样式css）,添加监听任务
gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
      ['lint:scripts'],
      ['start:client'],
      'watch', cb);
});

//bower任务负责将bower依赖注入
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
      .pipe(wiredep({
        directory: workflow.app + '/bower_components',
        ignorePath: '..'
      }))
      .pipe(gulp.dest(workflow.app));
});