(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{469:function(t,n,s){"use strict";s.r(n);var a=s(18),e=Object(a.a)({},(function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"nginx基础配置与操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx基础配置与操作"}},[t._v("#")]),t._v(" Nginx基础配置与操作")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#nginx常用命令"}},[t._v("nginx常用命令")])]),s("li",[s("a",{attrs:{href:"#nginx-conf-基础配置"}},[t._v("nginx.conf 基础配置")])]),s("li",[s("a",{attrs:{href:"#参考学习资料"}},[t._v("参考学习资料")])])])]),s("p"),t._v(" "),s("p",[t._v("配置文件在"),s("code",[t._v("conf")]),t._v("目录下，执行指令为"),s("code",[t._v("sbin")]),t._v("目录下的"),s("code",[t._v("nginx")]),t._v("脚本文件。")]),t._v(" "),s("h2",{attrs:{id:"nginx常用命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx常用命令"}},[t._v("#")]),t._v(" nginx常用命令")]),t._v(" "),s("p",[t._v("进入"),s("code",[t._v("sbin")]),t._v("目录下进行如下操作指令，此时前面的"),s("code",[t._v("./nginx")]),t._v("就是"),s("code",[t._v("sbin")]),t._v("下的"),s("code",[t._v("nginx")]),t._v("脚本文件：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("./nginx "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 启动nginx，默认conf/nginx.conf文件作为配置文件")]),t._v("\n\n./nginx -c conf_file "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 以配置文件conf_file的配置内容启动，conf_file为配置文件的绝对路径")]),t._v("\n\n./nginx -t "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 检测默认配置文件是否有语法错误")]),t._v("\n\n./nginx -t -c conf_file "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 检测配置文件conf_file是否有语法错误，conf_file为配置文件的绝对路径")]),t._v("\n\n./nginx -s reload "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 平滑的重启，在修改完配置后重新加载配置文件时非常有用")]),t._v("\n\n./nginx -s stop "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 直接关闭停止nginx")]),t._v("\n\n./nginx -s quit "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 有序退出停止，其会等所有请求结束后关闭nginx，比直接stop更平滑")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ps")]),t._v(" -ef"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" nginx "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看nginx的进程号，其中输出的master为主进程")]),t._v("\n")])])]),s("h2",{attrs:{id:"nginx-conf-基础配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx-conf-基础配置"}},[t._v("#")]),t._v(" nginx.conf 基础配置")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_http_image_filter_module.so";')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_http_perl_module.so";')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_http_xslt_filter_module.so";')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_mail_module.so";')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('#load_module "modules/ngx_stream_module.so";')]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# user                         nobody staff;")]),t._v("\nworker_processes             "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nevents "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  worker_connections       "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1024")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# http 协议的配置")]),t._v("\nhttp "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  include               mime.types"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 这里是引入了外部单独的 mime.types 文件的内容插入该位置（设置了types字段对应相关文件的mime类型）")]),t._v("\n  default_type          text/html"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 默认文件类型")]),t._v("\n  client_max_body_size  50m"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 客户端最大提交内容大小，主要影响文件上传")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("gzip")]),t._v("                  on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 开启 gzip 静态资源压缩，下面 gzip_types 为要压缩的文件 mime 类型")]),t._v("\n  gzip_types            text/css text/x-component application/x-javascript application/javascript text/javascript text/x-js text/richtext image/svg+xml text/plain text/xsd text/xsl text/xml image/x-icon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  sendfile              on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 服务端口监听，可以设置多个监听不同端口")]),t._v("\n  server "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    listen               "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8888")]),t._v(" default_server"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 监听端口，default_server 表示此端口设为默认端口")]),t._v("\n    server_name  "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("127.0")]),t._v(".0.1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 拦截的访问IP，也可设为 localhost")]),t._v("\n\n    root                 /Users/computerName/Desktop/demo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 该端口指向的根目录位置")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 路由匹配，可设置多个")]),t._v("\n    location /path "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 这里注意'/path'既能匹配'/path/x'，也能匹配'/pathx'，而'/path/'只能匹配'/path/x'")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# proxy_set_header Host $host:9999; # 设置响应头部？")]),t._v("\n      proxy_pass https://finance.pae.baidu.com/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将匹配路径代理到的实际路径，可以是在线地址，也可以是本地文件/服务地址，proxy_pass地址后面带上'/'则会减去location匹配的部分进行拼接，否则会直接拼接在后面")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 不设置则默认全量？若有设置部分不在里面的文件类型可能加载不出来")]),t._v("\n    location ~* "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("."),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("js"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("css"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("flash"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("media"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("jpg"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("png"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("gif"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("dll"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("svg"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("cab"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("CAB"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("ico"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("woff"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("woff2"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("ttf"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("json"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("mp4"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("mp3"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("zip")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("$ "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      root   /root_path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      index  index.html index.htm"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      expires  30d"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 失效时长？")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# vue/react history 路由模式配置示例")]),t._v("\n    location /busiMonitorSys "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      root /Users/computerName/Desktop/demo/dist"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      index    index.html index.htm"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 当访问到一个目录时，默认将其指向其中的哪个实际文件（按顺序查找列举的可能文件）")]),t._v("\n      try_files "),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$uri")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$uri")]),t._v("/ /dist/index.html"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 关键配置，使得支持history模式")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 关键字 $uri 表示访问时匹配到的完整路径")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# try_files 这里表示若有找到 $uri 指向的文件则返回对应文件内容，否则返回 $uri/ 下上面 index 字段设置的可能文件，若还是未找到，则返回最后设置的文件内容")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 服务器将vue/react history路由按常规文件路由的方式查找一般是找不到对应文件的，所以匹配到try_files这里最后指定的文件")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 这里让其返回前端工程打包后的入口文件index.html的内容(实际路径根据自己的部署位置修改)，注意返回的是内容而不是重定向浏览器中的访问路径，故内容正确且路由无异常就可使得JS中的router按照history模式正确解析")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# HTTPS server")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"参考学习资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考学习资料"}},[t._v("#")]),t._v(" 参考学习资料")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://mp.weixin.qq.com/s/tC5EF-vhiBrjXlTQLuXRhw",target:"_blank",rel:"noopener noreferrer"}},[t._v("三年前端还不会配置Nginx，今天一口气学完"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://mp.weixin.qq.com/s/81gLHxXK0P-si2WCzgQKOg",target:"_blank",rel:"noopener noreferrer"}},[t._v("Nginx 常用的基础配置（高级前端须知）"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://mp.weixin.qq.com/s/BA_JZ_kMBFZBE7jjQDNc1Q",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端开发者必备的 Nginx 知识"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://juejin.cn/post/6844903701459501070",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端必会的 Nginx入门视频教程(共11集)-技术胖"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN",target:"_blank",rel:"noopener noreferrer"}},[t._v("NGINXConfig-nginx在线配置工具"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);n.default=e.exports}}]);