// 代码生成时间: 2025-09-22 15:30:03
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

// 初始化PrismaClient
const prisma = new PrismaClient();

// 定义API路由
const apiRoutes = (app: any) => {
  // 定义获取所有物品的接口
  app.get('/api/items', async (req: Request, res: Response) => {
    try {
      const items = await prisma.item.findMany();
      res.status(200).json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // 定义获取单个物品的接口
  app.get('/api/items/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const item = await prisma.item.findUnique({ where: { id: Number(id) } });
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // 定义创建物品的接口
  app.post('/api/items', async (req: Request, res: Response) => {
    try {
      const newItem = await prisma.item.create({ data: req.body });
      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // 定义更新物品的接口
  app.put('/api/items/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedItem = await prisma.item.update({
        where: { id: Number(id) },
        data: req.body
      });
      if (!updatedItem) {
        res.status(404).json({ message: 'Item not found' });
        return;
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // 定义删除物品的接口
  app.delete('/api/items/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedItem = await prisma.item.delete({ where: { id: Number(id) } });
      if (!deletedItem) {
        res.status(404).json({ message: 'Item not found' });
        return;
      }
      res.status(200).json(deletedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

// 导出路由函数
export default apiRoutes;