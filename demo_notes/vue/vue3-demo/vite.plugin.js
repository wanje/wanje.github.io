// !自定义vite插件用于额外处理

import fs from 'fs/promises';
import path from 'path';
import fastGlob from 'fast-glob'; // 用于文件路径匹配快速查找

export function vue2md() {
  return {
    name: 'vue2md',
    apply: 'build',
    async writeBundle() { // 使用该钩子的目的是等待脚手架清空了dist目录后再将相关vue文件转为md文件，避免自行处理历史文件的问题
      const files = await fastGlob('./src/**/*.vue', { ignore: ['**/node_modules'] });
      // console.log('files:', files);
      const targetDir = './dist/md';
      // if (fs.existsSync(targetDir)) await fs.rm(targetDir, { recursive: true });
      await fs.mkdir(targetDir, { recursive: true });
    
      for (const filePath of files) {
        const targetPath = path.join(targetDir, path.basename(filePath).replace(/vue$/, 'md'));
        console.log('targetPath:', targetPath);
    
        // 读取源文件内容
        let sourceContent = await fs.readFile(filePath, 'utf-8');
    
        // 向源文件内容中插入内容
        sourceContent = "```html\n" + sourceContent + "\n```";
    
        // 写入目标文件
        await fs.writeFile(targetPath, sourceContent, 'utf-8');
      }
    }
  };
}
