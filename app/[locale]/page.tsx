'use client';

import PeriodicTable from '@/components/PeriodicTable';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations()

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-serif">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </header>
      <PeriodicTable />
    </div>
  )
}