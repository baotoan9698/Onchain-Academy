import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = new URL("../", import.meta.url);
await mkdir(new URL("public/", root), { recursive: true });
for (const [local, original] of [
  ["favicon-light.jpg", "wclenNwBIpJAjEeWfPvxE8QKyw.jpg"],
  ["favicon-dark.png", "Vw4SxE2qkEuKYpt0YYdU2kV6Irg.png"],
]) {
  const response = await fetch(`https://framerusercontent.com/images/${original}`);
  if (!response.ok) throw new Error(`${original}: ${response.status}`);
  await writeFile(new URL(`public/${local}`, root), Buffer.from(await response.arrayBuffer()));
}
const content = await readFile(new URL("lib/content.ts", root), "utf8");
const names = [
  ...new Set(
    [...content.matchAll(/["']([a-zA-Z0-9]+\.(?:png|jpg))["']/g)].map(
      (match) => match[1],
    ),
  ),
];
const directory = new URL("public/images/", root);
if (!names.length)
  throw new Error("No image filenames found in lib/content.ts");
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
const blogSeed = JSON.parse(
  await readFile(new URL("data/blog-seed.json", root), "utf8"),
);
await mkdir(new URL("public/images/blogs/", root), { recursive: true });
for (const image of blogSeed.images) {
  if (!/^\/images\/blogs\/[a-zA-Z0-9._-]+$/.test(image.path))
    throw new Error("Invalid local image path");
  const response = await fetch(image.source_url);
  if (!response.ok) throw new Error(`${image.source_url}: ${response.status}`);
  await writeFile(
    new URL("public" + image.path, root),
    Buffer.from(await response.arrayBuffer()),
  );
}
const envFile = new URL(".env.local", root);
const solutionImages = JSON.parse(await readFile(new URL("data/solution-images.json", root), "utf8"));
await mkdir(new URL("public/images/solutions/", root), { recursive: true });
for (const [source, local] of Object.entries(solutionImages)) {
  if (!/^\/images\/solutions\/[a-zA-Z0-9._-]+$/.test(local)) throw new Error("Invalid solution image path");
  const response = await fetch(source);
  if (!response.ok) throw new Error(`${source}: ${response.status}`);
  await writeFile(new URL("public" + local, root), Buffer.from(await response.arrayBuffer()));
}
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
