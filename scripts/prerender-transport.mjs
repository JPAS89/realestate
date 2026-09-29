import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { preview } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const launchBrowser = async () => {
  const channels = ["chrome", "msedge", "chromium"];
  let lastError;

  for (const channel of channels) {
    try {
      return await chromium.launch({
        channel,
        headless: true,
      });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Could not launch Chrome, Edge, or Chromium.");
};

const server = await preview({
  root,
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
});

try {
  const previewOrigin = server.resolvedUrls?.local[0]?.replace(/\/$/, "");
  if (!previewOrigin) {
    throw new Error("Vite preview did not expose a local URL.");
  }

  const browser = await launchBrowser();
  const page = await browser.newPage();

  await page.route("**/*.{mp4,webm,ogg}", (route) => route.abort());
  await page.goto(`${previewOrigin}/transport`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForSelector("h1", { timeout: 30000 });
  await page.waitForFunction(() => {
    const title = document.title;
    const hasTransportLd = document.body?.innerHTML.includes("TaxiService");
    const canonical = document.querySelector('link[rel="canonical"]');
    return (
      title.includes("Private Transfers") &&
      hasTransportLd &&
      canonical?.getAttribute("href")?.includes("/transport")
    );
  });

  await page.evaluate(() => {
    document
      .querySelectorAll('link[rel="canonical"]:not([data-rh])')
      .forEach((el) => el.remove());
    document
      .querySelectorAll('meta[name="description"]:not([data-rh])')
      .forEach((el) => el.remove());
    document
      .querySelectorAll('meta[property^="og:"]:not([data-rh])')
      .forEach((el) => el.remove());
    document
      .querySelectorAll('meta[name^="twitter:"]:not([data-rh])')
      .forEach((el) => el.remove());
  });

  const html = await page.content();
  const outDir = path.join(root, "dist", "transport");
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html, "utf8");

  const required = [
    "Private Transfers from La Fortuna",
    "https://arenaldiscovery.com/transport",
    "https://arenaldiscovery.com/og-transport.jpg",
    "TaxiService",
    "ItemList",
    "AggregateOffer",
  ];
  const missing = required.filter((snippet) => !html.includes(snippet));
  if (missing.length) {
    throw new Error(`Prerendered HTML is missing: ${missing.join(", ")}`);
  }

  await browser.close();
  console.log("Prerendered dist/transport/index.html");
} finally {
  await server.close();
}
