// 代码生成时间: 2025-09-19 23:20:47
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import cheerio from 'cheerio';

// Define a class for the web content scraper
class WebContentScraper {
  private prisma: PrismaClient;
  private baseUri: string;

  constructor(baseUri: string) {
    this.prisma = new PrismaClient();
    this.baseUri = baseUri;
  }

  /**
   * Fetches content from a specific webpage.
   * @param url The URL of the webpage to scrape.
   * @returns The scraped content or an error message.
   */
  async fetchWebContent(url: string): Promise<string | Error> {
    try {
      // Use axios to fetch the webpage
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error(`Failed to fetch webpage. Status code: ${response.status}`);
      }

      // Use cheerio to parse the HTML content
      const $ = cheerio.load(response.data);
      const content = $('body').html();

      // Save the content to the database using Prisma
      await this.prisma.content.create({
        data: {
          url: url,
          htmlContent: content
        }
      });

      return content;
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error fetching web content:', error);
      return error;
    }
  }
}

// Example usage of the WebContentScraper
async function main() {
  const scraper = new WebContentScraper('https://example.com');
  const urlToScrape = 'https://example.com/page1';
  const content = await scraper.fetchWebContent(urlToScrape);
  if (content instanceof Error) {
    console.error(content.message);
  } else {
    console.log('Scraped content:', content);
  }
}

main();