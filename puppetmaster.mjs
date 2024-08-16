import { graphics } from "systeminformation";
import { puppet } from "./puppet.mjs";

export async function puppetmaster(N, getPuppetConfig, puppetMission) {
  const g = await graphics();
  const gd = g.displays[0];
  const W = gd.currentResX;
  const H0 = gd.currentResY;
  const H = Math.floor(H0 * 0.98); // to reserve space for OSX's menu bar
  const pages = [];

  let windowsInX = 1;
  let sX = 1;
  let sY = 1;
  switch (N) {
    case 1:
      break;
    case 2:
      windowsInX = 2;
      sX = 0.5;
      break;
    case 3:
      windowsInX = 3;
      sX = 0.3333;
      break;
    case 4:
      windowsInX = 2;
      sX = 0.5;
      sY = 0.5;
      break;
    case 5:
      windowsInX = 3;
      sX = 0.3333;
      sY = 0.5;
      break;
    case 6:
      windowsInX = 3;
      sX = 0.3333;
      sY = 0.5;
      break;
    case 7:
      windowsInX = 4;
      sX = 0.25;
      sY = 0.5;
      break;
    case 8:
      windowsInX = 4;
      sX = 0.25;
      sY = 0.5;
      break;
    default:
      throw new Error(`Unsupported N!`);
  }

  for (let i = 0; i < N; ++i) {
    const xi = i % windowsInX;
    const yi = Math.floor(i / windowsInX);
    const w = Math.floor(sX * W);
    const h = Math.floor(sY * H); // to keep space to the menu bar on top on OSX

    const cfg = {
      dims: [w, h],
      pos: [
        w * xi,
        //yi === 0 ? H -  : h * yi,
        H0 - h - h * yi,
      ],
      devtools: false,
      headless: false,
      ...getPuppetConfig(i),
    };
    const page = await puppet(cfg);
    pages.push(page);
    puppetMission(page, i);
  }

  return pages;
}
