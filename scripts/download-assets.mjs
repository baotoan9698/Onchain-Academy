import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = new URL("../", import.meta.url);
const content = await readFile(new URL("lib/content.ts", root), "utf8");
const names = [
  ...new Set(
    [...content.matchAll(/["']([a-zA-Z0-9]+\.(?:png|jpg))["']/g)].map(
      (match) => match[1],
    ),
  ),
];
const directory = new URL("public/images/", root);
if (!names.length) throw new Error("No image filenames found in lib/content.ts");
await mkdir(directory, { recursive: true });
for (const name of names) {
  const response = await fetch(`https://framerusercontent.com/images/${name}`);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  await writeFile(
    new URL(name, directory),
    Buffer.from(await response.arrayBuffer()),
  );
  console.log(`Downloaded ${name}`);
}
const envFile = new URL(".env.local", root);
const env = await readFile(envFile, "utf8").catch((error) => {
  if (error.code === "ENOENT") return "";
  throw error;
});
const cleaned = env
  .replace(/^NEXT_PUBLIC_LOCAL_ASSETS=.*(?:\r?\n|$)/gm, "")
  .trimEnd();
await writeFile(
  envFile,
  `${cleaned}${cleaned ? "\n" : ""}NEXT_PUBLIC_LOCAL_ASSETS=true\n`,
);
console.log(
  `Saved ${names.length} original images to ${fileURLToPath(directory)}. Restart Next.js to use local images.`,
);
