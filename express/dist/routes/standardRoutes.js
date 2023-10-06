import express from 'express';
import { Scraper } from '../Scraper.js';
import { WordProcessor } from '../WordProcessor/WordProcessor.js';
const router = express.Router();
router.get('/scrape', async (req, res) => {
    const scraper = new Scraper('https://www.derstandard.at/');
    await scraper.init();
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
//# sourceMappingURL=standardRoutes.js.map