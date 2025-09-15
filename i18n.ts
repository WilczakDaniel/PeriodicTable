import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'fr', 'es', 'it', 'pt', 'de', 'pl', 'ru'];

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});