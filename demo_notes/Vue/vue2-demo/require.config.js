/**
 * 此文件用来定义requirejs模块与路径
 * 并自动加载data-main模块
 */
;!function (require) {

    // 获取require.config.js上的data-main及其所在的目录url
    var scripts = document.getElementsByTagName('script');
    var dataMain = '';
    for (var i = scripts.length-1; i > -1; i--) {
        dataMain = scripts[i].getAttribute('data-main');
        if(!dataMain) continue;
        var urlArr = scripts[i].src.split("/");
        urlArr.pop();
        require.path = urlArr.length ? urlArr.join("/") + '/' : './';
        break;
    }

    require.config({
        /*缓存模式，上线后请注释移除*/
        // urlArgs: "debug=" + (new Date()).getTime(),
        /*根路径配置*/
        baseUrl: require.path,      /*此处将require.config.js所在文件夹设为根路径(未以默认的require.js所在文件夹为准)，也可自行手动设置*/
        /*文件路径配置*/
        paths: {
            // 'uri': '/临时demo/crm/hlj-OrderApp/uri',
            'jquery': '../../js/jquery-1.11.3.min'
        }
    });

    /*自动加载data-main中的js文件*/
    if (dataMain) {
        require([dataMain]);
    }

}(requirejs);