/**
 * 类似webpack中的require方法加载图片资源
 *
 * @export
 * @param {string} relativePath 图片相对路径
 * @param {string} [basePath='@/assets/images/'] 相对的基础路径
 * @returns {string} 图片实际路径
 */
export function getImgPath(relativePath, basePath = '@/assets/images/') {
  return new URL(basePath + relativePath, import.meta.url).href
}
