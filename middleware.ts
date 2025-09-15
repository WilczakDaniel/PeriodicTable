import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr', 'es', 'it', 'pt', 'de', 'pl', 'ru'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(de|en|es|fr|it|pl|pt|ru)/:path*']
};