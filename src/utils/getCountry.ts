import { Page } from 'puppeteer';

const url = 'https://ipinfo.io/';

type Country = 'RU' | 'KZ';

const getCountry = async (page: Page): Promise<Country> => {
  await page.goto(url);

  const domElement = await page.$x('//*[@id="tryit-data"]/ul');

  const country = await page.evaluate((el) => {
    const ul = el as HTMLElement;
    const li = ul.querySelector('#country-string')?.textContent;
    if (li) {
      const countryValue = li.split(':')[1].replace(/"|,/g, '');
      if (['RU', 'KZ'].includes(countryValue)) {
        return countryValue as Country
      }
    }
    throw new Error(`Invalid country: ${country}`);;
  }, domElement[0]);

  return country;
};

export default getCountry;
