// 代码生成时间: 2025-10-05 21:12:45
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

// 初始化PRISMA客户端
const prisma = new PrismaClient();

class PasswordEncryptionDecryptionTool {

  /**
   * @description 加密密码
   * @param password 待加密的密码
   * @returns Promise<string> 加密后的密码
   */
  async encryptPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      return encryptedPassword;
    } catch (error) {
      console.error('加密密码失败:', error);
      throw error;
    }
  }

  /**
   * @description 解密密码
   * @param encryptedPassword 加密后的密码
   * @param password 待比较的密码
   * @returns Promise<boolean> 是否解密成功
   */
  async decryptPassword(encryptedPassword: string, password: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, encryptedPassword);
      return isMatch;
    } catch (error) {
      console.error('解密密码失败:', error);
      throw error;
    }
  }
}

// 示例用法
(async () => {
  const tool = new PasswordEncryptionDecryptionTool();

  // 加密密码
  const password = 'your_password';
  const encryptedPassword = await tool.encryptPassword(password);
  console.log('加密后的密码:', encryptedPassword);

  // 解密密码
  const isMatch = await tool.decryptPassword(encryptedPassword, password);
  console.log('密码匹配:', isMatch);
})();