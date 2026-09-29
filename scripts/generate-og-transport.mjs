import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "src", "assets", "busetas3.jpg");
const output = path.join(root, "public", "og-transport.jpg");

await sharp(source)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(output);

console.log(`Wrote ${output}`);
