import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ICON_SOURCE_DIR = join(__dirname, "../source");
const GENERATED_DIR = join(__dirname, "../generated");

const ICON_NAMES_OUT = join(GENERATED_DIR, "iconNames.ts");
const SPRITE_SYMBOLS_OUT = join(GENERATED_DIR, "spriteSymbols.ts");
const INDEX_OUT = join(__dirname, "../index.ts");

if (!existsSync(GENERATED_DIR)) {
  mkdirSync(GENERATED_DIR, { recursive: true });
}

const svgFiles = readdirSync(ICON_SOURCE_DIR, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".svg"))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

if (svgFiles.length === 0) {
  throw new Error("src/icons/source 폴더에 svg 파일이 없습니다.");
}

const iconNames = svgFiles.map((file) => basename(file, ".svg"));

const duplicated = iconNames.filter(
  (name, index) => iconNames.findIndex((v) => v.toLowerCase() === name.toLowerCase()) !== index,
);

if (duplicated.length > 0) {
  throw new Error(`중복된 아이콘 이름이 있습니다: ${duplicated.join(", ")}`);
}

const invalidNames = iconNames.filter((name) => !/^[A-Za-z0-9_-]+$/.test(name));
if (invalidNames.length > 0) {
  throw new Error(
    `아이콘 파일명은 영문/숫자/_/- 만 허용합니다: ${invalidNames.join(", ")}`,
  );
}

function extractViewBox(svg: string) {
  const match = svg.match(/viewBox="([^"]+)"/i);
  return match?.[1] ?? "0 0 24 24";
}

function extractInnerSvg(svg: string) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<svg[^>]*>/i, "")
    .replace(/<\/svg>/i, "")
    .trim();
}

const symbols = svgFiles
  .map((file) => {
    const name = basename(file, ".svg");
    const fullPath = join(ICON_SOURCE_DIR, file);
    const raw = readFileSync(fullPath, "utf8");
    const viewBox = extractViewBox(raw);
    const inner = extractInnerSvg(raw);

    return `<symbol id="icon-${name}" viewBox="${viewBox}">${inner}</symbol>`;
  })
  .join("");

const iconNamesContent = `// 이 파일은 자동 생성 파일입니다. (직접 수정 금지)
export const iconNames = ${JSON.stringify(iconNames, null, 2)} as const;
export type IconName = typeof iconNames[number];
`;

const spriteSymbolsContent = `// 이 파일은 자동 생성 파일입니다. (직접 수정 금지)
export const spriteSymbols = ${JSON.stringify(symbols)};
`;

const indexContent = `// 이 파일은 자동 생성 파일입니다. (직접 수정 금지)
export { Icon } from "./components/Icon";
export { IconSprite } from "./components/iconSprite";
export { iconNames } from "./generated/iconNames";
export type { IconName } from "./generated/iconNames";
`;

writeFileSync(ICON_NAMES_OUT, iconNamesContent, "utf8");
writeFileSync(SPRITE_SYMBOLS_OUT, spriteSymbolsContent, "utf8");
writeFileSync(INDEX_OUT, indexContent, "utf8");

console.log(`✅ 아이콘 생성 완료: ${iconNames.length}개`);