import puppeteer from "puppeteer-core";
const BRAVE = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
const browser = await puppeteer.launch({ executablePath: BRAVE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 });
await page.goto("http://localhost:3010/news", { waitUntil: "networkidle0" });
await page.evaluate(() => window.scrollTo(0, 360));
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: "/tmp/c_default.png" });
// hover the first card
const card = await page.$(".vis-news-card");
const box = await card.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await new Promise(r => setTimeout(r, 450));
await page.screenshot({ path: "/tmp/c_hover.png" });
// measure lift
const t = await page.evaluate(() => getComputedStyle(document.querySelector(".vis-news-card")).transform);
console.log("hover transform:", t);
await browser.close();
