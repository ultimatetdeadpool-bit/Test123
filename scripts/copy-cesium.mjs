import { cpSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "node_modules", "cesium", "Build", "Cesium");
const dest = join(root, "public", "cesium");

if (!existsSync(dest)) {
  mkdirSync(dest, { recursive: true });
}

for (const folder of ["Workers", "Assets", "Widgets", "ThirdParty"]) {
  const from = join(src, folder);
  const to = join(dest, folder);
  console.log(`Copying ${folder}...`);
  cpSync(from, to, { recursive: true, force: true });
}

console.log("Cesium assets copied to public/cesium");
