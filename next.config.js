const createNextIntlPlugin = require('next-intl/plugin');

// Агар файли i18n.ts дар папкаи src/ бошад './src/i18n.ts' нависед
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = withNextIntl(nextConfig);