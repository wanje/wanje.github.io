(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{471:function(t,s,n){"use strict";n.r(s);var a=n(18),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"nginx基础配置与操作"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#nginx基础配置与操作"}},[t._v("#")]),t._v(" Nginx基础配置与操作")]),t._v(" "),n("p"),n("div",{staticClass:"table-of-contents"},[n("ul",[n("li",[n("a",{attrs:{href:"#nginx常用命令"}},[t._v("nginx常用命令")])]),n("li",[n("a",{attrs:{href:"#nginx-conf-基础配置"}},[t._v("nginx.conf 基础配置")])])])]),n("p"),t._v(" "),n("p",[t._v("配置文件在"),n("code",[t._v("conf")]),t._v("目录下，执行指令为"),n("code",[t._v("sbin")]),t._v("目录下的"),n("code",[t._v("nginx")]),t._v("脚本文件。")]),t._v(" "),n("h2",{attrs:{id:"nginx常用命令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#nginx常用命令"}},[t._v("#")]),t._v(" nginx常用命令")]),t._v(" "),n("p",[t._v("进入"),n("code",[t._v("sbin")]),t._v("目录下进行如下操作指令，此时前面的"),n("code",[t._v("./nginx")]),t._v("就是"),n("code",[t._v("sbin")]),t._v("下的"),n("code",[t._v("nginx")]),t._v("脚本文件：")]),t._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[t._v("./nginx "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 启动nginx，默认conf/nginx.conf文件作为配置文件")]),t._v("\n\n./nginx -c conf_file "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 以配置文件conf_file的配置内容启动，conf_file为配置文件的绝对路径")]),t._v("\n\n./nginx -t "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 检测默认配置文件是否有语法错误")]),t._v("\n\n./nginx -t -c conf_file "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 检测配置文件conf_file是否有语法错误，conf_file为配置文件的绝对路径")]),t._v("\n\n./nginx -s reload "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 平滑的重启，在修改完配置后重新加载配置文件时非常有用")]),t._v("\n\n./nginx -s stop "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 直接关闭停止nginx")]),t._v("\n\n./nginx -s quit "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 有序退出停止，其会等所有请求结束后关闭nginx，比直接stop更平滑")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ps")]),t._v(" -ef"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" nginx "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看nginx的进程号，其中输出的master为主进程")]),t._v("\n")])])]),n("h2",{attrs:{id:"nginx-conf-基础配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#nginx-conf-基础配置"}},[t._v("#")]),t._v(" nginx.conf 基础配置")]),t._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_http_image_filter_module.so";')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_http_perl_module.so";')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_http_xslt_filter_module.so";')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_mail_module.so";')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_stream_module.so";')]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# user                         nobody staff;")]),t._v("\nworker_processes             "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nevents "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  worker_connections       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1024")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# http 协议的配置")]),t._v("\nhttp "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  include               mime.types"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 这里是引入了外部单独的 mime.types 文件的内容插入该位置（设置了types字段对应相关文件的mime类型）")]),t._v("\n  default_type          text/html"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 默认文件类型")]),t._v("\n  client_max_body_size  50m"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 客户端最大提交内容大小，主要影响文件上传")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("gzip")]),t._v("                  on"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 开启 gzip 静态资源压缩，下面 gzip_types 为要压缩的文件 mime 类型")]),t._v("\n  gzip_types            text/css text/x-component application/x-javascript application/javascript text/javascript text/x-js text/richtext image/svg+xml text/plain text/xsd text/xsl text/xml image/x-icon"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  sendfile              on"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 服务端口监听，可以设置多个监听不同端口")]),t._v("\n  server "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    listen               "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("8888")]),t._v(" default_server"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 监听端口，default_server 表示此端口设为默认端口")]),t._v("\n    server_name  "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("127.0")]),t._v(".0.1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 拦截的访问IP，也可设为 localhost")]),t._v("\n\n    root                 /Users/computerName/Desktop/demo"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 该端口指向的根目录位置")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 路由匹配，可设置多个")]),t._v("\n    location /path "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 这里注意'/path'既能匹配'/path/x'，也能匹配'/pathx'，而'/path/'只能匹配'/path/x'")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# proxy_set_header Host $host:9999; # 设置响应头部？")]),t._v("\n      proxy_pass https://finance.pae.baidu.com/"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将匹配路径代理到的实际路径，可以是在线地址，也可以是本地文件/服务地址，proxy_pass地址后面带上'/'则会减去location匹配的部分进行拼接，否则会直接拼接在后面")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 不设置则默认全量？若有设置部分不在里面的文件类型可能加载不出来")]),t._v("\n    location ~* "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("."),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("js"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("css"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("flash"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("media"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("jpg"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("png"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("gif"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("dll"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("svg"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("cab"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("CAB"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("ico"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("woff"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("woff2"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("ttf"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("json"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("mp4"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("mp3"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("zip")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("$ "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      root   /root_path"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      index  index.html index.htm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      expires  30d"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 失效时长？")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# vue/react history 路由模式配置示例")]),t._v("\n    location /busiMonitorSys "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      root /Users/computerName/Desktop/demo/dist"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      index    index.html index.htm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 当访问到一个目录时，默认将其指向其中的哪个实际文件（按顺序查找列举的可能文件）")]),t._v("\n      try_files "),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$uri")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$uri")]),t._v("/ /dist/index.html"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 关键配置，使得支持history模式")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 关键字 $uri 表示访问时匹配到的完整路径")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# try_files 这里表示若有找到 $uri 指向的文件则返回对应文件内容，否则返回 $uri/ 下上面 index 字段设置的可能文件，若还是未找到，则返回最后设置的文件内容")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 服务器将vue/react history路由按常规文件路由的方式查找一般是找不到对应文件的，所以匹配到try_files这里最后指定的文件")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 这里让其返回前端工程打包后的入口文件index.html的内容(实际路径根据自己的部署位置修改)，注意返回的是内容而不是重定向浏览器中的访问路径，故内容正确且路由无异常就可使得JS中的router按照history模式正确解析")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# HTTPS server")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);