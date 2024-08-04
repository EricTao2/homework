import {describe, it, expect, beforeAll} from 'vitest';
import {highlightEmTags, getFileExtension, findFileType} from '../src/utils/selectHelper'; // 替换为你的实际路径
import {fileTypeMapping} from '../src/assets/fileTypeData'; // 替换为你的实际路径
// 模拟 fileTypeMapping 数据
const mockFileTypeMapping = new Map<string, string[]>([
  ['imag', ['jpeg', 'jpg', 'png', 'gif']],
  ['document', ['pdf', 'doc', 'docx', 'txt']],
  ['archive', ['zip', 'tar', 'gz', 'rar']]
]);
describe('highlightEmTags', () => {
  it('should highlight text within <em> tags', () => {
    const input = 'This is a <em>test</em> string.';
    const output = 'This is a <em style="background-color: yellow;">test</em> string.';
    expect(highlightEmTags(input)).toBe(output);
  });

  it('should return the same string if no <em> tags are present', () => {
    const input = 'This is a test string.';
    expect(highlightEmTags(input)).toBe(input);
  });

  it('should handle multiple <em> tags', () => {
    const input = 'This <em>is</em> a <em>test</em> string.';
    const output =
      'This <em style="background-color: yellow;">is</em> a <em style="background-color: yellow;">test</em> string.';
    expect(highlightEmTags(input)).toBe(output);
  });
});

describe('getFileExtension', () => {
  it('should return the correct file extension', () => {
    expect(getFileExtension('document.pdf')).toBe('pdf');
    expect(getFileExtension('archive.tar.gz')).toBe('gz');
    expect(getFileExtension('photo.jpeg')).toBe('jpeg');
  });

  it('should return "default" if no extension is found', () => {
    expect(getFileExtension('filename')).toBe('default');
    expect(getFileExtension('noextension.')).toBe('default');
  });
});

describe('findFileType', () => {
  beforeAll(() => {
    // 设置 fileTypeMapping 用于测试
    mockFileTypeMapping.forEach((value, key) => {
      fileTypeMapping.set(key, value);
    });
  });

  it('should return the correct file type based on extension', () => {
    expect(findFileType('jpeg')).toBe('img');
    expect(findFileType('pdf')).toBe('pdf');
    expect(findFileType('zip')).toBe('zip');
  });

  it('should return "default" if extension is not found', () => {
    expect(findFileType('unknown')).toBe('default');
    expect(findFileType('')).toBe('default');
  });
});
