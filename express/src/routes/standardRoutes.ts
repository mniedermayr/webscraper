import express, { Request, Response } from 'express';
import { Scraper } from '../Scraper.js';
import { WordProcessor } from '../WordProcessor/WordProcessor.js';

const router = express.Router();

router.get('/scrape', async (req: Request, res: Response) => {
    const scraper = new Scraper('https://www.derstandard.at/');
    await scraper.init();
    await scraper.mimicGoogleCrawler('Googlebot/2.1 (+http://www.google.com/bot.html)');
    await scraper.gotToUrl();
    const words = await scraper.scrapeHeadlines('.teaser-title');
    await scraper.close();
    
    const wordProcessor = new WordProcessor();
    const filteredWords = wordProcessor.filterWords(words);
    const wordCounts = wordProcessor.countWords(filteredWords);

    const responseBody = {
        filteredWords,
        wordCounts
    };

    res.json(responseBody);
});

export default router;
