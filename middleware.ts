import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pl', 'de', 'ru'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(de|en|pl|ru)/:path*']
};