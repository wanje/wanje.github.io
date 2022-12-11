// let http = require('http');
let fs = require('fs');
let path=require('path');

// let server = http.createServer(function (req, res) {
//   if (req.url==='/'){
//     fs.readFile('../音频和视频.html', function (err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
//       res.end(data);
//     });
//   }else if (req.url==='/images/stone-art.jpg'){
//     fs.readFile('../images/stone-art.jpg', function (err, data) {
//       res.writeHead(200, {'Content-Type': 'image/jpg'});
//       res.end(data);
//     });
//   }else if (req.url==='/assets/video/Summer_Night.mp4'){
//     fs.readFile('../assets/video/Summer_Night.mp4', function (err, data) {
//       res.writeHead(200, {'Content-Type': 'video/mp4'});
//       res.end(data);
//     });
//   }
// });
//
// server.listen(8080);


/**
 * 对象参数包含的配置项：
 * inputPath 文件输入路径
 * outputPath 文件输出路径
 * prePool 前缀字符池
 * lastPool 后缀字符池
 * stepClass class插入步长
 * stepTag 标签插入步长
 * */
function insertFlag({inputPath, outputPath=inputPath, preStrPool, lastStrPool, stepClass=4, stepTag=7}) {
  const preLen = preStrPool.length;
  const lastLen = lastStrPool.length;
  const reg_tag = /(<\w[\w-]*)([\s/>])/g;
  const reg_class = /(\s+class=["'][^"']*)(["'][^<]*>)/g;

  fs.readFile(inputPath, 'utf8', function (err, data) {
    if (err) throw err;
    let i = 0;
    let n = 0;
    let htmlTag = false;
    let bodyTag = false;
    let scriptTag = false;
    let tempTag = false;

    const result = data.replace(reg_class, function (...rest) {
      i++;
      if (i % stepClass === stepClass - 1) {
        return `${rest[1]} ${preStrPool[Math.floor(Math.random()*preLen)]}-${lastStrPool[Math.floor(Math.random()*lastLen)]}${rest[2]}`;
      } else {
        return rest[0];
      }

    }).replace(reg_tag, function (...rest) {
      n++;
      //要求script标签放在head中或body尾部
      if (rest[0].indexOf('html') >= 0) {
        htmlTag = true;
      } else if (rest[0].indexOf('body') >= 0) {
        bodyTag = true;
        scriptTag = false;
        n = 0;
      } else if (rest[0].indexOf('script') >= 0) {
        scriptTag = true;
      } else if (rest[0].indexOf('template') >= 0) {
        tempTag = true;
      }
      if ((htmlTag && !bodyTag) || (bodyTag && scriptTag) || (tempTag && scriptTag)) {
        return rest[0];
      } else {
        if (n % stepTag === stepTag - 1) {
          return `${rest[1]} data-${preStrPool[Math.floor(Math.random()*preLen)]}="${lastStrPool[Math.floor(Math.random()*lastLen)]}"${rest[2]}`;
        } else {
          return rest[0];
        }
      }
    });

    fs.writeFile(outputPath, result, 'utf8', function (err) {
      if (err) throw err;
      console.log('\n#####################  Writing finished!  #####################');
    });
  });
}

insertFlag({
  inputPath: './test.html',
  outputPath: './test_change.html',
  preStrPool: ['i', 'e', 'ue', 'ux', 'ued'],
  lastStrPool: ['cyr', 'support', 'ued', 'interface'],
  stepClass: 1,
  stepTag: 1
});