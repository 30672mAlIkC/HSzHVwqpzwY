// 代码生成时间: 2025-09-18 11:37:28
import { PrismaClient } from '@prisma/client';

// Define a custom type for the error log
type ErrorLog = {
  id: number;
  timestamp: Date;
  message: string;
  stackTrace: string;
};

// Define the ErrorLogCollector class
class ErrorLogCollector {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Function to log an error
  public async logError(message: string, stackTrace: string): Promise<void> {
    try {
      const errorLog: ErrorLog = {
        id: Date.now(), // Use timestamp as a simple ID
        timestamp: new Date(),
        message,
        stackTrace,
      };
      await this.prisma.errorLog.create({
        data: errorLog,
      });
      console.log('Error logged successfully:', errorLog);
    } catch (error) {
      console.error('Failed to log error:', error);
    }
  }

  // Function to retrieve error logs
  public async getErrorLogs(): Promise<ErrorLog[]> {
    try {
      const logs = await this.prisma.errorLog.findMany();
      console.log('Retrieved error logs:', logs);
      return logs;
    } catch (error) {
      console.error('Failed to retrieve error logs:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  }

  // Function to delete all error logs (use with caution)
  public async clearErrorLogs(): Promise<void> {
    try {
      await this.prisma.errorLog.deleteMany();
      console.log('All error logs have been cleared.');
    } catch (error) {
      console.error('Failed to clear error logs:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}

// Usage example
const errorLogger = new ErrorLogCollector();
errorLogger.logError('Sample error message', 'Error stack trace here').catch(console.error);

// Export the class for usage in other modules
export default ErrorLogCollector;