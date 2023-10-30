import { PuppeteerNodeLaunchOptions } from 'puppeteer';

const config: PuppeteerNodeLaunchOptions = {
  headless: false,
  defaultViewport: {
    width: 1920,
    height: 1080,
  },
  args: [
    '--window-size=1920,1080',
  ],
  devtools: true,
};

export default config;
