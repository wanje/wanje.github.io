// !自定义vite插件用于额外处理

import fs from 'fs/promises';
import path from 'path';
import fastGlob from 'fast-glob';

export function vue2md() {
  return {
    name: 'copy-and-insert',
    apply: 'build',
    async writeBundle() {
      const files = await fastGlob('./src/**/*.vue', { ignore: ['**/node_modules'] });
      console.log('files:', files);
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
