// 代码生成时间: 2025-09-17 23:21:27
import { promises as fs } from 'fs';
import path from 'path';

// 定义文件夹结构类型
interface FolderStructure {
  name: string;
  children?: FolderStructure[];
}

// 实现整理器类
class FolderStructureOrganizer {
  private baseDir: string;

  constructor(baseDir: string) {
    this.baseDir = baseDir;
  }

  /**
   * 创建文件夹结构
   * @param structure 预期的文件夹结构
   * @returns 一个包含错误信息的Promise
   */
  async createStructure(structure: FolderStructure[]): Promise<string[]> {
    const errors: string[] = [];
    for (const folder of structure) {
      try {
        const fullPath = path.join(this.baseDir, folder.name);
        await fs.mkdir(fullPath, { recursive: true });
        if (folder.children) {
          const childErrors = await this.createStructure(folder.children);
          errors.push(...childErrors);
        }
      } catch (error) {
        errors.push(error instanceof Error ? error.message : String(error));
      }
    }
    return errors;
  }
}

// 使用示例
(async () => {
  const baseDir = './'; // 可以设置为任何有效的目录路径
  const organizer = new FolderStructureOrganizer(baseDir);

  // 定义期望的文件夹结构
  const structure: FolderStructure[] = [
    { name: 'docs', children: [{ name: 'subfolder' }] },
    { name: 'src', children: [{ name: 'main' }, { name: 'utils' }] },
    { name: 'tests' }
  ];

  // 创建文件夹结构
  const errors = await organizer.createStructure(structure);
  if (errors.length > 0) {
    console.error('Errors occurred:', errors);
  } else {
    console.log('Folder structure created successfully.');
  }
})();