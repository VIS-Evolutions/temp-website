import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Next doesn't pick up an unrelated lockfile
  // higher up the filesystem.
  outputFileTracingRoot: __dirname,
  experimental: {
    // Server Actions default to a 1MB request body, which rejects most phone
    // photos when posting news with a cover image. Allow larger uploads.
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
