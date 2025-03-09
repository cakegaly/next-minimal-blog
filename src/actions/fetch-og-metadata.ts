'use server';

import { cache } from 'react';

interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const getOGData = cache(
  async (url: string): Promise<Partial<OGData>> => {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'bot',
        },
      });

      const html = await response.text();

      const getMetaContent = (property: string): string | undefined => {
        const regex = new RegExp(
          `<meta[^>]+(?:property|name)="${property}"[^>]+content="([^"]+)"`,
          'i'
        );
        return regex.exec(html)?.[1];
      };

      const titleMatch = /<title>(.*?)<\/title>/i.exec(html);

      return {
        title: getMetaContent('og:title') || titleMatch?.[1] || '',
        description:
          getMetaContent('og:description') ||
          getMetaContent('description') ||
          '',
        image: getMetaContent('og:image') || '',
        url,
      };
    } catch (error) {
      console.error('Error fetching OG data:', error);
      return { url };
    }
  }
);
