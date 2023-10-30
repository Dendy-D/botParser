import {
  Browser,
  Page,
} from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import interactWithPariMatchKZ from './pages/pariMatchKZ';
import interactWithPariRU from './pages/pariRU';
import getCountry from './utils/getCountry';
import config from './constants/config';

puppeteer.use(StealthPlugin());

(async () => {
  const browser: Browser = await puppeteer.launch(config);

  const page: Page = await browser.newPage();

  const pages = await browser.pages();
  if (pages.length) {
    await pages[0].close();
  }

  const country = await getCountry(page);

  switch (country) {
    case 'RU': await interactWithPariRU(page);
      break;
    case 'KZ': await interactWithPariMatchKZ(page);
      break;
    default:
      throw new Error('Only Russia and Kazakhstan are included in the list of supported countries');
  }
})();


