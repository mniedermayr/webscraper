import puppeteer, { Browser, Page } from 'puppeteer';

export class Scraper {
    private browser!: Browser;
    private page!: Page;
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async init() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    public async gotToUrl() {
        await this.page.goto(this.url);
    }

    public async mimicGoogleCrawler(userAgent: string): Promise<void> {
        try {
            await this.page.setExtraHTTPHeaders({
                'User-Agent': userAgent
            });
            
            await this.page.setRequestInterception(true);
            this.page.on('request', (interceptedRequest) => {
                var data = {
                    'method': 'GET',
                    'headers': {
                        ...interceptedRequest.headers(),
                        'cookie': ''
                    }
                };
                interceptedRequest.continue(data);
            });
        } catch (error) {
            console.error(error);
        }
    }

    public async scrapeHeadlines(selector: string): Promise<string[]> {
        const headlines = await this.page.$$eval(selector, elements => elements.map(element => element.textContent));
        const words = headlines.flatMap(headline => headline!.split(' '));
        return words;
    }

    public async close() {
        await this.browser.close();
    }
}