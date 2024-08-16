import puppeteer from "puppeteer";

export async function puppet({ dims, pos, url, devtools, headless, sessionDir }) {
  const [W, H] = dims;
  const [X, Y] = pos;
  const origin = new URL(url).origin;

  const browser = await puppeteer.launch({
    headless,
    devtools,
    /*defaultViewport: {
      width: W,
      height: H,
    },*/
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-webgl", // NOT WORKING AS EXPECTED (not same as about:settings. search accel, disable, relaunch)
      "--hide-scrollbars",
      "--hide-crash-restore-bubble",
      `--user-data-dir=${sessionDir}`,
      `--window-position=${X},${Y}`,
      `--window-size=${W},${H}`,
      //`--high-dpi-support=1`,
      //`--force-device-scale-factor=2`,
    ],
  });

  const context = browser.defaultBrowserContext();
  context.overridePermissions(origin, ["geolocation", "notifications"]);
  const [page] = await context.pages();
  await page.setViewport({
    width: W,
    height: Math.floor(0.88 * H),
  });
  await page.setViewport(null); // so the viewport changes on resize
  await page.goto(url);
  return page;
}
