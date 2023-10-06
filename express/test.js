import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  try {
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
    });
    
    await page.setRequestInterception(true);
    page.on('request', (interceptedRequest) => {
        var data = {
            'method': 'GET',
            'headers': {
                ...interceptedRequest.headers(),
                'cookie': ''
            }
        };
        interceptedRequest.continue(data);
    });
    
    await page.goto('https://www.derstandard.at/sport');
    // await browser.close();
  } catch (error) {
    console.log(error);
  }
  
})();

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.derstandard.at/rss');
//   const content = await page.content();
//   console.log(content);
//   await browser.close();
// })();


// import Parser from 'rss-parser';
// const parser = new Parser();

// (async () => {
//   const feed = await parser.parseURL('https://www.derstandard.at/rss');
//   console.log(feed.title);
//   feed.items.forEach(item => {
//     console.log(item.title + ':' + item.link);
//   });
// })();
