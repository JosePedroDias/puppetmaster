import shell from "shelljs";
import { puppetmaster } from "./puppetmaster.mjs";
import { sleep } from "./misc.mjs";

// how each browser is to be set up
function getPuppetConfig(i) {
  return {
    sessionDir: `/tmp/puppet_${i}`,
    devtools: false, //i === 0,
    url: "http://localhost:5173/?bot=1", // http://localhost:7351/
  };
}

// what each browser should do once ready
async function puppetMission(page, i) {
  //await page.evaluate(() => (document.body.style.zoom = 0.5));
  await sleep(3000);
  page.click("button");
  //await sleep(10000);
  //page.browser().close();
}

async function main() {
  // uncomment this when you want the browsers to start afresh
  // wipes out any previously created browser profiles
  //await shell.rm("-rf", "/tmp/puppet_*");

  const pages = await puppetmaster(3, getPuppetConfig, puppetMission);
  // we can affect each browsers' page from here too if necessary
  //console.log("pages", pages);
}
main();
