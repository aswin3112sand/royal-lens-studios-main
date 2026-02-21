import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIcoImport from "png-to-ico";

const pngToIco = pngToIcoImport.default ?? pngToIcoImport;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const sourceSvg = path.join(publicDir, "placeholder.svg");

const pngTargets = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

const ensureSourceExists = async () => {
  try {
    await fs.access(sourceSvg);
  } catch {
    throw new Error(`Source icon not found: ${sourceSvg}`);
  }
};

const generatePngAssets = async () => {
  for (const target of pngTargets) {
    const outputPath = path.join(publicDir, target.name);
    await sharp(sourceSvg)
      .resize(target.size, target.size, { fit: "cover" })
      .png()
      .toFile(outputPath);
  }
};

const generateIco = async () => {
  const icoBuffer = await pngToIco([
    path.join(publicDir, "favicon-16x16.png"),
    path.join(publicDir, "favicon-32x32.png"),
  ]);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);
};

const main = async () => {
  await ensureSourceExists();
  await generatePngAssets();
  await generateIco();
  console.log("Favicon assets generated in public/");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
