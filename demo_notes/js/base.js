/**
 * 此文件用来定义requirejs模块与路径
 * 并自动加载data-main模块
 */
+ function(require) {

    // 获取reqiure所在的目录url及在base.js上的data-main
    var scripts = document.getElementsByTagName('script');
    var dataMain = '';
    for (var i = 0, l = scripts.length; i < l; i++) {
        var urlArr = scripts[i].src.split("/");
        if (urlArr.pop() == 'require.js') {
            require.path = urlArr.join("/") + '/';
        };
        if (scripts[i].getAttribute('data-main')) {
            dataMain = scripts[i].getAttribute('data-main');
            break;
        }
    };

    // 配置模块
    require.config({
        // 缓存模式，上线后请注释移除
        urlArgs: "debug=" + (new Date()).getTime(),
        //js自动加载根路径--可根据项目位置指定
        baseUrl: require.path + '../../pub-script/',
        paths: {
            'jquery': ['./lib/jquery'],
            'common': ['./lib/common'],
            'dateTime': ['../pub-ui/plugins/my97/WdatePicker'],
            'highCharts_base': ['../pub-ui/plugins/highcharts/highcharts'],
            'highCharts_3d': ['../pub-ui/plugins/highcharts/highcharts-3d'],
            'highCharts_funnel': ['../pub-ui/plugins/highcharts/funnel'],
            'dialog-plus': ['../pub-ui/plugins/artDialog/dialog-plus'],
            'easyPie': ['../pub-ui/plugins/easyPie/easy-pie'],
            'webuploader': ['../pub-ui/plugins/webuploader/webuploader.min'],
            'upload': ['../pub-ui/plugins/webuploader/ui-upload']
        },
        shim: {
            'dialog-plus': {
                deps: ['jquery'],
                exports: 'dialog'
            },
            'dateTime': {
                exports: 'WdatePicker'
            },
            'easyPie': {
                deps: ['jquery'],
                exports: '$'
            }
        }
    });

    // 自动加载data-main
    if (dataMain) {
        require([dataMain])
    }
}(requirejs);
