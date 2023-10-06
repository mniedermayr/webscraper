import puppeteer from 'puppeteer';
export class Scraper {
    constructor(url) {
        this.url = url;
    }
    async init() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
        await this.page.goto(this.url);
    }
    async scrapeHeadlines(selector) {
        const headlines = await this.page.$$eval(selector, elements => elements.map(element => element.textContent));
        const words = headlines.flatMap(headline => headline.split(' '));
        return words;
    }
    async close() {
        await this.browser.close();
    }
}
//# sourceMappingURL=Scraper.js.map