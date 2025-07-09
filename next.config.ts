/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  
  // GitHub Pages deployment configuration
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Configure for GitHub Pages subdirectory
  basePath: '/glassyass',
  assetPrefix: '/glassyass/',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Configure for static export
  distDir: 'out',
};

export default nextConfig;
