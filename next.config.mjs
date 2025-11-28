/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Garantir que o output NÃO seja 'export' para que as APIs funcionem
};

export default nextConfig;