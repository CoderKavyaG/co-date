/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fix for html2canvas - only bundle on client side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        canvas: false,
      };
    }

    // Ignore html2canvas during SSR
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'html2canvas': 'commonjs html2canvas',
      });
    }

    return config;
  },
  // Disable static optimization for pages that use html2canvas
  experimental: {
    serverComponentsExternalPackages: ['html2canvas'],
  },
}

module.exports = nextConfig
