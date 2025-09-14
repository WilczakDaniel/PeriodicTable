const withNextIntl = require('next-intl/plugin')(
  './i18n.ts'
);

const nextConfig = {};

module.exports = withNextIntl(nextConfig);