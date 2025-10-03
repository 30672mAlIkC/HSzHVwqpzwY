// 代码生成时间: 2025-10-04 03:02:22
import { PrismaClient } from '@prisma/client';

// Define the interface for the learning resource
interface ILearningResource {
  id: number;
  title: string;
  description: string;
  // Additional fields can be added as needed
}

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

class LearningResourcesService {
  // Adds a new learning resource to the database
  async addLearningResource(resource: ILearningResource): Promise<ILearningResource> {
    try {
      const newResource = await prisma.learningResource.create({
        data: resource
      });
      return newResource;
    } catch (error) {
      console.error('Error adding learning resource:', error);
      throw error;
    }
  }

  // Retrieves all learning resources from the database
  async getAllLearningResources(): Promise<ILearningResource[]> {
    try {
      const resources = await prisma.learningResource.findMany();
      return resources;
    } catch (error) {
      console.error('Error retrieving learning resources:', error);
      throw error;
    }
  }

  // Retrieves a single learning resource by ID
  async getLearningResourceById(id: number): Promise<ILearningResource | null> {
    try {
      const resource = await prisma.learningResource.findUnique({
        where: { id }
      });
      return resource;
    } catch (error) {
      console.error('Error retrieving learning resource by ID:', error);
      throw error;
    }
  }

  // Updates a learning resource with new information
  async updateLearningResource(id: number, updates: Partial<ILearningResource>): Promise<ILearningResource> {
    try {
      const updatedResource = await prisma.learningResource.update({
        where: { id },
        data: updates
      });
      return updatedResource;
    } catch (error) {
      console.error('Error updating learning resource:', error);
      throw error;
    }
  }

  // Deletes a learning resource from the database
  async deleteLearningResource(id: number): Promise<ILearningResource> {
    try {
      const deletedResource = await prisma.learningResource.delete({
        where: { id }
      });
      return deletedResource;
    } catch (error) {
      console.error('Error deleting learning resource:', error);
      throw error;
    }
  }
}

export { LearningResourcesService, ILearningResource };
