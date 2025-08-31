/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/ipfs\.io\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'ipfs-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*\.fleek\.co\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fleek-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // PWA Configuration is handled by withPWA wrapper

  // Image Optimization
  images: {
    domains: [
      'ipfs.io',
      'gateway.pinata.cloud',
      'cloudflare-ipfs.com',
      'dweb.link',
      'images.unsplash.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Environment Variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Webpack Configuration for IPFS
  webpack: (config, { isServer }) => {
    // Handle IPFS and blockchain dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      url: 'url',
      zlib: 'browserify-zlib',
      http: 'stream-http',
      https: 'https-browserify',
      assert: 'assert',
      os: 'os-browserify',
      path: 'path-browserify',
    };

    // Handle WASM files for IPFS
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    return config;
  },

  // Headers for IPFS and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects for IPFS compatibility
  async redirects() {
    return [
      {
        source: '/ipfs/:path*',
        destination: 'https://ipfs.io/ipfs/:path*',
        permanent: true,
      },
    ];
  },

  // Experimental features
  experimental: {
    esmExternals: 'loose',
    scrollRestoration: true,
  },

  // Output configuration
  trailingSlash: true,
};

export default withPWAConfig(nextConfig);
