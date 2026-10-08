import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["sql.js"],
  outputFileTracingIncludes: {
    "/blogs": [
      "./data/blog.sqlite",
      "./node_modules/sql.js/dist/sql-wasm.wasm",
    ],
    "/blogs/*": [
      "./data/blog.sqlite",
      "./node_modules/sql.js/dist/sql-wasm.wasm",
    ],
  },
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
};
export default nextConfig;
