import express, { Request, Response } from 'express';
import { Scraper } from '../Scraper.js';
import { WordProcessor } from '../WordProcessor/WordProcessor.js'

const router = express.Router();

router.get('/scrape', async (req: Request, res: Response) => {
    const scraper = new Scraper('https://www.krone.at/nachrichten');
    await scraper.init();
    await scraper.gotToUrl();
    const words = await scraper.scrapeHeadlines('div.a__title.krn_editable[data-ed-kind="title"]');
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
