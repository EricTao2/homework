import {fileTypeMapping} from '../assets/fileTypeData';

export function highlightEmTags(inputString: string) {
  // 使用正则表达式找到所有 <em> 标签，并添加内联样式
  return inputString.replace(/<em>(.*?)<\/em>/g, '<em style="background-color: yellow;">$1</em>');
}

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : 'default';
}

export function findFileType(extension: string): string {
  for (const [key, extensions] of fileTypeMapping) {
    if ((extensions as string[]).includes(extension)) {
      return key;
    }
  }
  return 'default';
}
