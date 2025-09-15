'use client';

import PeriodicTable from '@/components/PeriodicTable';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations()

  return (
    <div className="animate-fade-in pt-16 sm:pt-20">
      <header className="text-center mb-4 sm:mb-12">
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-4 font-serif">
          {t('title')}
        </h1>
        <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </header>
      <PeriodicTable />
    </div>
  )
}