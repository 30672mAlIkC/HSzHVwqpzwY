// 代码生成时间: 2025-10-14 01:47:32
import { PrismaClient } from '@prisma/client';

// 定义一个 SocialEcommerceTool 类来封装数据库操作
class SocialEcommerceTool {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // 异步函数，用于初始化数据库连接
  async init() {
    try {
      await this.prisma.$connect();
      console.log('数据库连接成功');
    } catch (error) {
      console.error('数据库连接失败:', error);
      throw error;
    }
  }

  // 添加商品
  async addProduct(productId: string, name: string, price: number) {
    try {
      const product = await this.prisma.product.create({
        data: {
          productId,
          name,
          price,
        },
      });
      console.log('商品添加成功:', product);
      return product;
    } catch (error) {
      console.error('商品添加失败:', error);
      throw error;
    }
  }

  // 获取商品信息
  async getProduct(productId: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          productId,
        },
      });
      if (!product) {
        throw new Error('商品不存在');
      }
      console.log('商品信息:', product);
      return product;
    } catch (error) {
      console.error('获取商品信息失败:', error);
      throw error;
    }
  }

  // 更新商品信息
  async updateProduct(productId: string, newData: {
    name?: string;
    price?: number;
  }) {
    try {
      const product = await this.prisma.product.update({
        where: {
          productId,
        },
        data: newData,
      });
      console.log('商品更新成功:', product);
      return product;
    } catch (error) {
      console.error('商品更新失败:', error);
      throw error;
    }
  }

  // 删除商品
  async deleteProduct(productId: string) {
    try {
      const product = await this.prisma.product.delete({
        where: {
          productId,
        },
      });
      console.log('商品删除成功:', product);
      return product;
    } catch (error) {
      console.error('商品删除失败:', error);
      throw error;
    }
  }

  // 清理资源，关闭数据库连接
  async close() {
    await this.prisma.$disconnect();
    console.log('数据库连接已关闭');
  }
}

// 使用示例
const ecommerceTool = new SocialEcommerceTool();

async function main() {
  try {
    await ecommerceTool.init();
    const product = await ecommerceTool.addProduct('123', '测试商品', 100);
    console.log(product);
    const productInfo = await ecommerceTool.getProduct('123');
    console.log(productInfo);
    await ecommerceTool.updateProduct('123', {
      name: '更新后的商品名'
    });
    const updatedProduct = await ecommerceTool.getProduct('123');
    console.log(updatedProduct);
    await ecommerceTool.deleteProduct('123');
    const deletedProduct = await ecommerceTool.getProduct('123');
    console.log(deletedProduct);
    await ecommerceTool.close();
  } catch (error) {
    console.error('程序异常:', error);
  }
}

main();